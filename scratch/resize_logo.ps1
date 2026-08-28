Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('public/ag_vertex_logo.png')
Write-Output "Original dimensions: $($img.Width)x$($img.Height)"
$newWidth = 600
$newHeight = [math]::Round(($img.Height / $img.Width) * $newWidth)
Write-Output "New dimensions: $($newWidth)x$($newHeight)"

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()
$g.Dispose()

$bmp.Save('public/ag_vertex_logo_resized.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Move-Item -Force public/ag_vertex_logo_resized.png public/ag_vertex_logo.png
Write-Output "Resized successfully. New size: $((Get-Item public/ag_vertex_logo.png).Length) bytes"
