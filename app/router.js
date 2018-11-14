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
  //上传文件
  router.post('/uploadImg',controller.upload.upload.uploadImg);
  //模拟热门博主
  router.post('/mnData',controller.upload.upload.mnData);

};
