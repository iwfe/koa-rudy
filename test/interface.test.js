/*
 * @Author: enzo
 * @Date:   2016-12-26 19:44:21
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-26 19:44:21
 */

const assert = require('assert');
const mocha = require('mocha');
const expect = require('chai').expect;
const axios = require('axios');
const copy = require('copy-to');

let baseUrl = "http://localhost:3001/api/";

async function commonFetch(params) {
    return axios(params);
}

describe('koa-rudy test demo', function() {
    it('subject v1 test', function() {
        return commonFetch({ url: baseUrl + 'v1/subject/:id' }).then(function(data) {
            return data;
        }).then(function(resp) {
            expect(resp).to.not.be.empty;
            expect(resp.status).to.equal(200);
        });
    });

    it('subject v2 test', function() {
        return commonFetch({ url: baseUrl + 'v2/subject/:id' }).then(function(data) {
            return data;
        }).then(function(resp) {
            expect(resp).to.not.be.empty;
            expect(resp.status).to.equal(200);
        });
    });

    it('tag list', function() {
        return commonFetch({ url: baseUrl + 'tag' }).then(function(data) {
            return data;
        }).then(function(resp) {
            expect(resp).to.not.be.empty;
            expect(resp.status).to.equal(200);
        });
    });
})