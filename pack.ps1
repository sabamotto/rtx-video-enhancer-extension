# PowerShell script to create distribution ZIP for Chrome Web Store
# Usage: .\pack.ps1

$ErrorActionPreference = "Stop"

# Define the output ZIP file name
$outputZip = "rtx-video-enhancer.zip"

# Remove existing ZIP if it exists
if (Test-Path $outputZip) {
    Remove-Item $outputZip -Force
    Write-Host "Removed existing $outputZip" -ForegroundColor Yellow
}

# Define files to include in the package
$filesToInclude = @(
    "manifest.json",
    "background.js",
    "content.js",
    "LICENSE.md",
    "README.md",
    "README_JA.md",
    "icons\*",
    "_locales\*"
)

# Create temporary directory for packaging
$tempDir = Join-Path $env:TEMP ("rtx-extension-pack-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Write-Host "Created temporary directory: $tempDir" -ForegroundColor Green

try {
    # Copy files to temporary directory
    foreach ($file in $filesToInclude) {
        if ($file -like "*\*") {
            # Handle directories (like icons\* and _locales\*)
            $dirName = $file.Replace("\*", "")
            $destDir = Join-Path $tempDir $dirName
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            Copy-Item -Path $file -Destination $destDir -Recurse -Force
            Write-Host "Copied directory: $dirName" -ForegroundColor Cyan
        } else {
            # Handle individual files
            Copy-Item -Path $file -Destination $tempDir -Force
            Write-Host "Copied file: $file" -ForegroundColor Cyan
        }
    }

    # Create ZIP archive
    Compress-Archive -Path "$tempDir\*" -DestinationPath $outputZip -CompressionLevel Optimal
    
    # Get ZIP file info
    $zipInfo = Get-Item $outputZip
    $sizeKB = [math]::Round($zipInfo.Length / 1KB, 2)
    
    Write-Host "`n✓ Successfully created $outputZip" -ForegroundColor Green
    Write-Host "  Size: $sizeKB KB" -ForegroundColor Gray
    Write-Host "  Ready for Chrome Web Store submission!" -ForegroundColor Green
}
finally {
    # Clean up temporary directory
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force
        Write-Host "`nCleaned up temporary files" -ForegroundColor Gray
    }
}