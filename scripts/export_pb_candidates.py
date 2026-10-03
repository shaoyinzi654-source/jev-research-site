"""Export the selected held-out query's real Pb development-pool coordinates."""
from __future__ import annotations

import csv
import sys
from pathlib import Path

project_root = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(project_root / "scripts"))
import publication_figures_v10 as figures  # noqa: E402

data = figures.b.cached.load()
query, pool, gated, global_refs, local_refs = figures.old.case_refs(data)
distances = figures.b.cached.mechanism_distances(pool, query)
order = distances.argsort(kind="stable")
rank_by_id = {pool[index]["_id"]: rank for rank, index in enumerate(order)}
global_id = global_refs[0]["_id"]
local_id = local_refs[0]["_id"]
output = Path(__file__).resolve().parents[1] / "dist/assets/pb-candidate-rank-qe.csv"
with output.open("w", encoding="utf-8", newline="") as stream:
    writer = csv.writer(stream)
    writer.writerow(["global_distance_rank", "Qe_mg_g", "inside_8_to_16", "global_neighbour", "range_neighbour"])
    for rank, index in enumerate(order):
        item = pool[index]
        writer.writerow([
            rank + 1,
            item["qe"],
            int(8 <= item["qe"] < 16),
            int(item["_id"] == global_id),
            int(item["_id"] == local_id),
        ])
print(f"Exported {len(pool)} records; {len(gated)} in range; QG={global_refs[0]['qe']:.2f}; QB={local_refs[0]['qe']:.2f}.")
