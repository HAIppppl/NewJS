let injectHtml = `
<style type="text/css">
  .link-bar {height: 40px;color: white; position: relative; z-index: 110000; display: flex;flex-direction: row;align-items: center;justify-content: space-between;background: rgba(244, 177, 70, 0.9)}
  @keyframes bar-move { from {width: 0;} to {width: 100%;} }
  @keyframes bar-hide { from {width: 100%;} to {width: 0;} }
  .link-bar-show { animation:bar-move 1s; animation-fill-mode: forwards; }
  .link-bar-hide { animation:bar-hide 1s; animation-fill-mode: forwards; }
  .flex-center {display:inline-flex;align-items:center;justify-content: center}
  .opt-img {min-width: 40px;height: 40px; background-color: rgb(252, 237, 226)}
  .opt-img > img {filter: invert(0.5)}
  .btn-cx {width: 10%;display: flex;flex-direction: row;align-items: center;margin-right: 1%;justify-content: space-between}
  .btn-copy {width: 70px;height: 24px;color: #f4b146;cursor: pointer;font-size: 12px;margin-left: 20px;border-radius: 12px;background: rgba(255,255,255,1)}
  .btn-shrink {width: 24px;height: 24px;font-size: 14px;cursor: pointer;border-radius: 50%;padding-bottom: 1px;color: rgb(244, 177, 70);background: rgba(255,255,255,1)}
</style>
  <div id="link-bar" class="link-bar">
    <div id="opt-img" class="flex-center opt-img">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAKtJREFUOE/t1DEOAUEUxvHfHkLvAFrR0qo07qAThdqqJQ6iFWqXcAuHkJEdJiuRNWs7r5z53v99773MFH4cxY95UuC4JfwS8iNwjkNL4BZlZw5bmnuld7qUWGaEBXboY93QftCf6w5LbCrAANcw6IbAhy4CezgiuIsRzm4NYU9ZCjxhmACy5ltP2mNVQeNdVstpZzMsMcG07VK+HdmbPmtOn6p29vT+n0P+su9QkBYV8iw/vwAAAABJRU5ErkJggg=="/>
    </div>
    <div id="link-bar-url"></div>
    <div id="btn-cx" class="btn-cx">
      <div id="btn-copy" class="flex-center btn-copy">复制链接</div>
      <div id="btn-shrink" class="flex-center btn-shrink">x</div>
    </div>
  </div>
<script>
  let proxyUrl = document.location.href;
  let originUrl = (proxyUrl.indexOf("/-----") > -1) ? (proxyUrl.split("/-----")[1]) : proxyUrl;

  console.log("Url:"+originUrl);

  if(originUrl.indexOf("youtube") > -1){
//    while(true){
//    console.log("AUrl:"+originUrl);
//    let request;
//    const performAnimation = () => {
//      request = requestAnimationFrame(performAnimation);
//    };
//    requestAnimationFrame(performAnimation);
//    window.cancelAnimationFrame(request);
//    };

 window.addEventListener("beforeunload", function (e) {
      console.log('test');
      var confirmationMessage = "OnBeforeEvent";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });

  };

  //	console.log("StartOnBeforeEvent Url:"+originUrl);
//	document.onbeforeunload = function () {
 // 		console.log("OnBeforeEvent Url:"+originUrl);
  //  		return false;
 // 	}
  //}
//	document.onkeydown = function ()
//	{
//    	if (event.keyCode == 116) {
//        	event.keyCode = 0;
//        	event.cancelBubble = true;
//        	return false;
//    	}
//	}
//
// }

  document.getElementById("link-bar-url").innerHTML = originUrl;
  document.getElementById("btn-copy").onclick = function () {
    let url = document.getElementById("link-bar-url").innerHTML;
    let inputElement = document.createElement("input");
    document.body.appendChild(inputElement);
    inputElement.value = url;
    inputElement.select()
    let success = document.execCommand("copy");
    success && alert("复制到粘贴板")
    document.body.removeChild(inputElement)
  };

  var linkBar = document.getElementById("link-bar");
  document.body.firstChild = linkBar;
  document.getElementById("btn-shrink").onclick = function (){
    document.getElementById("link-bar-url").innerHTML = '';
    linkBar.classList.add("link-bar-hide")
    linkBar.classList.remove("link-bar-show")
    document.getElementById("btn-cx").style.display = "none"
  }
  document.getElementById("opt-img").onclick = function () {
    if (linkBar.offsetWidth == 0) {
      document.getElementById("link-bar-url").innerHTML = originUrl;
      linkBar.classList.remove("link-bar-hide")
      linkBar.classList.add("link-bar-show")
      document.getElementById("btn-cx").style.display = "inline-flex"
    } else {
      document.getElementById("link-bar-url").innerHTML = '';
      linkBar.classList.add("link-bar-hide")
      linkBar.classList.remove("link-bar-show")
      document.getElementById("btn-cx").style.display = "none"
    }
  }
</script>
`

