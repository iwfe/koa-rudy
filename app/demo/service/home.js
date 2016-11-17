/*
* @Author: enzo
* @Date:   2016-11-10 11:22:41
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 18:03:33
*/

import axios from "axios";
import copy from "copy-to";

module.exports = {
    '_root': '/api',

    '/': async function(ctx, next){
        let data = {};
            
        // 单独请求
        await axios.get('http://localhost:3000/iwjw/newhouse')
          .then(function (response) {
              data = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
          

        // 合并请求
        // await axios.all([
        //     axios.get('http://localhost:3000/iwjw/newhouse'),
        //     axios.get('http://localhost:3000/iwjw/user')
        // ]).then(axios.spread(function (house, user) {
        //     data.house = house.data;
        //     data.user = user.data;
        // })).catch(function (error) {
        //     console.log(error);
        // });
    
        ctx.body = JSON.stringify(data);
    }
}


