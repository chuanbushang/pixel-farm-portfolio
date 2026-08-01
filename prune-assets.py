# -*- coding: utf-8 -*-
"""把 public/assets/material 下未被代码引用的原图移到 materials-src/ 备份，减小部署体积"""
import shutil
from pathlib import Path

ROOT = Path(r"C:\Users\HUAWEI.LAPTOP-DQ51DGQ4\Documents\kimi\workspace\pixel-farm-portfolio")
SRC = ROOT / "public" / "assets" / "material"
DST = ROOT / "materials-src" / "assets" / "material"

referenced = {
    "cute/web/cute1.jpg", "cute/web/cute2.jpg", "cute/web/cute3.jpg",
    "cute/web/cute4.jpg", "cute/web/cute5.jpg", "cute/web/cute6.jpg",
    "experience/party.png", "experience/qgzx.png",
    "experience/sunwork/teach3.jpg", "experience/sunwork/teach4.jpg",
    "experience/web/school.jpg", "experience/web/teach1.jpg", "experience/web/teach2.jpg",
    "food/food1.jpg", "food/food2.jpg", "food/food3.jpg",
    "friendship/web/friendship1.jpg", "friendship/web/friendship2.jpg",
    "friendship/web/friendship3.jpg", "friendship/web/friendship4.jpg",
    "friendship/web/friendship5.jpg",
    "honor/jinqiu-2024.png", "honor/lulule-2026.jpg", "honor/mlzg-2025.png",
    "honor/sanchuang.jpg", "honor/shetuan-2025.png", "honor/sheying1.jpg",
    "honor/sheying2.jpg", "honor/sheying3.jpg", "honor/xigai.jpg",
    "honor/xljq-2024.png", "honor/xljq-2025.jpg",
    "movie/web/movie1.jpg", "movie/web/movie2.jpg", "movie/web/movie3.jpg", "movie/web/movie4.jpg",
    "photography/web/camera-1.jpg", "photography/web/camera-2.jpg", "photography/web/camera-3.jpg",
    "photography/web/camera-4.jpg", "photography/web/camera-5.jpg", "photography/web/camera-6.jpg",
    "photography/web/camera-7.jpg",
    "project/aicahnmei.png", "project/bookstore/web/book1.jpg",
    "project/bookstore/web/book2.jpg", "project/bookstore/web/book3.jpg",
    "project/cbs.png", "project/cdjl2.png",
    "素材说明.txt",
}

moved, kept = 0, 0
for f in SRC.rglob("*"):
    if not f.is_file():
        continue
    rel = f.relative_to(SRC).as_posix()
    if rel in referenced:
        kept += 1
        continue
    target = DST / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(f), str(target))
    moved += 1

# 未被引用的 icons/ui/my-farm.png（引用的是 my-farm-web.png）
extra = ROOT / "public" / "assets" / "icons" / "ui" / "my-farm.png"
if extra.exists():
    t = ROOT / "materials-src" / "assets" / "icons" / "ui" / "my-farm.png"
    t.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(extra), str(t))
    moved += 1

# 清理空目录
for d in sorted([p for p in SRC.rglob("*") if p.is_dir()], reverse=True):
    try:
        d.rmdir()
    except OSError:
        pass

print(f"moved {moved}, kept {kept}")
