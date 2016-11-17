/*
* @Author: enzo
* @Date:   2016-11-15 11:13:24
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 19:24:08
*/

'use strict';

import axios from 'axios';

export function fetchList() {
  return (dispatch) => {
    return axios.get('http://localhost:3000/api/home').then((res)=>{
          dispatch({ type: 'FETCH_LIST_SUCCESS', list: res.data })
        })
    }
}

export function fetchItem(id) {
  return (dispatch) => {
    if (!id) return Promise.resolve();
    return fetch(`/api/item/${id}`)
        .then(res => res.json())
        .then(json => dispatch({ type: 'FETCH_ITEM_SUCCESS', payload: json }));
  }
}