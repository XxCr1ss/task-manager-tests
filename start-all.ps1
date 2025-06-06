# Script para iniciar todos los microfrontends
Write-Host "Iniciando todos los microfrontends..." -ForegroundColor Green

# Función para iniciar un microfrontend en una nueva ventana de PowerShell
function Start-Microfrontend {
    param(
        [string]$Name,
        [string]$Path,
        [int]$Port
    )
    
    Write-Host "Iniciando $Name en puerto $Port..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$Path'; npm run dev"
}

# Verificar si npm está instalado
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm no está instalado o no está en el PATH" -ForegroundColor Red
    exit 1
}

# Instalar dependencias en todos los microfrontends
Write-Host "Instalando dependencias..." -ForegroundColor Cyan

$microfrontends = @(
    @{Name="Shell App"; Path=".\shell-app"; Port=3000},
    @{Name="Auth Microfrontend"; Path=".\auth-microfrontend"; Port=3001},
    @{Name="Dashboard Microfrontend"; Path=".\dashboard-microfrontend"; Port=3003},
    @{Name="Not Found Microfrontend"; Path=".\not-found-microfrontend"; Port=3004}
)

foreach ($mf in $microfrontends) {
    if (Test-Path $mf.Path) {
        Write-Host "Instalando dependencias para $($mf.Name)..." -ForegroundColor Blue
        Set-Location $mf.Path
        npm install
        Set-Location ..
    } else {
        Write-Host "Advertencia: No se encontró el directorio $($mf.Path)" -ForegroundColor Yellow
    }
}

# Iniciar todos los microfrontends
Write-Host "Iniciando microfrontends..." -ForegroundColor Green

foreach ($mf in $microfrontends) {
    if (Test-Path $mf.Path) {
        Start-Microfrontend -Name $mf.Name -Path (Resolve-Path $mf.Path) -Port $mf.Port
        Start-Sleep -Seconds 2
    }
}

Write-Host ""
Write-Host "=== MICROFRONTENDS INICIADOS ===" -ForegroundColor Green
Write-Host "Shell App (Host):           http://localhost:3000" -ForegroundColor White
Write-Host "Auth Microfrontend:        http://localhost:3001" -ForegroundColor White
Write-Host "Dashboard Microfrontend:   http://localhost:3003" -ForegroundColor White
Write-Host "Not Found Microfrontend:   http://localhost:3004" -ForegroundColor White
Write-Host ""
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")