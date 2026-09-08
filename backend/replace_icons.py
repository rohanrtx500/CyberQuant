import os

src_dir = r"D:\SIH 2026\Cyberquant AI\frontend\src"
count = 0

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith((".tsx", ".ts")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as file:
                content = file.read()
            if "lucide-react" in content:
                content = content.replace('"lucide-react"', '"@/components/icons"').replace("'lucide-react'", '"@/components/icons"')
                with open(p, "w", encoding="utf-8") as file:
                    file.write(content)
                count += 1

print(f"Updated {count} files to use @/components/icons.")
