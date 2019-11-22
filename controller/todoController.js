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