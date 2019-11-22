/* 搭建服务器，配置服务器相关信息 */

// 引入express框架
const express = require('express');

// 引入自定义模块
let todoController = require('./controller/todoController');

// 实例化app对象
let app = express();

// 配置视图引擎
app.set('view engine','ejs');

// 资源静态化
app.use(express.static('./public'));

todoController(app);

// 监听端口号
app.listen('3000');