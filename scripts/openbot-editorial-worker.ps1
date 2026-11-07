param([switch]$Check)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Security

function Unprotect-LocalData([string]$Value) {
  $protected = [Convert]::FromBase64String($Value)
  $bytes = [System.Security.Cryptography.ProtectedData]::Unprotect(
    $protected,
    $null,
    [System.Security.Cryptography.DataProtectionScope]::CurrentUser
  )
  [Text.Encoding]::UTF8.GetString($bytes)
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

$configPath = Join-Path $env:LOCALAPPDATA 'MonteDasOliveiras\openbot-supabase.session'
if (-not (Test-Path -LiteralPath $configPath)) {
  throw 'Sessão local ausente. Execute npm run openbot:configure.'
}

$config = (Unprotect-LocalData (Get-Content -LiteralPath $configPath -Raw)).Trim() | ConvertFrom-Json
$refreshBody = @{ refresh_token = $config.refresh_token } | ConvertTo-Json
$session = Invoke-RestMethod -Method Post -Uri "$($config.project_url)/auth/v1/token?grant_type=refresh_token" `
  -Headers @{ apikey = $config.publishable_key } -ContentType 'application/json' -Body $refreshBody

$config.access_token = $session.access_token
$config.refresh_token = $session.refresh_token
$config.expires_at = $session.expires_at
Set-Content -LiteralPath $configPath -Value (Protect-LocalData ($config | ConvertTo-Json -Compress)) -Encoding ascii

if ($Check) {
  $user = Invoke-RestMethod -Method Get -Uri "$($config.project_url)/auth/v1/user" -Headers @{
    apikey = $config.publishable_key
    Authorization = 'Bearer ' + $session.access_token
  }
  @{ ok = [bool]$user.id; status = 'authenticated'; user_id_present = [bool]$user.id } | ConvertTo-Json -Compress
  exit 0
}

$response = Invoke-RestMethod -Method Post -Uri "$($config.project_url)/rest/v1/rpc/claim_next_editorial_job" `
  -Headers @{
    apikey = $config.publishable_key
    Authorization = 'Bearer ' + $session.access_token
  } -ContentType 'application/json' -Body '{}'

$job = @($response) | Select-Object -First 1
if (-not $job) {
  @{ ok = $true; status = 'idle' } | ConvertTo-Json -Compress
  exit 0
}

@{
  ok = $true
  status = 'claimed'
  job = @{
    job_id = $job.job_id
    topic_id = $job.topic_id
    source_type = $job.source_type
    topic = $job.topic
    youtube_url = $job.youtube_url
    seo_keyword = $job.seo_keyword
    category_slug = $job.category_slug
    priority = $job.priority
    requested_execution = $job.requested_execution
  }
} | ConvertTo-Json -Compress -Depth 4
