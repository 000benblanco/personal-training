# Personal Training App - Lanzador
# Abre la aplicacion web en el navegador predeterminado

$appUrl = "https://000benblanco.github.io/personal-training/"
$appName = "Personal Training"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   $appName" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Intentar abrir en Chrome primero (modo app para look nativo)
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$chromeFound = $false
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        Write-Host "Abriendo en Chrome (modo app)..." -ForegroundColor Green
        Start-Process $path -ArgumentList "--app=$appUrl"
        $chromeFound = $true
        break
    }
}

# Si no hay Chrome, probar Edge
if (-not $chromeFound) {
    $edgePaths = @(
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe"
    )
    
    foreach ($path in $edgePaths) {
        if (Test-Path $path) {
            Write-Host "Abriendo en Edge (modo app)..." -ForegroundColor Green
            Start-Process $path -ArgumentList "--app=$appUrl"
            $chromeFound = $true
            break
        }
    }
}

# Si no hay Chrome ni Edge, abrir en navegador predeterminado
if (-not $chromeFound) {
    Write-Host "Abriendo en navegador predeterminado..." -ForegroundColor Yellow
    Start-Process $appUrl
}

Write-Host ""
Write-Host "App abierta correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "NOTA: Si es la primera vez:" -ForegroundColor Yellow
Write-Host "  1. Espera a que cargue la pagina" -ForegroundColor Gray
Write-Host "  2. Click en el icono de instalacion (+)" -ForegroundColor Gray
Write-Host "  3. Selecciona 'Instalar'" -ForegroundColor Gray
Write-Host ""

# Crear acceso directo en escritorio si no existe
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "$appName.lnk"

if (-not (Test-Path $shortcutPath)) {
    $createShortcut = Read-Host "¿Crear acceso directo en el escritorio? (S/N)"
    if ($createShortcut -eq "S" -or $createShortcut -eq "s") {
        $WshShell = New-Object -comObject WScript.Shell
        $Shortcut = $WshShell.CreateShortcut($shortcutPath)
        $Shortcut.TargetPath = $appUrl
        $Shortcut.IconLocation = "shell32.dll, 14"
        $Shortcut.Save()
        Write-Host "Acceso directo creado en el escritorio!" -ForegroundColor Green
    }
}

Start-Sleep -Seconds 2