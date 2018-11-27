'use strict';
const fs = require('fs');
const path = require('path');
const dayjs=require('dayjs');
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
    const dirName = dayjs(Date.now()).format('YYYYMMDD');
    // 判断文件夹是否存在，不存在则直接创建文件夹
    // console.log(fs.existsSync(path.join(this.config.baseDir,uploadBaseLoad,dirName)));
    if(!fs.existsSync(path.join(this.config.baseDir,uploadBaseLoad,dirName))) fs.mkdirSync(path.join(this.config.baseDir,uploadBaseLoad,dirName));
    //生成写入路径
    const target = path.join(this.config.baseDir,uploadBaseLoad,dirName,fileName);
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
        "src": '/public/upload/'+dirName+'/'+ fileName
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
  //删除上传的图片,重新上传
  async delImg(){
    const { ctx}=this;
    const delBaseLoad = 'app/';
    const body=ctx.request.body.imgURLs;
    if(!body){
      return false;
    }
    console.log(body)
    let sign;//删除标志符 false标识文件已被删除
    await body.forEach(imgURL => {
     fs.unlinkSync(path.join(this.config.baseDir,delBaseLoad,imgURL));
     sign=fs.existsSync(path.join(this.config.baseDir,delBaseLoad,imgURL))
   });
    if(!sign){
      ctx.status=200;
      ctx.body={code:1,msg:'删除成功'}
    }else{
      ctx.status=500;
      ctx.body={code:0,msg:'删除失败'}
    }

  }
}

module.exports = UploadController;