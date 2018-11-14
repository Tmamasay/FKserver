'use strict';
const uuidv1=require('uuid/v1')
const Service=require('egg').Service;

class UserService extends Service{
        //查找后台管理员
        async find(username){
         const admin_passworld=await this.app.mysql.get('administrator',{
          username:username
         });
         return {admin_passworld};
        }
        //向数据库写入用户信息
        async write(options){
         options=Object.assign(options,{ID:uuidv1()})
         const result=await this.app.mysql.insert('fk_user',options)

         return {result};
        }


}
module.exports = UserService;
