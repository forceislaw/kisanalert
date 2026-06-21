Add-Type -AssemblyName System.Drawing

function New-Icon {
    param($Size, $Path)
    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "HighQuality"

    $emerald = [System.Drawing.Color]::FromArgb(5, 150, 105)
    $white = [System.Drawing.Color]::FromArgb(255, 255, 255)

    $brushBg = New-Object System.Drawing.SolidBrush $emerald
    $g.FillRectangle($brushBg, 0, 0, $Size, $Size)
    $brushBg.Dispose()

    $cx = $Size / 2
    $cy = $Size / 2
    $r = $Size * 0.35

    # Draw a simple leaf shape using a filled ellipse + a stem line
    $brushLeaf = New-Object System.Drawing.SolidBrush $white

    # Leaf body: tilted ellipse
    $g.TranslateTransform($cx, $cy)
    $g.RotateTransform(-30)
    $g.FillEllipse($brushLeaf, -$r, -$r * 0.5, $r * 2, $r * 1.1)
    $g.ResetTransform()

    # Stem: vertical line
    $penStem = New-Object System.Drawing.Pen $white, ($Size * 0.04)
    $penStem.StartCap = "Round"
    $penStem.EndCap = "Round"
    $g.DrawLine($penStem, $cx, $cy + $r * 0.1, $cx, $cy + $r * 0.7)

    $brushLeaf.Dispose()
    $penStem.Dispose()
    $g.Dispose()

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$publicDir = "C:\Users\dhirn\OneDrive\crop\kisanalert-app\public"
New-Icon -Size 192 -Path (Join-Path $publicDir "icon-192.png")
New-Icon -Size 512 -Path (Join-Path $publicDir "icon-512.png")

Write-Host "Icons created successfully"
