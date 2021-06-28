# Simple Music
> `Simple Music`是一个使用vue全家桶写的一个移动端的SPA-音乐app, 总的来说也是自己用来学习vue的练手项目，包括了vue+vuex+vue-router+vue-cli全家桶，适合新手或者有一定vue使用经验的人。
最新版目前是第一版完成了一些功能，具体见功能特性，其中后台数据API来自开源项目：[网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi)，感谢原作者，感谢网易云。

## 在线网址

[Live_Demo](https://music.bowlofnoodles.top)
## 技术栈
vue2 + vuex + vue-router + vue-cli + es6 + stylus

## 功能特性
+ 推荐页面主页
+ 排行榜页面
+ 歌单列表页(歌单详情页)
+ 歌手页(歌手详情页)
+ 歌曲，歌单评论
+ 搜索页面 (目前仅支持搜索歌曲、搜索歌手)
+ 播放器内核 (播放暂停、上下首切换、歌词滚动、播放模式切换、播放进度条)
+ 7个基础组件(src/base)，已完成页面组件12个(src/pages)
+ better-scroll完成类移动端滚动体验
## 安装及快速开始
> Simple Music
``` bash
# 下载项目到本地
git clone git@github.com:bowlofnoodles/vue-music-app.git

# 跳转目录
cd vue-music-app

# 安装项目所需依赖
npm install

# 运行项目
npm run dev

# 项目打包
npm run build
```
> 后台接口代理
``` bash
# clone server仓库代码
git clone git@github.com:bowlofnoodles/NeteaseCloudMusicApi.git

cd pathToCode/

# 安装依赖
npm install

# 开启接口代理服务 默认端口为3000
npm start
```
## 部分截图
<div align="center">
  <img src="./screenshots/推荐.gif" title="推荐页"/>
  <img src="./screenshots/歌手.gif" title="歌手页"/>
</div>
<div align="center">
  <img src="./screenshots/歌单.gif" title="歌单页"/>
  <img src="./screenshots/歌单详情.gif" title="歌单详情页"/>
</div>
<div align="center">
  <img src="./screenshots/搜索.gif" title="搜索页"/>
  <img src="./screenshots/播放器.gif" title="播放器"/>
</div>

## 其它说明
+ 后台接口代理我自己fork了[网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi)的代码，你也可以自己下载放在自己的目录，对应的目录跟着修改就行。
+ 接口代理端口默认为3000，有需要可以自己修改，在api/config.js中可修改代理端口号。
+ 个人练手项目，欢迎沟通交流与star~，目前决定的功能中也有部分未完成，因此有些tab或者按钮点击没有反应，后续会持续更新功能和修复一些存在的问题。
+ 简单生活，简单音乐。

