# obs-vitesse

English Readme is preparing...

## 基本介绍

这是一个OBS的直播包装模板，可以基于前端技术（Vite / Vue3）搭建一个直播包装界面（如篮球直播计分板、歌舞直播字幕条），同时兼顾直播时的数据实时同步和页面响应式更新。

项目基于[vitesse-lite](https://github.com/antfu-collective/vitesse-lite)模板。感谢[antfu](https://github.com/antfu)。

## 特色功能
- 🔥 最新的技术栈支持（Vite / Vue3 / UnoCSS / TypeScript）
- 🌐 使用WebSocket或HTTP轮询实时更新数据
- 📄 [基于文件的路由](src/pages/README.md)（支持实时更新）
- 💽 Pinia状态管理（支持实时更新）
- 🧰 [组件自动导入](src/components/README.md)
- ☁️ 一键部署到Netlify
- 🔎 简洁高效的Debug Panel

## 快速开始

### 客户端（本项目）
```shell
mkdir obs-vitesse-demo
cd obs-vitesse-demo
degit gaojunran/obs-vitesse
pnpm install
pnpm run dev
```

浏览器访问`localhost:3333`，即可预览此页面。

使用OBS采集浏览器源或浏览器窗口源，即可将此包装用于直播中。

### 服务端（项目[gaojunran/simple-ws-server](https://github.com/gaojunran/simple-ws-server)）
```shell
mkdir ws-server
cd ws-server
degit gaojunran/simple-ws-server
pip install websockets
python main.py -p 8080
```

立刻刷新浏览器，查看服务器中是否显示有客户端连入。

在浏览器窗口按下空格打开调试面板，查看服务器连接状态。如果显示`OPEN`，则表示您可以继续。

从服务器向客户端传递消息：`cnt=1`，查看浏览器中`count`值的变化。

从服务器向客户端传递消息：`$more`，查看浏览器路由和页面的变化。


## 常见问题

### 如何将浏览器窗口的特定颜色设为透明？

在很多场景中（如字幕条），你可能希望浏览器窗口是透明的，此功能可以在OBS中实现：

右键当前源——滤镜——色值——选择关键颜色。

### 如何自己搭建一个WebSocket服务器？
这是我写的一个Python语言的WebSocket服务器极简实例：[gaojunran/simple-ws-server](https://github.com/gaojunran/simple-ws-server)

在本机的某一端口建立服务，可以将标准输入流中的消息广播给所有已连接的客户端，同时在标准输出流中展示收到的消息。

如果你想要在互联网中的远程WebSocket服务器，上面的脚本依然可用，但你需要花费额外的精力将它部署到有公网ip的服务器上。

如果你想从底层开始构建WebSocket服务器或是了解其原理，可以参阅[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)。

### 这个项目的特点在哪里？
如你所见，这个项目要求你至少有Vue开发的基础。通常篮球比赛计分板、歌舞节目字幕等直播场景需要特殊的软件，或需要编写不易维护的OBS脚本，而这个项目给前端开发者们提供了更符合他们工作流程的体验，理念上就像[slidev](https://github.com/slidevjs/slidev)。

### 我该如何改造这个模板以符合我的个性化需求？
一个通常的流程如下：
1. 浏览各个文件夹，了解它们的功能职责。`pages`文件夹中的vue组件与路由相关联；`App.vue`、`main.ts`和`main.css`分别是Vue组件、脚本和样式的入口文件，它们包含了很多默认配置，通常不需要修改。
2. 改造`pages/index.vue`文件，使得页面样式和结构符合你的需求。
3. 将你需要的响应式状态定义在`stores/states.ts`中（代码注释提示了你应该补充在哪里）。注意你需要在`IStates`和`useStatesStore`中定义两次，以避免TypeScript类型错误。
4. 在`pages/index.vue`文件中按如下方式引用这些响应式数据。
   ```vue
   <script lang="ts" setup>
   import { storeToRefs } from 'pinia'
   const states = useStatesStore()
   const counter = computed(() => states.counter)
   // OR
   const { counter } = storeToRefs(states);
   </script>

   <template>
   <div>{{ counter }}</div>
   <!-- OR -->
   <div>{{ states.counter }}</div>
   </template>
   ```

5. 通常你需要从服务端传输如下格式的JSON消息来改变状态，但你也可以定义任意字符串解析逻辑，在`utils/parse.ts`中定义即可。
   ```json
   {"state": "counter", "value": 1}
   ```
6. 继续编写其它路由对应的页面。通常你可以从服务端传输如下格式的JSON消息来改变路由，但你也可以定义任意字符串解析逻辑，在`utils/parse.ts`中定义即可。
    ```json
   {"route": "about"}
   ```

### 为什么你使用了WebSocket，而不是一个普通的HTTP API，或是使用更简单的数据库等方案？
一个最直接的原因是实时性。WebSocket支持服务端向客户端主动推送消息，这规避了轮询带来的不必要的流量和延迟问题。OBS也原生支持WebSocket，但涉及到界面上复杂的交互很不方便。

### 为什么你使用了Pinia，而不是其它方案？
Pinia提供了一个非常简单的全局状态管理的方案，很适合这个项目。值得注意的是，Pinia store的属性（state）如果被直接解构，似乎不带有响应性。根据官方文档，推荐使用`const { counter } = storeToRefs(states);`的方式来提供可读写的响应式。

## 注意事项

- 目前调试期间在本地启动Vite服务时，有小概率出现部分UnoCSS样式失效，无法在OBS的“浏览器”源中正常展示的问题。
  临时修复：您可使用显示正常的浏览器访问，并使用OBS的“窗口捕捉”源展示页面。
- 目前项目运行逻辑中，多次接收到同样消息时，只会触发一次更新，因此第二次收到同样消息时不会向服务器推送反馈消息。
