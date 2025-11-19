# Quick test script for chatbot setup
Write-Host "`n🧪 Testing Chatbot Setup`n" -ForegroundColor Cyan

# Test 1: Check if backend is running
Write-Host "1. Testing backend API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✓ Backend is running" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Backend not running on port 5000" -ForegroundColor Red
    Write-Host "     Start it with: cd server && npm run dev" -ForegroundColor Gray
}

# Test 2: Check if spa exists (you'll need to provide spaId)
$spaId = Read-Host "`n2. Enter a spaId to test (e.g., aurum-andheri)"
if ($spaId) {
    Write-Host "   Testing spa config endpoint..." -ForegroundColor Yellow
    try {
        $config = Invoke-RestMethod -Uri "http://localhost:5000/api/spas/config/$spaId" -Method GET -ErrorAction Stop
        Write-Host "   ✓ Spa found: $($config.spaName)" -ForegroundColor Green
        Write-Host "   ✓ Active: $($config.isActive)" -ForegroundColor $(if ($config.isActive) { "Green" } else { "Red" })
        Write-Host "   ✓ Services: $($config.services.Count)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404) {
            Write-Host "   ✗ Spa not found or inactive" -ForegroundColor Red
            Write-Host "     Create it in admin panel first" -ForegroundColor Gray
        } else {
            Write-Host "   ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Test 3: Check chatbot .env
Write-Host "`n3. Checking chatbot .env..." -ForegroundColor Yellow
if (Test-Path "chatbot\.env") {
    $envContent = Get-Content "chatbot\.env"
    Write-Host "   ✓ .env file exists" -ForegroundColor Green
    Write-Host "   Content: $envContent" -ForegroundColor Gray
} else {
    Write-Host "   ✗ .env file missing" -ForegroundColor Red
    Write-Host "     Creating it now..." -ForegroundColor Yellow
    Set-Content -Path "chatbot\.env" -Value "VITE_API_URL=http://localhost:5000/api"
    Write-Host "     ✓ Created" -ForegroundColor Green
}

Write-Host "`n✅ Test complete!`n" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Ensure backend is running: cd server && npm run dev" -ForegroundColor White
Write-Host "2. Ensure chatbot is running: cd chatbot && npm run dev" -ForegroundColor White
Write-Host "3. Open: http://localhost:4173/?spa=$spaId" -ForegroundColor White
Write-Host "4. Check browser console (F12) for debug logs`n" -ForegroundColor White

