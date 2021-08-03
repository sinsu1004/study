module.exports = app =>{
    const api= require("../api/api.js");

    var router = require("express").Router();

    
    router.post('/test',api.test);
    router.post('/',api.getHorrorByAll);
    router.post('/t/t',api.getHorrorById2);
    router.post('/save',api.save);
    router.post('/sq',api.squareGrid);
    router.post('/ss',api.save2);
    router.post('/loding',api.loding);
    router.post('/loder',api.roder);
    router.post('/data',api.datatest);
    router.post('/data2',api.userdata);
    router.post('/dd',api.tiledata);
    router.post('/dd2',api.buydata);

    app.use('/test',router)


};