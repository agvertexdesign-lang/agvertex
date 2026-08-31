import os

old_email = 'agvertexdesign@gmail.com'
new_email = 'contact@agvertex.ca'

workspace_dir = 'd:\\ag vertex'
target_extensions = ('.ts', '.tsx', '.js', '.sql')

for root, dirs, files in os.walk(workspace_dir):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith(target_extensions):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if old_email in content:
                    content = content.replace(old_email, new_email)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Failed to process {filepath}: {e}")
