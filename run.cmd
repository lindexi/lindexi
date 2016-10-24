@echo off
cd /d d:\www\blog
taskkill /im ruby.exe /f 2>nul
RunHiddenConsole.exe cmd /c "jekyll build -w"