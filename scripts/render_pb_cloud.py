"""Render an accessible, real-data SVG from the accompanying compact CSV."""
from __future__ import annotations

import csv
import math
from pathlib import Path

root = Path(__file__).resolve().parents[1]
csv_path = root / "dist/assets/pb-candidate-rank-qe.csv"
svg_path = root / "dist/assets/pb-candidate-cloud.svg"
records = list(csv.DictReader(csv_path.open(encoding="utf-8")))
left, right, top, bottom = 35.0, 218.0, 22.0, 84.0
log_values = [math.log10(float(r["Qe_mg_g"])) for r in records]
qmin, qmax = min(log_values), max(log_values)

def point(rank: int, log_qe: float) -> tuple[float, float]:
    x = left + (rank - 1) * (right - left) / (len(records) - 1)
    y = bottom - (log_qe - qmin) * (bottom - top) / (qmax - qmin)
    return x, y

band_y = lambda q: bottom - (math.log10(q) - qmin) * (bottom - top) / (qmax - qmin)
parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 113" role="img" aria-labelledby="title desc">',
    '<title id="title">279 条 Pb 开发记录的真实容量与距离排名</title>',
    '<desc id="desc">横坐标为对实验状态的全局距离排名，纵坐标为实测 Qe 的对数。橙色带为 8 至 16 毫克每克范围，共 77 条记录。青色描边标出全局最近邻，紫色描边标出所选范围内最近邻。</desc>',
    '<rect x="0" y="0" width="230" height="113" fill="#fff"/>',
    '<text x="0" y="11" font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#526875">Pb 开发库 · 全局距离 × 实测容量</text>',
]
band_top, band_bottom = band_y(16), band_y(8)
parts.append(f'<rect x="{left}" y="{band_top:.3f}" width="{right-left}" height="{band_bottom-band_top:.3f}" fill="#ed851f" opacity=".18"/>')
for tick in (1, 10, 100):
    value = math.log10(tick)
    if qmin <= value <= qmax:
        y = band_y(tick)
        parts.append(f'<path d="M{left} {y:.3f}H{right}" stroke="#d8e0e2" stroke-width=".55"/>')
        parts.append(f'<text x="{left-4}" y="{y+2:.3f}" text-anchor="end" font-family="Arial,sans-serif" font-size="8" fill="#6c7c84">{tick}</text>')
parts.append(f'<path d="M{left} {top}V{bottom}H{right}" fill="none" stroke="#9aaab1" stroke-width=".65"/>')
for index, record in enumerate(records):
    rank = int(record["global_distance_rank"])
    q = float(record["Qe_mg_g"])
    x, y = point(rank, math.log10(q))
    fill = "#ed851f" if record["inside_8_to_16"] == "1" else "#8597a0"
    radius = 1.05 if record["inside_8_to_16"] == "1" else .82
    parts.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{radius}" fill="{fill}" fill-opacity=".8"/>')
    if record["global_neighbour"] == "1":
        parts.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="2.15" fill="none" stroke="#00a69a" stroke-width="1.25"/>')
    if record["range_neighbour"] == "1":
        parts.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="2.15" fill="none" stroke="#7451a7" stroke-width="1.25"/>')
parts.extend([
    '<text transform="translate(10 56) rotate(-90)" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#71818a">Qₑ (mg/g · log₁₀)</text>',
    f'<text x="{left}" y="99" font-family="Arial,sans-serif" font-size="8" fill="#71818a">排名 1</text>',
    f'<text x="{right}" y="99" text-anchor="end" font-family="Arial,sans-serif" font-size="8" fill="#71818a">279</text>',
    '<text x="126" y="109" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#71818a">全局距离排名</text>',
    '</svg>',
])
svg_path.write_text("\n".join(parts), encoding="utf-8")
print(f"Rendered {len(records)} measured Pb records to {svg_path.name}.")
