
//登录
'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
   //管理员登录
  async login() {
    const {ctx,service}=this;
    const body=ctx.request.body;
    console.log(body);
    const username=body.username;
    const passworld=body.password;
    let res=await service.loginadmin.login.find(username);
    // res=JSON.stringify(res); 
    console.log(res);
    // console.log(res.admin_passworld.username);
    if(res.admin_passworld==null){
      ctx.status = 200;
      ctx.body={code:0,msg:'用户不存在'};
    
    }else{
      if(passworld==res.admin_passworld.passworld){
        ctx.status = 200;
        ctx.body={code:1,msg:'登录成功'};
      }else{
        ctx.status = 200;
        ctx.body={code:2,msg:'密码错误'};
      }

    }
       
  }
   //用户注册
   async register(){
    const {ctx,service}=this;
    const body=ctx.request.body;
    // console.log(body);
    // console.log(typeof(body));
    let res=await service.loginadmin.login.write(body);
       console.log(res)
    if(res.result.affectedRows===1){
      ctx.status=200;
      ctx.body={code:1,msg:'成功'}
    }else{
      ctx.status=500;
      ctx.body={code:0,msg:'失败'}
    }
  
    }
}

module.exports = LoginController;