/*
* @Author: enzo
* @Date:   2016-11-15 11:10:11
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 18:30:08
*/

'use strict';

import { combineReducers } from 'redux';
import listReducer from './list';
import itemReducer from './item';

export default combineReducers({
    list: listReducer,
    item: itemReducer
})

