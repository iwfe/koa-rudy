/*
* @Author: enzo
* @Date:   2016-11-15 11:10:11
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 19:13:21
*/

'use strict';

import { combineReducers } from 'redux';
import listReducer from './list';
import itemReducer from './item';
import undoable from 'redux-undo';

export default combineReducers({
    list: undoable(listReducer),
    item: undoable(itemReducer)
})