param(
  [Parameter(Mandatory)][string]$PackageDirectory,
  [Parameter(Mandatory)][string]$JobId,
  [Parameter(Mandatory)][string]$TopicId,
  [string]$CategorySlug = '',
  [ValidateSet('production', 'test')][string]$Profile = 'production'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Security
function Unprotect-LocalData([string]$Value) {
  $bytes = [Convert]::FromBase64String($Value)
  [Text.Encoding]::UTF8.GetString([Security.Cryptography.ProtectedData]::Unprotect($bytes, $null, [Security.Cryptography.DataProtectionScope]::CurrentUser))
}
function Protect-LocalData([string]$Value) {
  $bytes = [Text.Encoding]::UTF8.GetBytes($Value)
  [Convert]::ToBase64String([Security.Cryptography.ProtectedData]::Protect($bytes, $null, [Security.Cryptography.DataProtectionScope]::CurrentUser))
}

$articlePath = Join-Path $PackageDirectory 'README.md'
$carouselPath = Join-Path $PackageDirectory 'CARROSSEL-DRAFT.md'
if (-not (Test-Path -LiteralPath $articlePath)) { throw 'README.md do pacote editorial nao encontrado.' }
$parser = Join-Path $PSScriptRoot 'openbot-parse-result.mjs'
$parsedJson = if (Test-Path -LiteralPath $carouselPath) { & node $parser $articlePath $carouselPath } else { & node $parser $articlePath }
if ($LASTEXITCODE -ne 0) { throw 'O pacote editorial nao passou na validacao.' }
$parsed = $parsedJson | ConvertFrom-Json
if (-not $parsed.article -or -not $parsed.article.title) {
  throw 'O parser nao devolveu um artigo valido.'
}
$payload = @{
  job_id = $JobId
  topic_id = $TopicId
  category_slug = $CategorySlug
  article = $parsed.article
  social_package = $parsed.social_package
}

$sessionFile = if ($Profile -eq 'test') { 'openbot-supabase.test.session' } else { 'openbot-supabase.session' }
$configPath = Join-Path $env:LOCALAPPDATA "MonteDasOliveiras\$sessionFile"
if (-not (Test-Path -LiteralPath $configPath)) { throw 'Sessao local ausente.' }
$config = (Unprotect-LocalData (Get-Content -LiteralPath $configPath -Raw)).Trim() | ConvertFrom-Json
$refreshBody = @{ refresh_token = $config.refresh_token } | ConvertTo-Json
$session = Invoke-RestMethod -Method Post -Uri "$($config.project_url)/auth/v1/token?grant_type=refresh_token" -Headers @{ apikey = $config.publishable_key } -ContentType 'application/json' -Body $refreshBody
$config.access_token = $session.access_token
$config.refresh_token = $session.refresh_token
$config.expires_at = $session.expires_at
Set-Content -LiteralPath $configPath -Value (Protect-LocalData ($config | ConvertTo-Json -Compress)) -Encoding ascii

$requestBody = $payload | ConvertTo-Json -Compress -Depth 12
$requestCheck = $requestBody | ConvertFrom-Json
if (-not $requestCheck.article.title) { throw 'Falha ao serializar o artigo para envio.' }
$response = Invoke-RestMethod -Method Post -Uri "$($config.project_url)/functions/v1/openbot-editorial-result" -Headers @{
  apikey = $config.publishable_key
  Authorization = 'Bearer ' + $session.access_token
} -ContentType 'application/json; charset=utf-8' -Body ([Text.Encoding]::UTF8.GetBytes($requestBody))
$response | ConvertTo-Json -Compress
