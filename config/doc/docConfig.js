module.exports = {
    //扫描的文件路径
    paths: ['./'],
    demoDir:"examples/src/modules/",
    //文档页面输出路径
    outdir: 'document/',
    //内置主题
    // theme:'ui',
    //自定义主题目录
    //themedir: 'theme-smart-ui/',
    //项目信息配置
    project: {

        //项目名称
        name: '爱屋吉屋SOA API文档',

        //项目描述，可以配置html，会生成到document主页
        description:
        '<h3>欢迎使用koa-rudy，左侧的导航栏为相api的名称和链接</h3>' +
            '<p>&nbsp;</p>'+
        '<p>&nbsp;</p>'+
        '<h4>您可以通过如下方式查看组件的API</h4>'+

        '<ol>' +
        '<li><h4>在输入框中输入api名字进行查询</h4></li>' +
        '<li><h4>点击左侧API导航栏</h4></li>' +
        '</ol>'+
            '<strong>说明:</strong>左侧导航栏中对应的链接名字即为组件名字'+
        '<p>&nbsp;</p>'
        ,

        //版本信息
        version: '0.1.0',

        //地址信息
        url: '',
        // logo:'https://resource.iwjw.com/iwjw-pc/img/common/logo.png',

        //导航信息
        navs: [
            {
                name: "爱屋api列表",
                url: ""
            },
            {
                name: "爱屋PC主页",
                url: "http://iwjw.com"
            }
        ]
    },
    //demo页面需要加载的js库
    demo: {

        ////外部资源链接
        // link : ['http://uedfamily.com/documents/eagle-ui/examples/js/eagle-ui.css'],

        //文件复制路径; 将目下的资源复制到doc生成目录中，并在demo页面引用
        //paths : ['doc/modules/'],

        //是否开启在code编辑器中的自动完成功能(会将link和paths的引入加入)；默认开启；
        autoComplete : true
    },
    ////自定义主题路径
    //themedir: 'docTheme/',
    //////自定义helpers
    //helpers: [""]
};


