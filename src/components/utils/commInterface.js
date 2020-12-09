// import vue from 'vue';
// // const util = require("util");
// import * as util from '@/components/utils/util';
// import * as componentConstant from '@/components/constant/componentConstant';
// import * as msgConstant from '@/components/constant/msgConstant';

// const vue = require("vue");
const util = require("@/components/utils/util");
const componentConstant = require("@/components/constant/componentConstant");
const msgConstant = require("@/components/constant/msgConstant");

/**
 * 通过主键获取用户信息
 * @param uri 请求地址
 * @param params 查询条件
 */
export function getUserById(uri, params, infoArr) {
    console.log('params',params);
    console.log('util',util);
    util.$http.post(uri, params).then(function (res) {
        if(!util.empty(uri)){
            let info = res.data;
            for(let item in info){
                for(let i=0;i< infoArr.length; i++){
                    let name = infoArr[i].name;
                    if(name==item){
                        infoArr[i].fieldValue = info[item];
                        break;
                    }
                }
            }
        } else {
            util.showMsg(msgConstant.msgCommon.URL_NOT_NULL,componentConstant.MessageProperties.ERROR);
        }

    });
}
