/*!
 * bilibili-live-hime v1.0.2
 * Github: https://github.com/zhw2590582/bilibili-live-hime
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

var BilibiliLiveHimePopup=function(){"use strict";var t=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t){var e=function(t){var e,n=Object.prototype,r=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n,r){var i=e&&e.prototype instanceof v?e:v,a=Object.create(i.prototype),o=new P(r||[]);return a._invoke=function(t,e,n){var r=h;return function(i,a){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw a;return T()}for(n.method=i,n.arg=a;;){var o=n.delegate;if(o){var s=L(o,n);if(s){if(s===d)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=u(t,e,n);if("normal"===c.type){if(r=n.done?p:l,c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}(t,n,o),a}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var h="suspendedStart",l="suspendedYield",f="executing",p="completed",d={};function v(){}function m(){}function y(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,g=b&&b(b(j([])));g&&g!==n&&r.call(g,a)&&(w=g);var x=y.prototype=v.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function $(t){var e;this._invoke=function(n,i){function a(){return new Promise((function(e,a){!function e(n,i,a,o){var s=u(t[n],t,i);if("throw"!==s.type){var c=s.arg,h=c.value;return h&&"object"==typeof h&&r.call(h,"__await")?Promise.resolve(h.__await).then((function(t){e("next",t,a,o)}),(function(t){e("throw",t,a,o)})):Promise.resolve(h).then((function(t){c.value=t,a(c)}),(function(t){return e("throw",t,a,o)}))}o(s.arg)}(n,i,e,a)}))}return e=e?e.then(a,a):a()}}function L(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,L(t,n),"throw"===n.method))return d;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var i=u(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,d;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,d):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,d)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function j(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){for(;++i<t.length;)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:T}}function T(){return{value:e,done:!0}}return m.prototype=x.constructor=y,y.constructor=m,y[s]=m.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},k($.prototype),$.prototype[o]=function(){return this},t.AsyncIterator=$,t.async=function(e,n,r,i){var a=new $(c(e,n,r,i));return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},k(x),x[s]="Generator",x[a]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=j,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),S(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;S(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:j(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var r=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t};var i=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t};var a=function t(e){switch(typeof e){case"undefined":return"undefined";case"object":let n=Object.prototype.toString.call(e).slice(8,-1).toLowerCase();switch(n){case"null":return"null";case"array":return"["+e.map(e=>t(e)).join(", ")+"]";case"object":return"{ "+Object.keys(e).map(n=>n+": "+t(e[n])).join(", ")+" }";default:try{return e.toString()}catch(t){return"[Unknown type: "+n+"]"}}default:return e.toString()}},o="recording",s="debug",c=/^rtmp:\/\/.+/i,u=/^https?:\/\/.+/i,h=/^https?:\/\/live\.bilibili\.com/i;function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise((function(e){return setTimeout(e,t)}))}function f(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelector(t)}function p(t,e){return new Promise((function(n){chrome.storage.local.set(i({},t,e),(function(){n(e)}))}))}function d(t,e){return new Promise((function(n){chrome.storage.local.get([t],(function(r){!function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(r,t)?e?p(t,e).then((function(t){n(t)})):n():n(r[t])}))}))}function v(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return new Promise((function(n){chrome.tabs.create({url:t,active:e},(function(t){n(t)}))}))}function m(){return new Promise((function(t){chrome.tabCapture.getCapturedTabs((function(e){t(e[0])}))}))}var y=function(e){var n;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(d(s));case 2:if(r.t0=r.sent,r.t0){r.next=5;break}r.t0=[];case 5:return(n=r.t0).push({type:"log",data:a(e)}),r.next=9,t.awrap(p(s,n));case 9:case"end":return r.stop()}}))},w=function(e){var n;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(d(s));case 2:if(r.t0=r.sent,r.t0){r.next=5;break}r.t0=[];case 5:return(n=r.t0).push({type:"error",data:a(e)}),r.next=9,t.awrap(p(s,n));case 9:case"end":return r.stop()}}))},b=function(){return t.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.awrap(p(s,[]));case 2:case"end":return e.stop()}}))};function g(t){chrome.runtime.sendMessage(t)}function x(t,e){return new Promise((function(n){chrome.tabs.executeScript(t,{file:e,runAt:"document_start"},(function(){n()}))}))}function k(t){return new Promise((function(e){chrome.tabs.executeScript({code:t},(function(){e()}))}))}function $(t,e){return new Promise((function(n){chrome.tabs.insertCSS(t,{file:e},(function(){n()}))}))}function L(t){return new Promise((function(e){chrome.tabs.insertCSS({code:t},(function(){e()}))}))}return new(function(){function n(){var t,r=this;e(this,n),this.manifest=chrome.runtime.getManifest(),this.$container=f(".container"),this.$name=f(".name"),this.$feedback=f(".feedback"),this.$liveSetting=f(".liveSetting"),this.$socketSetting=f(".socketSetting"),this.$name.textContent="".concat(this.manifest.name," ").concat(this.manifest.version),this.$rtmp=f(".rtmp"),this.$streamname=f(".streamname"),this.$socket=f(".socket"),this.$live=f(".live"),this.$resolution=f(".resolution"),this.$videoBitsPerSecond=f(".videoBitsPerSecond"),this.$debug=f(".debug"),this.$start=f(".start"),this.$stop=f(".stop"),this.init(),this.bindEvent(),this.updateDebug(),this.updateRecording(),t=function(t){t[s]&&r.updateDebug(),t[o]&&r.updateRecording()},chrome.storage.onChanged.addListener(t)}return r(n,[{key:"bindEvent",value:function(){var e=this;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:this.$name.addEventListener("click",(function(){v("https://chrome.google.com/webstore/detail/".concat(chrome.runtime.id))})),this.$feedback.addEventListener("click",(function(){v("https://github.com/zhw2590582/bilibili-live-hime")})),this.$liveSetting.addEventListener("click",(function(){v("https://link.bilibili.com/p/center/index#/my-room/start-live")})),this.$socketSetting.addEventListener("click",(function(){v("https://github.com/zhw2590582/bilibili-live-hime#%E6%9C%8D%E5%8A%A1%E7%AB%AF")})),this.$rtmp.addEventListener("input",(function(){e.saveInput("rtmp")})),this.$streamname.addEventListener("input",(function(){e.saveInput("streamname")})),this.$socket.addEventListener("input",(function(){e.saveInput("socket")})),this.$live.addEventListener("input",(function(){e.saveInput("live")})),this.$resolution.addEventListener("change",(function(){e.saveInput("resolution")})),this.$videoBitsPerSecond.addEventListener("change",(function(){e.saveInput("videoBitsPerSecond")})),this.$start.addEventListener("click",(function(){e.start()})),this.$stop.addEventListener("click",(function(){e.stop()})),this.$container.addEventListener("dragover",(function(t){t.preventDefault()})),this.$container.addEventListener("drop",(function(n){return t.async((function(t){for(;;)switch(t.prev=t.next){case 0:e.inject(n);case 1:case"end":return t.stop()}}))}));case 14:case"end":return n.stop()}}),null,this)}},{key:"inject",value:function(e){var n;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e.preventDefault(),n=Array.from(e.dataTransfer.files),r.next=4,t.awrap(y("注入文件："+n.map((function(t){return t.name})).join(",")));case 4:n.forEach((function(t){var e=new FileReader;e.addEventListener("load",(function(){var n=e.result;switch(t.type){case"text/javascript":k(n);break;case"text/css":L(n)}})),e.readAsText(t)}));case 5:case"end":return r.stop()}}))}},{key:"saveInput",value:function(e){var n;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(d("config"));case 2:if(r.t0=r.sent,r.t0){r.next=5;break}r.t0={};case 5:return(n=r.t0)[e]=this["$".concat(e)].value.trim(),r.next=9,t.awrap(p("config",n));case 9:case"end":return r.stop()}}),null,this)}},{key:"init",value:function(){var e,n,r,i;return t.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.awrap(d(o));case 2:return e=a.sent,a.next=5,t.awrap(d("config"));case 5:if(a.t0=a.sent,a.t0){a.next=8;break}a.t0={};case 8:return n=a.t0,a.next=11,t.awrap(d("danmu_option"));case 11:return r=a.sent,a.next=14,t.awrap(m());case 14:if(i=a.sent,n&&(this.$rtmp.value=n.rtmp||"",this.$live.value=n.live||"",this.$streamname.value=n.streamname||"",this.$socket.value=n.socket||"http://localhost:8080",this.$resolution.value=n.resolution||720,this.$videoBitsPerSecond.value=n.videoBitsPerSecond||25e5),!e||!i){a.next=27;break}if(!r||!n.activeTab){a.next=25;break}return a.next=20,t.awrap(x(n.activeTab,"active/index.js"));case 20:return a.next=22,t.awrap($(n.activeTab,"active/index.css"));case 22:return a.next=24,t.awrap(l(100));case 24:s=n.activeTab,c=r,chrome.tabs.sendMessage(s,c);case 25:a.next=31;break;case 27:b(),p(o,!1),p("danmu_option",!1),g({type:"stop"});case 31:case"end":return a.stop()}var s,c}),null,this)}},{key:"updateDebug",value:function(){var e;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.awrap(d(s));case 2:if(n.t0=n.sent,n.t0){n.next=5;break}n.t0=[];case 5:e=n.t0,this.$debug.innerHTML=e.map((function(t){return'<p class="'.concat(t.type,'">').concat(t.data,"</p>")})).join(""),this.$debug.scrollTo(0,this.$debug.scrollHeight);case 8:case"end":return n.stop()}}),null,this)}},{key:"updateRecording",value:function(){var e,n;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(d(o));case 2:return e=r.sent,r.next=5,t.awrap(m());case 5:n=r.sent,e&&n?(this.$container.classList.add(o),this.$rtmp.disabled=!0,this.$streamname.disabled=!0,this.$socket.disabled=!0,this.$live.disabled=!0,this.$resolution.disabled=!0,this.$videoBitsPerSecond.disabled=!0):(this.$container.classList.remove(o),this.$rtmp.disabled=!1,this.$streamname.disabled=!1,this.$socket.disabled=!1,this.$live.disabled=!1,this.$resolution.disabled=!1,this.$videoBitsPerSecond.disabled=!1);case 7:case"end":return r.stop()}}),null,this)}},{key:"start",value:function(){var e,n,r;return t.async((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,t.awrap(new Promise((function(t){chrome.tabs.query({active:!0,currentWindow:!0},(function(e){t(e[0])}))})));case 2:if(e=i.sent){i.next=7;break}return i.next=6,t.awrap(w("未获取到当前激活的标签"));case 6:return i.abrupt("return");case 7:if((n={activeTab:e.id,rtmp:this.$rtmp.value.trim(),streamname:this.$streamname.value.trim(),socket:this.$socket.value.trim(),live:this.$live.value.trim(),resolution:Number(this.$resolution.value),videoBitsPerSecond:Number(this.$videoBitsPerSecond.value)}).rtmp&&c.test(n.rtmp)){i.next=12;break}return i.next=11,t.awrap(w("请输入正确的rtmp推流地址"));case 11:return i.abrupt("return");case 12:if(n.streamname){i.next=16;break}return i.next=15,t.awrap(w("请输入正确的直播码"));case 15:return i.abrupt("return");case 16:if(n.socket&&u.test(n.socket)){i.next=20;break}return i.next=19,t.awrap(w("请输入正确的中转地址"));case 19:return i.abrupt("return");case 20:if(!h.test(n.live)){i.next=37;break}return i.next=23,t.awrap(x(n.activeTab,"active/index.js"));case 23:return i.next=25,t.awrap($(n.activeTab,"active/index.css"));case 25:return i.next=27,t.awrap(l(100));case 27:return i.next=29,t.awrap(v(n.live,!1));case 29:return r=i.sent,n.liveTab=r.id,i.next=33,t.awrap(y("打开直播间页面成功"));case 33:return i.next=35,t.awrap(x(n.liveTab,"danmu/index.js"));case 35:i.next=39;break;case 37:return i.next=39,t.awrap(w("不是有效的 Bilibili 直播间地址"));case 39:return i.next=41,t.awrap(y("".concat("当前页面","：").concat(e.title)));case 41:return i.next=43,t.awrap(p(o,!0));case 43:return i.next=45,t.awrap(p("config",n));case 45:g({type:"start",data:n});case 46:case"end":return i.stop()}}),null,this)}},{key:"stop",value:function(){return t.async((function(e){for(;;)switch(e.prev=e.next){case 0:return g({type:"stop"}),p(o,!1),p("danmu_option",!1),e.next=5,t.awrap(y("已停止推流..."));case 5:case"end":return e.stop()}}))}}]),n}())}();
