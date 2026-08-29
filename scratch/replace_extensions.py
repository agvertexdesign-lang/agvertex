import os

replacements = {
    '/services/product_design.png': '/services/product_design.webp',
    '/services/injection_mold.png': '/services/injection_mold.webp',
    '/services/drawings_gdt.png': '/services/drawings_gdt.webp',
    '/services/dfm_dfa.png': '/services/dfm_dfa.webp',
    '/services/die_casting.png': '/services/die_casting.webp',
    '/services/cad_modelling.png': '/services/cad_modelling.webp',
    '/services/drawing_validation.png': '/services/drawing_validation.webp',
    '/services/industrial_metrology.png': '/services/industrial_metrology.webp',
    '/services/supplier_support.png': '/services/supplier_support.webp',
    '/images/cad_workstation_single.jpeg': '/images/cad_workstation_single.webp',
    '/images/cad_team_collaboration.jpeg': '/images/cad_team_collaboration.webp',
    '/images/control_arm_component.png': '/images/control_arm_component.webp',
    '/images/data_security_ip.png': '/images/data_security_ip.webp',
    '/images/hero_tri_split.jpeg': '/images/hero_tri_split.webp',
    '/images/map.jpg': '/images/map.webp',
    '/industries/industrial_products.png': '/industries/industrial_products.webp'
}

src_dir = 'd:\\ag vertex\\src'

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for old, new in replacements.items():
                    content = content.replace(old, new)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Failed to process {filepath}: {e}")
