$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Security

trap {
  $errorDirectory = Join-Path $env:LOCALAPPDATA 'MonteDasOliveiras'
  $errorPath = Join-Path $errorDirectory 'configure-error.log'
  New-Item -ItemType Directory -Path $errorDirectory -Force | Out-Null
  $errorMessage = $_.Exception.Message
  if ($_.ErrorDetails.Message) { $errorMessage += "`n" + $_.ErrorDetails.Message }
  if ($_.Exception.Response) {
    try {
      $reader = New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())
      $responseBody = $reader.ReadToEnd()
      $reader.Dispose()
      if ($responseBody) { $errorMessage += "`n" + $responseBody }
    } catch {}
  }
  Set-Content -LiteralPath $errorPath -Value $errorMessage -Encoding utf8
  Write-Host ''
  Write-Host ('Não foi possível concluir: ' + $errorMessage) -ForegroundColor Red
  Write-Host 'Revise os dados e execute o configurador novamente.'
  Read-Host 'Pressione Enter para fechar' | Out-Null
  exit 1
}

function Protect-LocalData([string]$Value) {
  $bytes = [Text.Encoding]::UTF8.GetBytes($Value)
  $protected = [System.Security.Cryptography.ProtectedData]::Protect(
    $bytes,
    $null,
    [System.Security.Cryptography.DataProtectionScope]::CurrentUser
  )
  [Convert]::ToBase64String($protected)
}

$configDirectory = Join-Path $env:LOCALAPPDATA 'MonteDasOliveiras'
$configPath = Join-Path $configDirectory 'openbot-supabase.session'

Write-Host 'Configuração local do OpenBot e Supabase' -ForegroundColor Cyan
Write-Host 'Nenhuma senha será salva ou exibida.'
Write-Host ''

$projectUrl = (Read-Host 'URL do projeto Supabase').TrimEnd('/')
$publishableKey = (Read-Host 'Publishable key').Trim()
$email = (Read-Host 'E-mail usado em /admin/login do site, não a conta do painel Supabase').Trim()
$securePassword = Read-Host 'Senha' -AsSecureString

if (-not $projectUrl.StartsWith('https://')) { throw 'A URL do projeto deve usar HTTPS.' }
if (-not $publishableKey -or -not $email) { throw 'URL, publishable key e e-mail são obrigatórios.' }

$passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
try {
  $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
  $body = @{ email = $email; password = $password } | ConvertTo-Json
  $temporaryResponse = Join-Path $env:TEMP ('monte-supabase-' + [guid]::NewGuid().ToString('N') + '.json')
  try {
    $status = $body | & curl.exe --silent --show-error --output $temporaryResponse --write-out '%{http_code}' `
      --request POST "$projectUrl/auth/v1/token?grant_type=password" `
      --header "apikey: $publishableKey" --header 'Content-Type: application/json' --data-binary '@-'
    $responseBody = Get-Content -LiteralPath $temporaryResponse -Raw
    if ($status -notmatch '^2') { throw "Supabase respondeu HTTP $status. $responseBody" }
    $session = $responseBody | ConvertFrom-Json
  } finally {
    if ($temporaryResponse -and (Test-Path -LiteralPath $temporaryResponse)) {
      Remove-Item -LiteralPath $temporaryResponse -Force
    }
  }
} finally {
  if ($passwordPointer -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
  }
  $password = $null
  $securePassword.Dispose()
}

if (-not $session.refresh_token -or -not $session.access_token) {
  throw 'O Supabase não devolveu uma sessão válida.'
}

$payload = @{
  project_url = $projectUrl
  publishable_key = $publishableKey
  access_token = $session.access_token
  refresh_token = $session.refresh_token
  expires_at = $session.expires_at
  user_id = $session.user.id
  email = $session.user.email
} | ConvertTo-Json -Compress

New-Item -ItemType Directory -Path $configDirectory -Force | Out-Null
Set-Content -LiteralPath $configPath -Value (Protect-LocalData $payload) -Encoding ascii
& icacls.exe $configPath /inheritance:r /grant:r "${env:USERNAME}:(R,W)" | Out-Null
$errorPath = Join-Path $configDirectory 'configure-error.log'
if (Test-Path -LiteralPath $errorPath) { Remove-Item -LiteralPath $errorPath -Force }

Write-Host ''
Write-Host 'Sessão autenticada e protegida para este usuário do Windows.' -ForegroundColor Green
Write-Host 'Você pode fechar esta janela.'
Read-Host 'Pressione Enter para concluir' | Out-Null
