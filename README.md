# JEV RESEARCH

An English academic research website presenting JEV adsorption capacity estimation. The October 2026 refresh combines a procedural carbon hero, navy typography, magenta accents, an actual Pb query card, a dark scrolling introduction, a visible research workflow and an updated five-figure collection. Conceptual visuals are implemented directly in WebGL and SVG.

## Local preview

Run from this directory:

```powershell
python -m http.server 4173 --directory dist
```

Open http://127.0.0.1:4173/. No frontend dependencies or build step are required.

## Files

- `dist/index.html`: Research page and contact entry.
- `dist/academic.css` and `dist/refinement.css`: Desktop and mobile layouts, typography and scrolling sections.
- `dist/academic.js`: Research details, actual evaluation plots and complete/mechanism figure views.
- `dist/scene.js`: Procedural carbon-layer animation, with pause, reduced-motion and static fallback support.
- `dist/assets/research/20261004/`: Latest five complete figures and five mechanism panels in PDF, SVG and 600 dpi PNG, lightweight WebP previews and a downloadable ZIP collection. Includes the latest Figure 2a connectors, Figure 3a Local argmin box and Figure 4a confidence branch corrections.
- `dist/assets/evidence-summary.json`: Actual metal evaluation points and metrics, figure metadata and the cached Pb query example.
- `dist/assets/twelve-model-benchmark.csv`: Actual selected 12-model MAE values and record-bootstrap intervals.
- `dist/assets/pb-candidate-rank-qe.csv`: 279 candidate records.
- `backups/` and `previews/`: Local archives and screenshots, excluded from version control.

Contact: yinzi.shao@outlook.com.

## Updating figures and page content

Run `scripts/refresh_publication_assets.py` in the original study workspace to refresh public assets from `output/figures/JEV五张组图_最新版`. Run `scripts/build_academic_refresh.py` after editing `scripts/academic_home.html` or `scripts/academic_interactions.js`. The carbon animation retains the previously restored version. The page has keyboard-accessible dialogs and reduced-motion support.

## Evidence scope

Results refer to the current project datasets and splits. Metal evaluation is retrospective; MAE intervals overlap. Organic evaluation uses labelled target context. Animated carbon structures and research card artwork are conceptual illustrations.

## Deployment

GitHub Actions deploys the static website from `dist/` to GitHub Pages. Local hosting metadata in `.openai/` is excluded from the public repository.

Live website: <https://shaoyinzi654-source.github.io/jev-research-site/>
