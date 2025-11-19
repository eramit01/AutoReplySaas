# PowerShell script to kill processes on common development ports
# Usage: .\kill-ports.ps1 [port1] [port2] ...

param(
    [int[]]$Ports = @(5000, 5173, 4173)
)

function Kill-Port {
    param([int]$Port)
    
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | 
               Select-Object -ExpandProperty OwningProcess -Unique
    
    if ($process) {
        $processInfo = Get-Process -Id $process -ErrorAction SilentlyContinue
        if ($processInfo) {
            Write-Host "Killing process on port $Port (PID: $process, Name: $($processInfo.ProcessName))" -ForegroundColor Yellow
            Stop-Process -Id $process -Force
            Write-Host "✓ Port $Port is now free" -ForegroundColor Green
        } else {
            Write-Host "No process found on port $Port" -ForegroundColor Gray
        }
    } else {
        Write-Host "No process found on port $Port" -ForegroundColor Gray
    }
}

Write-Host "`n🔪 Killing processes on ports: $($Ports -join ', ')" -ForegroundColor Cyan
Write-Host ""

foreach ($port in $Ports) {
    Kill-Port -Port $port
}

Write-Host "`n✅ Done!" -ForegroundColor Green

