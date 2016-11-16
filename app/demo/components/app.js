/*
* @Author: enzo
* @Date:   2016-11-13 23:36:03
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 13:29:49
*/

import React from 'react';

const Demo = React.createClass({
  render() {
    return (
      <p>{this.props.children}</p>
    );
  }
})

export default Demo;
