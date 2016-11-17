/*
* @Author: enzo
* @Date:   2016-11-15 11:10:29
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 19:13:52
*/

'use strict';

export default function listReducer(state = [], action) {
  switch(action.type) {

    case 'FETCH_LIST_SUCCESS': 
        console.log(action);
        return [...action.list];

    default: return state;
  }
}