jsproxy_config({
  // 当前配置的版本（记录在日志中，用于排查问题）
  // 每次修改配置，该值需要增加，否则不会生效。
  // 默认每隔 5 分钟自动下载配置，若想立即验证，可通过隐私模式访问。
  ver: '110',
  //ver: '107',

  // 通过 CDN 加速常用网站的静态资源（实验中）
  static_boost: {
    enable: false,
    ver: 60
  },

  // 节点配置
  node_map: {
    'demo-hk': {
      label: '演示服务-香港节点',
      lines: {
        // 主机:权重
        'node-aliyun-hk-1.etherdream.com:8443': 1,
        'node-aliyun-hk-2.etherdream.com:8443': 2,
      }
    },
    'demo-sg': {
      label: '演示服务-新加坡节点',
      lines: {
        'node-aliyun-sg.etherdream.com:8443': 1,
      },
    },
    'mysite': {
      label: '当前站点',
      lines: {
        'node-aliyun-hk-2.etherdream.com:8443': 1,
      }
    },
    // 该节点用于加载大体积的静态资源
    'cfworker': {
      label: '',
      hidden: true,
      lines: {
        // 收费版（高权重）
        //'node-cfworker-2.etherdream.com': 4,

        // 免费版（低权重，分摊一些成本）
        // 每个账号每天 10 万次免费请求，但有频率限制
        //'b.007.workers.dev': 1,
        //'b.hehe.workers.dev': 1,
        //'b.lulu.workers.dev': 1,
        //'b.jsproxy.workers.dev': 1,
      }
    }
  },

  /**
   * 默认节点
   */
  node_default: 'mysite',
  //node_default: /jsproxy-demo\.\w+$/.test(location.host) ? 'demo-hk' : 'mysite',

  /**
   * 加速节点
   */
  node_acc: 'cfworker',

  /**
   * 静态资源 CDN 地址
   * 用于加速 `assets` 目录中的资源访问
   */
  // assets_cdn: 'https://cdn.jsdelivr.net/gh/zjcqoo/zjcqoo.github.io@master/assets/',

  // 本地测试时打开，否则访问的是线上的
  assets_cdn: 'assets/',

  // 首页路径
  index_path: 'index_v3.html',

  // 支持 CORS 的站点列表（实验中...）
  direct_host_list: 'cors_v1.txt',

  /**
   * 自定义注入页面的 HTML
   */
  inject_html: injectHtml,
  //inject_html: '<!-- custom html -->',

  /**
   * URL 自定义处理（设计中）
   */
  url_handler: {
    'https://www.baidu.com/img/baidu_resultlogo@2.png': {
      replace: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
    },
    'https://www.pornhub.com/': {
      redir: 'https://php.net/'
    },
    'http://haha.com/': {
      content: 'Hello World'
    },
  }
})
