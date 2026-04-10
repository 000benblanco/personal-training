@echo off
chcp 65001 >nul
echo ==========================================
echo   PERSONAL TRAINING APP
echo ==========================================
echo.
echo Abriendo aplicacion en Chrome...
echo.
start chrome "https://000benblanco.github.io/personal-training/" --app
if errorlevel 1 (
    echo Chrome no encontrado, probando Edge...
    start msedge "https://000benblanco.github.io/personal-training/"
    if errorlevel 1 (
        echo Edge no encontrado, probando Firefox...
        start firefox "https://000benblanco.github.io/personal-training/"
        if errorlevel 1 (
            echo.
            echo ERROR: No se encontro navegador compatible
            echo Abriendo en navegador predeterminado...
            start "" "https://000benblanco.github.io/personal-training/"
        )
    )
)
echo.
echo App abierta correctamente
echo.
echo NOTA: Si es la primera vez, espera a que cargue
echo y luego instala la app desde el menu del navegador
echo.
timeout /t 3 >nul