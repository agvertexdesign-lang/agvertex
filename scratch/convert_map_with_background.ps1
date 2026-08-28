Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('public/images/map.png')
$newWidth = 1200
$newHeight = [math]::Round(($img.Height / $img.Width) * $newWidth)

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)

# Fill with the container background color (#F8FAFC -> RGB 248, 250, 252)
$bgColor = [System.Drawing.Color]::FromArgb(248, 250, 252)
$g.Clear($bgColor)

# Set high quality resizing
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()
$g.Dispose()

# Save as Jpeg
$bmp.Save('public/images/map.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

# Remove the old PNG
Remove-Item -Force public/images/map.png

Write-Output "Map converted with solid background successfully. New size: $((Get-Item public/images/map.jpg).Length) bytes"
