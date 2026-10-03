# JEV RESEARCH

全新学术展示站，以 BRAINs LAB 参考站的白色动态首屏、深蓝标题、洋红强调、黑色固定滚动章节与错位研究展示为设计参考。视觉图形为自行编写的 WebGL 和 SVG，不使用生成式图片，不复用参考站的视频、标识或研究材料。

## 本地预览

在本目录运行：

```powershell
python -m http.server 4173 --directory dist
```

打开 http://127.0.0.1:4173/ 。无需安装前端依赖或构建。

## 文件

- `dist/index.html`：研究页面与联系入口。
- `dist/academic.css`：桌面与手机布局、视觉和滚动章节。
- `dist/academic.js`：研究详情、证据切换、五张组图放大和下载。
- `dist/scene.js`：程序化三维生物炭结构概念动画；支持暂停、减少动态与 WebGL 不可用时的静态备用显示。
- `dist/assets/research/`：项目 publication_v10 的五张原有研究组图，提供 PDF、SVG 和 PNG。
- `dist/assets/pb-candidate-rank-qe.csv`：279 条候选记录。
- `backups/index-before-postech-full-redesign.html`：重设计前备份。
- `previews/`：浏览器效果截图。

合作邮箱：yinzi.shao@outlook.com（用户确认）。

## 结果范围

数值对应原项目当前数据划分。金属方法的误差置信区间存在重叠；有机物评估使用有标签目标上下文。网站不宣称统计显著优势或零样本迁移。三维结构与研究卡片是概念展示，不是原子模拟或数据分布图。

## 发布状态

网站通过 GitHub Pages 发布。GitHub Actions 从 `dist/` 部署静态站点；`.openai/` 中的托管元数据仅用于本地工作，不提交到公开仓库。

公开地址：<https://shaoyinzi654-source.github.io/jev-research-site/>
