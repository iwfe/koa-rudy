/*
* @Author: enzo
* @Date:   2016-11-15 11:10:29
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 19:09:48
*/

'use strict';

export default function listReducer(state = [], action) {
  switch(action.type) {

    case 'FETCH_LIST_SUCCESS': 
        return {a:1};

    default: return state;
  }
}