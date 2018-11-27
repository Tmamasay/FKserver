//商品操作

'use strict'

const Controller = require('egg').Controller;
const extName = 'A';

class CommodController extends Controller {
  //上传商品,主要的信息(存于主表)
  async commodinfo() {
    const {
      ctx,
      service
    } = this;
    const body = ctx.request.body;
    const ID = extName + new Date().getTime();
    //body.COM_COLOR,body.COM_SIZE
    let arr_color = body.COM_COLOR.split(',');
    let arr_size = body.COM_SIZE.split(',');
    let arr_kc = [];
    let arr_kc_last = [];
    let sign = 0; //标志数组第一位的标识，1表示尺寸,2表示颜色
    if (arr_color.length - arr_size.length) {
      sign = 1;
      for (let index = 0; index < arr_size.length; index++) {
        const element = arr_size[index];
        for (let index = 0; index < arr_color.length; index++) {
          const element2 = arr_color[index];
          arr_kc.push(element);
          arr_kc.push(element2);
          arr_kc_last.push(arr_kc);
          arr_kc = []
        }

      }
    } else {
      
      for (let index = 0; index < arr_color.length; index++) {
        const element = arr_color[index];
        for (let index1 = 0; index1 < arr_size.length; index1++) {
          const element2 = arr_size[index];
          arr_kc.push(element);
          arr_kc.push(element2);
          arr_kc_last.push(arr_kc);
          arr_kc = []
        }

      }
    }
    // console.log()
    let kc_obj = {
      COM_ID: ID,
      RE_COLOR: '',
      RE_SIZE: '',
    }
    let kc_obj_last=[];
    //  console.log(arr_kc_last);
    arr_kc_last.forEach((value,index) => {
       
      
      if (sign) {
        kc_obj.RE_SIZE = value[0];
        kc_obj.RE_COLOR = value[1];
      } else {
        kc_obj.RE_COLOR = value[0];
        kc_obj.RE_SIZE = value[1];
      }
      // console.log(kc_obj);
      kc_obj_last.push(kc_obj);
      kc_obj={
        COM_ID: ID
      }
    });
    // console.log(kc_obj_last);
    //主表
    const res = await service.utils.sql.writeSqlSpcial(body, 'commodity_list', ID)
    //库存----
    const resRe = await service.utils.sql.writeSql(kc_obj_last, 'repertory_com', false);
    if (res.result.affectedRows === 1&&resRe.result.affectedRows) {
      ctx.status = 200;
      ctx.body = {
        code: 1,
        id: ID,
        msg: '成功'
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '失败'
      }
    }
  }
  //提交库存(存于库存表中)
  async repertory(){
    
    const {ctx,service} =this;
console.log(ctx.request.method)     
    
    if(ctx.request.method=='POST'){
console.log('333333---------')     
    }else if(ctx.request.method=='GET'){
console.log('222222222---------')
       let options = {
            where: {
                COM_ID: ctx.query.COM_ID,
            }, // WHERE 条件
            columns: ['RE_ID','RE_COLOR','RE_SIZE','RE_COUNT'], // 要查询的表字段
           // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        }
      const res= await service.utils.sql.selectSql('repertory_com',options);
      console.log(res);

    }else{
      // let options={}
      // const res= await service.utils.sql.selectSql('repertory_com',options);        

    }
    
  }


}
module.exports = CommodController;