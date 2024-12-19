# obs-vitesse

## 基本介绍

这是一个OBS的直播包装模板，可以基于前端技术（Vite / Vue3）搭建一个直播包装界面（如篮球直播计分板、歌舞直播字幕），同时兼顾直播时的数据实时同步和页面响应式更新。

项目基于[vitesse-lite](https://github.com/antfu-collective/vitesse-lite)模板。感谢[antfu](https://github.com/antfu)。

## 特色功能
- 最新的技术栈支持（Vite / Vue3 / UnoCSS / TypeScript）
- 基于文件的路由（基于WebSocket实时更新）
- Pinia状态管理（基于WebSocket实时更新）
- 组件自动导入
- 一键部署到Netlify
- 简洁高效的Debug Panel

## 快速开始

TODO

## 注意事项

- 目前调试期间在本地启动Vite服务时，有小概率出现部分UnoCSS样式失效，无法在OBS的“浏览器”源中正常展示的问题。
  临时修复：您可使用显示正常的浏览器访问，并使用OBS的“窗口捕捉”源展示页面。
