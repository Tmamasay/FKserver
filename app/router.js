'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //管理员登录
  router.post('/login', controller.login.login.login);
  //微信登录，存入数据
  router.post('/register',controller.login.login.register);
  //上传图片
  router.post('/uploadImg',controller.upload.upload.uploadImg);
  //删除上传的图片，重新上传
  router.post('/delImg',controller.upload.upload.delImg);
  //模拟热门博主
  router.post('/mnData',controller.upload.upload.mnData);
  //上传商品主表信息
  router.post('/commodinfo',controller.commod.commod.commodinfo);
  //查询库存信息
  router.get('/repertory',controller.commod.commod.repertory);

  

};
