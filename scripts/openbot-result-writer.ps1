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
$payload = $parsedJson | ConvertFrom-Json
$payload | Add-Member -NotePropertyName job_id -NotePropertyValue $JobId
$payload | Add-Member -NotePropertyName topic_id -NotePropertyValue $TopicId
$payload | Add-Member -NotePropertyName category_slug -NotePropertyValue $CategorySlug

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

$response = Invoke-RestMethod -Method Post -Uri "$($config.project_url)/functions/v1/openbot-editorial-result" -Headers @{
  apikey = $config.publishable_key
  Authorization = 'Bearer ' + $session.access_token
} -ContentType 'application/json' -Body ($payload | ConvertTo-Json -Compress -Depth 12)
$response | ConvertTo-Json -Compress
