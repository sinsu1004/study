module.exports = app =>{
    const api= require("../api/api.js");

    var router = require("express").Router();

    
    router.get('/:id',api.getHorrorById);
    router.post('/',api.getHorrorByAll);
    router.get('/t/:id',api.getHorrorById2);
    router.post('/save',api.save);
    router.post('/sq',api.squareGrid);
    router.post('/ss',api.save2);
    router.post('/loding',api.loding);

    app.use('/test',router)


};