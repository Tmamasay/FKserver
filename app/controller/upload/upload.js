'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');

class UploadController extends Controller {
  //上传图片
  async uploadImg() {
    const {
      ctx
    } = this;
    //获取steam文件
    const stream = await ctx.getFileStream();
    //指定上传的基础目录
    const uploadBaseLoad = 'app/public/upload/';
    //生成的文件名
    const fileName = Date.now() + "" + Number.parseInt(Math.random() * 1000) + "" + path.extname(stream.filename);
    //生成文件夹
    const target = path.join(this.config.baseDir, uploadBaseLoad, fileName);
    //写入流的路径
    const writeStream = fs.createWriteStream(target);
    //异步写入流
    await pump(stream, writeStream);
    // console.log(ctx)
    // ctx.headers("Access-Control-Allow-Origin", "*") 
    ctx.status = 200;
    ctx.body = {
      "code": 0,
      "msg": "成功",
      "data": {
        "src": '/public/upload/' + fileName
      }
    }

  }
  //提交模拟热门博主
  async mnData(){
     const {ctx,service}=this;
     const body=ctx.request.body;
     const res= await service.utils.sql.writeSql(body,'ml_bz_data',false);
    //  console.log(res)
      if(res.result.affectedRows===1){
      ctx.status=200;
      ctx.body={code:1,msg:'成功'}
    }else{
      ctx.status=500;
      ctx.body={code:0,msg:'失败'}
    }
  }
}

module.exports = UploadController;