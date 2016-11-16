/*
* @Author: enzo
* @Date:   2016-11-15 11:13:24
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 11:16:42
*/

'use strict';

import fetch from 'axios';

export function fetchList() {
  return (dispatch) => {
    return fetch('/api/list')
        .then(res => res.json())
        .then(json => dispatch({ type: 'FETCH_LIST_SUCCESS', payload: json }));
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