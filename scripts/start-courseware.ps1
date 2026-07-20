$ErrorActionPreference = 'Stop'

$coursewareRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $coursewareRoot

if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    Write-Host '未检测到 Node.js / npm，请先安装 Node.js 后重试。' -ForegroundColor Red
    exit 1
}

if (-not (Test-Path (Join-Path $coursewareRoot 'node_modules'))) {
    Write-Host '首次启动：正在安装课件依赖，请稍候……' -ForegroundColor Cyan
    & npm.cmd install
    if ($LASTEXITCODE -ne 0) {
        Write-Host '依赖安装失败，请检查网络后重试。' -ForegroundColor Red
        exit 1
    }
}

Write-Host '正在关闭本课件遗留的旧服务……' -ForegroundColor Cyan
Get-CimInstance Win32_Process |
    Where-Object {
        $_.Name -eq 'node.exe' -and
        $_.CommandLine -like "*$coursewareRoot*" -and
        $_.CommandLine -match 'vite'
    } |
    ForEach-Object {
        Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
    }

Start-Sleep -Milliseconds 700

$usedPorts = [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port
$port = 5173..5190 | Where-Object { $_ -notin $usedPorts } | Select-Object -First 1

if (-not $port) {
    Write-Host '启动失败：5173—5190 端口均已被占用。' -ForegroundColor Red
    exit 1
}

$cacheBuster = Get-Date -Format 'yyyyMMddHHmmss'
$previewPath = "/?v=$cacheBuster"
$previewUrl = "http://127.0.0.1:$port$previewPath"

Write-Host '正在重新构建最新版课件……' -ForegroundColor Green
& npm.cmd run build

if ($LASTEXITCODE -ne 0) {
    Write-Host '课件构建失败，请查看上方错误信息。' -ForegroundColor Red
    exit 1
}

Write-Host "最新版课件将打开：$previewUrl" -ForegroundColor Green
if ($port -ne 5173) {
    Write-Host "提示：5173 端口已被其他程序占用，本次已自动改用 $port。" -ForegroundColor Yellow
}
Write-Host '如果已有旧标签页，请以本次自动打开的新标签页为准。'
Write-Host '授课结束后，关闭本窗口即可停止课件服务。'

& npm.cmd run preview -- --host 127.0.0.1 --port $port --strictPort --open $previewPath

if ($LASTEXITCODE -ne 0) {
    Write-Host "启动失败：$port 端口可能刚刚被其他程序占用。" -ForegroundColor Red
    exit 1
}
