/*
* @Author: enzo
* @Date:   2016-11-23 10:23:20
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-23 18:22:08
*/

const assert = require('assert');
const mocha = require('mocha');
const expect = require('chai').expect;

import {getDetail, 
        getfcblist, 
        getoOrderInfo, 
        getNoticeList,
        getHomeNoticeList, 
        getBankList, 
        getBanners,
        getNoticeDetail, 
        getPaidRecord, 
        getBalance, 
        getInvestSubject, 
        getReserve} from "../service/licaiService.js";
describe('爱理财服务', function(){
    it('详情页面', function(){
        getDetail().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('列表页面', function(){
        getfcblist().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('订单信息', function(){
        getoOrderInfo().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('公告列表', function(){
        getNoticeList().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('公告详情', function(){
        getNoticeDetail().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('银行列表', function(){
        getBankList().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('banner列表', function(){
        getBanners().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('支付记录', function(){
        getPaidRecord().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('getBalance', function(){
        getBalance().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('getInvestSubject', function(){
        getInvestSubject().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('getReserve', function(){
        getReserve().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
    it('getHomeNoticeList', function(){
        getHomeNoticeList().then(function(data){
            return data;
        }).then(function(json){
            expect(json.result_list).to.not.be.empty;
        });
    });
})










