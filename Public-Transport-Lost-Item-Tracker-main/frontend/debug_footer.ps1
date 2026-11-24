$filePath = "c:\Users\Lisandra Delmira Vaz\OneDrive\Desktop\BackToYou_frontemd\index.html"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Check what's around line 1252
$lines = $content -split "`n"
Write-Host "Line 1251: [$($lines[1250])]"
Write-Host "Line 1252: [$($lines[1251])]"
Write-Host "Line 1253: [$($lines[1252])]"
Write-Host "Line 1259: [$($lines[1258])]"
Write-Host "Line 1260: [$($lines[1259])]"
Write-Host ""
Write-Host "Contains footer-col check: $($content.Contains('footer-col'))"
Write-Host "Contains Navigation heading: $($content.Contains('footer-heading`">Navigation'))"
Write-Host "Newline type in content - has CRLF: $($content.Contains("`r`n"))"
