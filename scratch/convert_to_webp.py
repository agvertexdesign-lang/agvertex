import os
from PIL import Image

paths = [
    'public/services',
    'public/images',
    'public/industries'
]

for p in paths:
    full_path = os.path.join('d:\\ag vertex', p)
    if not os.path.exists(full_path):
        print(f"Path does not exist: {full_path}")
        continue
    for f in os.listdir(full_path):
        if f.endswith('.png') or f.endswith('.jpeg') or f.endswith('.jpg'):
            src = os.path.join(full_path, f)
            base, ext = os.path.splitext(f)
            dest = os.path.join(full_path, base + '.webp')
            try:
                im = Image.open(src)
                # If image is RGBA, we can save it as WebP with alpha channel preserved
                im.save(dest, 'WEBP', quality=82)
                print(f"Converted {src} -> {dest}")
            except Exception as e:
                print(f"Failed to convert {f}: {e}")
