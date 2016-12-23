const assert = require('assert');
const mocha = require('mocha');
const expect = require('chai').expect;
const axios = require('axios');
const copy = require('copy-to');
const querystring = require('querystring');

let baseUrl = "http://localhost:3001/api/alicai/";
// axios.interceptors.request.use(function(config){
//     console.log(config)
//     return config;
// },function(error){
//     return Promise.reject(error);
// })

// axios.interceptors.response.use(function(response){
//     console.log(response)
//     return response;
// },function(error){
//     return Promise.reject(error);
// })

// axios.get(baseUrl+'fcblist',param).then(function(response){
//     console.log(response)
// }).catch(function(error){
//     console.log(error)
// })
async function commonFetch(params) {
    params = copy({
        method: 'get',
        url: '',
        params: {},
        timeout: 5000,
    }).to(params);

    return axios(params);
}

let p2pData = {
    "_input_charset": "utf-8",
    "memo": "",
    "partner_id": "188888888888",
    "r": "38975",
    "version": "1.0",
    "page_num": "1",
    "page_size": "10",
    "version": "1.0"
}

describe('爱理财服务', function() {
    it('爱理财列表', function() {
        return commonFetch({ url: baseUrl + 'fcblist', params: p2pData }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('爱理财详情', function() {
        let data = {
            position: 0,
            type: 0,
            productCode: 0
        };

        return commonFetch({ url: baseUrl + 'getQRImage', data: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('app二维码', function() {
        let data = {
            position: 0,
            type: 0,
            productCode: 0
        };
        return commonFetch({ url: baseUrl + 'getQRImage', params: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json.data).to.not.be.empty;
        });
    });

    it('风险准备金和赔付记录', function() {
        let data = {
            pageNo: 1,
            pageSize: 5
        };
        return commonFetch({ url: baseUrl + 'paidRecord', params: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('安全卡列表', function() {
        return commonFetch({ url: baseUrl + 'bankcardList' }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('通知列表', function() {
        let data = {
            page: 1,
            size: 10
        }

        return commonFetch({ url: baseUrl + 'noticeList', params: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('通知详情', function() {
        let data = {
            id: 272
        }

        return commonFetch({ url: baseUrl + 'noticeDetail', params: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('首页通知', function() {
        return commonFetch({ url: baseUrl + 'indexNotices' }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('pc banner列表', function() {
        return commonFetch({ url: baseUrl + 'banners' }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('刷新产品状态', function() {
        let data = {
            productCodes: '20161123114356S70003'
        }
        return commonFetch({ url: baseUrl + 'freshProductStatus', params: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('获取投资列表', function() {
        let data = {
            productCode: '20161123114356S70003'
        }

        return commonFetch({ url: baseUrl + 'investRecord', params: data }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('查询风险保证金余额', function() {
        return commonFetch({ url: baseUrl + 'getLoanPromision' }).then(function(data) {
            return data;
        }).then(function(json) {
            expect(json).to.not.be.empty;
        });
    });

    it('借款协议', function(){
        return commonFetch({url:baseUrl+'protocal?productCode=21487e61e531b71a3c4cd076bc9737884ff5bbfadd889c49',param:p2pData}).then(function(data){
            return data;
        }).then(function(json){
            expect(json).to.not.be.empty;
        });
    });

    it('详情', function(){
        return commonFetch({url:baseUrl+'detail?productCode=21487e61e531b71a3c4cd076bc9737884ff5bbfadd889c49',param:p2pData}).then(function(data){
            return data;
        }).then(function(json){
            expect(json).to.not.be.empty;
        });
    });
})