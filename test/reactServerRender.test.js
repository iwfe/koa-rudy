/*
* @Author: zoucong
* @Date:   2017-01-16 14:26:03
* @Last Modified by:   zoucong
* @Last Modified time: 2017-01-16 17:44:49
*/

'use strict';

const mocha = require('mocha');
const expect = require('chai').expect;

import * as reactServerRender from '../utils/reactServerRender/';
import React,{Component} from 'react';

class Hello extends Component{
  render(){
    return <div>Hello {this.props.name}</div>;
  }
}

describe('reactServerRender test',function() {
  it('输入组件Dom返回html string', function() {
    let _html = reactServerRender.renderToString(<Hello name="world"/>);
    expect(_html)
      .to.be.a('string')
      .and.match(/<div.*>.*<\/div>/)
      .and.match(/world/);
  });

  it('输入组件class及props返回html与json',function(){
    let res = reactServerRender.render(Hello,{name:'world'});
    expect(res).to.be.a('object');
    expect(res._html)
      .to.be.a('string')
      .and.not.be.empty;
    expect(res._json)
      .to.be.a('string')
      .and.not.be.empty;
  });
});

