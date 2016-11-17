/*
* @Author: enzo
* @Date:   2016-11-15 19:25:02
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-17 10:08:40
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList, fetchItem } from '../action';

function mapStateToProps(state) {
    setTimeout(function(){
         console.log(state);
    }, 3000);
  return {
    list: state.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getlist: async () => {
         await fetchList()(dispatch);
    },
    reduce: () => {
        
    }
  }
}

class Hello extends Component {
    constructor(props){
        super(props);

        //this.props.getlist();
    }

    render() {
        var list = this.props.list;
        console.log(list);
        return (

          <p>hello react11</p>
        );
    }
}

Hello.propTypes = {
    reduce: (dispatch) => {
        fetchList()(dispatch);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);