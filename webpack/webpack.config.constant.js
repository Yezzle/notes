/**
 * npm run backend的相对路径，配置本地后端工程路径
 */
const BACKEND_DEBUG_PATH = 'D:projectName/myproject.core.impl/target/classes/web';

/**
 * npm run deploy的相对路径，CI脚本用，配CI路径
 */
const DEPLOY_PATH = '../../src/main/resources/web';
/**
 * npm run deploy生成的HTML文件里面，JS和CSS的相对根路径，填服务器部署的路径 
 */

const RESROUCE_BASE_URL = 'http://localhost:8088/';

const PROXY_SERVER = 'http://github.yezzle.io';

module.exports = { BACKEND_DEBUG_PATH, DEPLOY_PATH, RESROUCE_BASE_URL, PROXY_SERVER };
