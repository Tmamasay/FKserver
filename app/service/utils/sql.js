'use strict'
const uuidv1=require('uuid/v1');//生成uuid
const Service=require('egg').Service;

class WriteSqlService extends Service{
/**
 * 向mysql写入信息
 * @param {Object} options - 写入数据
 * @param {string} _sqlTable - 数据库表名
 * @param {boolean} isAdd - 判断是自增id还是uuid
 *  */
async writeSql(options,_sqlTable,isAdd){
    if(isAdd){
         options=Object.assign(options,{ID:uuidv1()})
    }

    const result=await this.app.mysql.insert(_sqlTable,options);
    return {result};

}


}
module.exports=WriteSqlService;