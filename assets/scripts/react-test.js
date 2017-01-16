/*
* @Author: zoucong
* @Date:   2017-01-16 18:55:40
* @Last Modified by:   zoucong
* @Last Modified time: 2017-01-16 19:43:27
*/

'use strict';

import React from 'react';
import {render} from 'react-dom';
import Hello from '../../app/jsx/hello.jsx';

render(<Hello {...window.pageConfig.reactInitData}/>,document.getElementById('react-root'));
