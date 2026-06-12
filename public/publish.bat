@echo off
cd /d "%~dp0"
set /p msg="What did you change? "
git add .
git commit -m "%msg%"
git push
call npm run deploy
echo.
echo ====== DONE! Site will update in 1-2 minutes ======
pause
start https://geoscapeanalyticslab.github.io/gsal-website/