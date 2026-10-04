# JEV RESEARCH

An English academic research website presenting JEV adsorption capacity estimation. The site combines a white animated hero, navy typography, magenta accents, a dark scrolling section and research cards. All conceptual visuals are implemented directly in WebGL and SVG.

## Local preview

Run from this directory:

```powershell
python -m http.server 4173 --directory dist
```

Open http://127.0.0.1:4173/. No frontend dependencies or build step are required.

## Files

- `dist/index.html`: Research page and contact entry.
- `dist/academic.css`: Desktop and mobile layouts and scrolling sections.
- `dist/academic.js`: Research details, evidence views and figure downloads.
- `dist/scene.js`: Procedural carbon-layer animation, with pause, reduced-motion and static fallback support.
- `dist/assets/research/`: Five publication_v10 figures in PDF, SVG and PNG formats.
- `dist/assets/pb-candidate-rank-qe.csv`: 279 candidate records.
- `backups/` and `previews/`: Local archives and screenshots, excluded from version control.

Contact: yinzi.shao@outlook.com.

## Evidence scope

Results refer to the current project datasets and splits. Metal evaluation is retrospective; MAE intervals overlap. Organic evaluation uses labelled target context. Animated carbon structures and research card artwork are conceptual illustrations.

## Deployment

GitHub Actions deploys the static website from `dist/` to GitHub Pages. Local hosting metadata in `.openai/` is excluded from the public repository.

Live website: <https://shaoyinzi654-source.github.io/jev-research-site/>
