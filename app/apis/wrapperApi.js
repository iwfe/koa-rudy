/**
 * Created by slashhuang on 17/1/23.
 * 统一包裹action的处理行为
 */
import { successToJson,errorToJson } from '../response';

exports.wrapperActionHandler=(action)=>async (ctx,next)=>{
    let data = await action(ctx,next);
    console.log('fuck')
    if(process.env['NODE_ENV']=='dev'){
        ctx.set("Access-Control-Allow-Origin", "*")
    }
    //有数据的情况说明不是走的proxy
    if(data){
            console.log('fuck2')

        let HasError  = data.err||data['message']
        //抛错
        if(HasError){
            errorToJson(ctx,400,HasError);
        }else {
            console.log(`response success with data --${JSON.stringify(data).substr(0,10)}`);
            successToJson(ctx, data)
        }
    }
        console.log(data)

};


