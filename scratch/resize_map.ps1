Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('public/images/map.png')
Write-Output "Original map dimensions: $($img.Width)x$($img.Height)"
$newWidth = 1200
$newHeight = [math]::Round(($img.Height / $img.Width) * $newWidth)
Write-Output "New map dimensions: $($newWidth)x$($newHeight)"

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()
$g.Dispose()

$bmp.Save('public/images/map_resized.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Move-Item -Force public/images/map_resized.png public/images/map.png
Write-Output "Map resized successfully. New size: $((Get-Item public/images/map.png).Length) bytes"
