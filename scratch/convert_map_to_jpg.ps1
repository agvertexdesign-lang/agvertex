Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('public/images/map.png')
$newWidth = 1200
$newHeight = [math]::Round(($img.Height / $img.Width) * $newWidth)

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()
$g.Dispose()

# Save as Jpeg
$bmp.Save('public/images/map.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

# Remove the old PNG
Remove-Item -Force public/images/map.png

Write-Output "Map converted to JPEG successfully. New size: $((Get-Item public/images/map.jpg).Length) bytes"
