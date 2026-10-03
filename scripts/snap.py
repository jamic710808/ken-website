# 截取 ai-projects-data.js 每個專案 links[0] 的首屏快照 -> images/ai/<id>.webp
# 用法：python scripts/snap.py   （需 playwright + chromium、Pillow）
import json, re, io, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

root = Path(__file__).resolve().parent.parent
src = (root / "ai-projects-data.js").read_text(encoding="utf-8")
data = json.loads(re.search(r"window\.AI_PROJECTS\s*=\s*(\[.*\]);", src, re.S).group(1))
out = root / "images" / "ai"; out.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 800}, device_scale_factor=1)
    for d in data:
        url = d["links"][0]["url"]
        pg = ctx.new_page()
        try:
            pg.goto(url, wait_until="load", timeout=30000)
            pg.wait_for_timeout(2500)  # 等進場動畫
            im = Image.open(io.BytesIO(pg.screenshot())).convert("RGB").resize((800, 500), Image.LANCZOS)
            im.save(out / f"{d['id']}.webp", "WEBP", quality=78, method=6)
            print("OK  ", d["id"], url, flush=True)
        except Exception as e:
            print("FAIL", d["id"], url, str(e)[:80], flush=True)
        pg.close()
    b.close()
