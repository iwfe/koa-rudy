/*
* @Author: enzo
* @Date:   2016-11-16 14:43:51
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 15:36:57
*/

'use strict';

const defaultPage = function (html, initialState, pageConfig) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${pageConfig.title}</title>
    </head>
    <body>
      <div id="root">
        <div>
          ${html}1212123453453453451212
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      
    </body>
    </html>
  `;
}

const pageConfig = {
    index: {
        title: '首页',
        staticTag: 'index'
    }
}

export default function fullPage (html, initialState, url){
    let data = {};
    Object.keys(pageConfig).forEach((item) => {
        if (url.indexOf(item) > -1) {
            data = pageConfig[item];
        }
    })

    return defaultPage(html, initialState, data);
}
