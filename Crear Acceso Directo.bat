@echo off
chcp 65001 >nul
echo ==========================================
echo   CREAR ACCESO DIRECTO EN ESCRITORIO
echo ==========================================
echo.
echo Esto creara un acceso directo en tu escritorio
echo para abrir Sanctuary sin terminales.
echo.
pause

echo.
echo Creando acceso directo...

set "APP_URL=https://000benblanco.github.io/personal-training/"
set "APP_NAME=Sanctuary"
set "DESKTOP=%USERPROFILE%\Desktop"

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%DESKTOP%\%APP_NAME%.lnk'); $Shortcut.TargetPath = '%APP_URL%'; $Shortcut.IconLocation = 'shell32.dll, 14'; $Shortcut.Save()"

if exist "%DESKTOP%\%APP_NAME%.lnk" (
    echo.
    echo ==========================================
    echo   ACCESO DIRECTO CREADO!
    echo ==========================================
    echo.
    echo Ubicacion: %DESKTOP%\%APP_NAME%.lnk
    echo.
echo Ahora puedes hacer doble click en el icono
echo "Sanctuary" en tu escritorio.
    echo.
) else (
    echo.
    echo ERROR: No se pudo crear el acceso directo
    echo.
    echo Intenta crearlo manualmente:
    echo 1. Click derecho en escritorio - Nuevo - Acceso Directo
    echo 2. Ubicacion: %APP_URL%
    echo 3. Nombre: %APP_NAME%
    echo.
)

pause