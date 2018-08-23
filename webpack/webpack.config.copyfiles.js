var copyFiles = [
    // 第三方
    { from: './lib/3rdlib/media.match.min.js', to: './3rdlib/media.match.min.js' },
    { from: './node_modules/lodash/lodash.min.js', to: './3rdlib/lodash/lodash.min.js' },
    { from: './node_modules/masonry-layout/dist/masonry.pkgd.min.js', to: './3rdlib/masonry-layout/masonry.pkgd.min.js' },
    // 外部引入依赖，有些需要调整，或者支持按需加载（antd）
    { from: './node_modules/intl/dist/Intl.min.js', to: './3rdlib/intl/Intl.min.js'},
    { from: './node_modules/react-intl/dist/react-intl.min.js', to: './3rdlib/react-intl/react-intl.min.js' },
    //react依赖包
    { from: './node_modules/prop-types/prop-types.min.js', to: './3rdlib/prop-types/prop-types.min.js' },
    //antd依赖包
    { from: './node_modules/moment/min/moment.min.js', to: './3rdlib/moment/moment.min.js' },
    //开发调试时启用
    // { from: './node_modules/react/umd/react.development.js', to: './3rdlib/react/react.min.js' },
    // { from: './node_modules/react-dom/umd/react-dom.development.js', to: './3rdlib/react-dom/react-dom.min.js' },
    //生产环境使用
    { from: './node_modules/react/umd/react.production.min.js', to: './3rdlib/react/react.min.js' },
    { from: './node_modules/react-dom/umd/react-dom.production.min.js', to: './3rdlib/react-dom/react-dom.min.js' },
    //开发调试时启用
    // { from: './node_modules/react-router/umd/react-router.js', to: './3rdlib/react-router/react-router.min.js' },
    // { from: './node_modules/react-router-dom/umd/react-router-dom.js', to: './3rdlib/react-router-dom/react-router-dom.min.js' },
    //生产环境使用
    { from: './node_modules/react-router/umd/react-router.min.js', to: './3rdlib/react-router/react-router.min.js' },
    { from: './node_modules/react-router-dom/umd/react-router-dom.min.js', to: './3rdlib/react-router-dom/react-router-dom.min.js' },
    
    { from: './node_modules/mobx/lib/mobx.umd.min.js', to: './3rdlib/mobx/mobx.min.js' },
    { from: './node_modules/mobx-react/index.min.js', to: './3rdlib/mobx-react/mobx-react.min.js' },
    // antd css 按需加载有问题，先引入
    { from: './node_modules/antd/dist/antd.min.css', to: './3rdlib/antd/antd.min.css' },
    { from: './node_modules/antd/dist/antd.min.js', to: './3rdlib/antd/antd.min.js' },
    { from: './node_modules/babel-polyfill/dist/polyfill.min.js', to: './3rdlib/babel-polyfill/polyfill.min.js' },
    //jquery
    { from: './node_modules/jquery/dist/jquery.min.js', to: './3rdlib/jquery/jquery.min.js' },
    { from: './node_modules/jquery-migrate/dist/jquery-migrate.min.js', to: './3rdlib/jquery-migrate/jquery-migrate.min.js' },
   
];

module.exports = copyFiles;