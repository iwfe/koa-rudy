/*
* @Author: zoucong
* @Date:   2017-01-16 18:22:25
* @Last Modified by:   zoucong
* @Last Modified time: 2017-01-16 18:50:36
*/

'use strict';
import { render } from '../utils/reactServerRender/';
import { successToView } from './response';


export default function(ctx, context, component) {
  let {Page,props,config} = component;
  return successToView(ctx, 'react-page', Object.assign(context,render(Page, props, config)));
}

