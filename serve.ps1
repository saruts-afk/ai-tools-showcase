$port = 3000
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  AI Tools showcase is running!" -ForegroundColor Cyan
Write-Host "  Open: http://localhost:$port" -ForegroundColor Green
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server." -ForegroundColor DarkGray
Write-Host ""

# Auto-open browser
Start-Process "http://localhost:$port"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req     = $context.Request
        $res     = $context.Response

        $urlPath = $req.Url.AbsolutePath.TrimStart('/')
        if ($urlPath -eq '' -or $urlPath -eq 'index.html') {
            $filePath = Join-Path $root 'index.html'
            $contentType = 'text/html; charset=utf-8'
        } else {
            $filePath = Join-Path $root $urlPath
            $ext = [System.IO.Path]::GetExtension($filePath)
            $contentType = switch ($ext) {
                '.js'   { 'application/javascript' }
                '.css'  { 'text/css' }
                '.json' { 'application/json' }
                '.png'  { 'image/png' }
                '.svg'  { 'image/svg+xml' }
                default { 'text/plain' }
            }
        }

        if (Test-Path $filePath) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.StatusCode = 200
            $res.ContentType = $contentType
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # Fallback: serve index.html for SPA routing
            $filePath = Join-Path $root 'index.html'
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.StatusCode = 200
            $res.ContentType = 'text/html; charset=utf-8'
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }

        $res.OutputStream.Close()
    }
} catch {
    # Ctrl+C exits cleanly
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor DarkGray
}
