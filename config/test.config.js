/*
* @Author: enzo
* @Date:   2016-11-07 18:56:35
* @Last Modified by:   slashhuang
* @Last Modified time: 2016-12-29 16:10:29
* 配置信息都将挂在global对象下
*/


module.exports = {
    /**
     * 静态资源配置
     */
    staticConfigs:{
        staticResourceConfigURL: 'http://',
        staticResourceURL:'http://iwjw-resource.oss-cn-hangzhou-internal.aliyuncs.com/iwjw-pc/staticResource.properties'
    },
    /**
     * 服务配置
     */
    cmsSoa: 'http://cmssoa.iwjwtest.com/IWCmsSOA/',

    mbaLiacaiSoa: 'http://30.0.0.12/',

    noticeSoa: 'http://iwnoticeserv.iwjwtest.com/',

    p2pSoa: 'http://30.0.0.12/',

    userSoa: 'http://usersoa.iwjwtest.com/IWUserSOA/',
}