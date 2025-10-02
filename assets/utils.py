import re
import os
import requests

md_path = 'D:\\Work_Study\\SelfLearning\\blog\\ivandon15.github.io\\_posts\\tutorial\\2025-10-02-3dinformax.md'
img_folder = 'D:\\Work_Study\\SelfLearning\\blog\\ivandon15.github.io\\assets\\img\\posts\\tutorial\\2025-10-02-3dinformax'
os.makedirs(img_folder, exist_ok=True)

with open(md_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 匹配所有图片 URL
img_urls = re.findall(r'!\[.*?\]\((https?://[^)]*i-blog\.csdnimg[^)]*)\)', content)
url_to_local = {}

for url in img_urls:
    filename = os.path.basename(url.split('?')[0])
    local_path = os.path.join(img_folder, filename)
    # 下载图片
    r = requests.get(url)
    with open(local_path, 'wb') as img_file:
        img_file.write(r.content)
    # 记录映射
    url_to_local[url] = filename

# 替换 md 文件中的图片链接
for url, local in url_to_local.items():
    content = content.replace(url, local)

with open(md_path, 'w', encoding='utf-8') as f:
    f.write(content)