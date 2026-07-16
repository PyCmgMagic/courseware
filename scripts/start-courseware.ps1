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

Write-Host '正在重新构建并启动最新版课件……' -ForegroundColor Green
Write-Host '浏览器将固定打开 http://127.0.0.1:5173/'
Write-Host '如果已有旧标签页，请以本次自动打开的新标签页为准。'
Write-Host '授课结束后，关闭本窗口即可停止课件服务。'

& npm.cmd run classroom

if ($LASTEXITCODE -ne 0) {
    Write-Host '启动失败：5173 端口可能被其他程序占用。' -ForegroundColor Red
    Write-Host '请关闭占用该端口的程序后重新双击“启动课件.cmd”。' -ForegroundColor Yellow
    exit 1
}
