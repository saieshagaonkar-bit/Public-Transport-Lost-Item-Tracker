$filePath = "c:\Users\Lisandra Delmira Vaz\OneDrive\Desktop\BackToYou_frontemd\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# LF-only line endings
$old = "      <div class=`"footer-col`">`n        <h4 class=`"footer-heading`">Navigation</h4>`n        <ul class=`"footer-links`">`n          <li><a href=`"#home`" class=`"footer-nav-link`" data-view=`"home`">Home</a></li>`n          <li><a href=`"#browse`" class=`"footer-nav-link`" data-view=`"browse`">Browse Reports</a></li>`n          <li><a href=`"#dashboard`" class=`"footer-nav-link`" data-view=`"dashboard`">My Dashboard</a></li>`n          <li><a href=`"#faq`" class=`"footer-nav-link`" data-view=`"faq`">FAQ &amp; Support</a></li>`n        </ul>`n      </div>"

$new = "      <!-- Navigation column removed - nav links now live in the role-specific top navbar -->"

if ($content.Contains($old)) {
    $content = $content.Replace($old, $new)
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "SUCCESS: Footer nav block replaced."
} else {
    Write-Host "NOT FOUND. Trying regex..."
    # Use regex approach
    $pattern = '      <div class="footer-col">\s*<h4 class="footer-heading">Navigation</h4>\s*<ul class="footer-links">[\s\S]*?</ul>\s*</div>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, '      <!-- Navigation column removed - nav links now live in the role-specific top navbar -->'
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "SUCCESS via regex: Footer nav block replaced."
    } else {
        Write-Host "FAILED: Could not locate footer nav block with regex either."
    }
}
