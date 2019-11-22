本项目实现了nodejs的基本用法：

1：引入express框架
const express = require('express');

2： 引入自定义模块
let todoController = require('./controller/todoController');

3： 实例化app对象
let app = express();

4： 配置视图引擎
app.set('view engine','ejs');

5： 资源静态化
app.use(express.static('./public'));

6：将app对象传入自定义模块，并执行自定义模块
todoController(app);

7： 监听端口号
app.listen('3000');



自定义模块：

const bodyParser = require('body-parser')

// 对数据进行解析
let urlencodeParser = bodyParser.urlencoded({extended:false});



module.exports = function (app) {
    let datas = [
        {item:"大家好！我是个篮球运动员！"},
        {item:"大家好！我是个足球运动员！"},
        {item:"大家好！我是个羽毛球运动员！"}
    ];
    let completedDatas = [ {item:"大家好！我是个篮球运动员！"},];
    // 获取数据
    app.get('/todo',function(req,res){
        res.render('todo',{todos:datas,completedDatas:completedDatas});
    });

    // 传递数据
    app.post('/todo',urlencodeParser,function(req,res){
        datas.push(req.body);
    });

    // 删除数据
    app.delete('/todo/:item',function(req,res){
        // 将满足条件的数据过滤出去    req.params.item : 获取路由参数
        let idx = datas.findIndex((data) => {
            return data.item == req.params.item;
        })
        datas.splice(idx,1);
        // 将删除后剩余的数据返回
        res.json(datas);
    });


}
