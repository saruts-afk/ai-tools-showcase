@echo off
title AI Tools Showcase
echo.
echo  Starting AI Tools server...
echo  Your browser will open automatically.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
