/*!
 * bilibili-live-hime v1.0.0
 * Github: undefined
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

var bilibiliLiveHimePopup=function(){"use strict";var t=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t){var e=function(t){var e,r=Object.prototype,n=r.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,o=Object.create(a.prototype),i=new j(n||[]);return o._invoke=function(t,e,r){var n=h;return function(a,o){if(n===l)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw o;return O()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=$(i,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=l;var s=u(t,e,r);if("normal"===s.type){if(n=r.done?p:f,s.arg===d)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}(t,r,i),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var h="suspendedStart",f="suspendedYield",l="executing",p="completed",d={};function v(){}function m(){}function y(){}var g={};g[o]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(S([])));b&&b!==r&&n.call(b,o)&&(g=b);var x=y.prototype=v.prototype=Object.create(g);function k(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function L(t){var e;this._invoke=function(r,a){function o(){return new Promise((function(e,o){!function e(r,a,o,i){var c=u(t[r],t,a);if("throw"!==c.type){var s=c.arg,h=s.value;return h&&"object"==typeof h&&n.call(h,"__await")?Promise.resolve(h.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(h).then((function(t){s.value=t,o(s)}),(function(t){return e("throw",t,o,i)}))}i(c.arg)}(r,a,e,o)}))}return e=e?e.then(o,o):o()}}function $(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,$(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=u(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,d;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function S(t){if(t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){for(;++a<t.length;)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:O}}function O(){return{value:e,done:!0}}return m.prototype=x.constructor=y,y.constructor=m,y[c]=m.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},k(L.prototype),L.prototype[i]=function(){return this},t.AsyncIterator=L,t.async=function(e,r,n,a){var o=new L(s(e,r,n,a));return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},k(x),x[c]="Generator",x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;P(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var n=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t};var a=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t};var o=function t(e){switch(typeof e){case"undefined":return"undefined";case"object":let r=Object.prototype.toString.call(e).slice(8,-1).toLowerCase();switch(r){case"null":return"null";case"array":return"["+e.map(e=>t(e)).join(", ")+"]";case"object":return"{ "+Object.keys(e).map(r=>r+": "+t(e[r])).join(", ")+" }";default:try{return e.toString()}catch(t){return"[Unknown type: "+r+"]"}}default:return e.toString()}};function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise((function(e){return setTimeout(e,t)}))}function c(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelector(t)}function s(t,e){return new Promise((function(r){chrome.storage.local.set(a({},t,e),(function(){r(e)}))}))}function u(t,e){return new Promise((function(r){chrome.storage.local.get([t],(function(n){n[t]?r(n[t]):e?s(t,e).then((function(t){r(t)})):r()}))}))}function h(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return new Promise((function(r){chrome.tabs.query({},(function(n){var a=n.find((function(e){return e.url===t}));a?chrome.tabs.update(a.id,{active:e,url:t},(function(t){r(t)})):chrome.tabs.create({url:t,active:e},(function(t){r(t)}))}))}))}function f(t){return new Promise((function(e){chrome.tabs.get(t,(function(t){e(t)}))}))}var l=function(e){var r;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.awrap(u("debug"));case 2:if(n.t0=n.sent,n.t0){n.next=5;break}n.t0=[];case 5:return(r=n.t0).push({type:"log",data:o(e)}),n.next=9,t.awrap(s("debug",r));case 9:case"end":return n.stop()}}))},p=function(e){var r;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.awrap(u("debug"));case 2:if(n.t0=n.sent,n.t0){n.next=5;break}n.t0=[];case 5:return(r=n.t0).push({type:"error",data:o(e)}),n.next=9,t.awrap(s("debug",r));case 9:case"end":return n.stop()}}))},d=function(){return t.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.awrap(s("debug",[]));case 2:case"end":return e.stop()}}))};function v(t,e){chrome.runtime.sendMessage({type:t,data:e})}return new(function(){function r(){var t,n=this;e(this,r),this.manifest=chrome.runtime.getManifest(),this.$container=c(".container"),this.$name=c(".name"),this.$feedback=c(".feedback"),this.$name.textContent="".concat(this.manifest.name," ").concat(this.manifest.version),this.$rtmp=c(".rtmp"),this.$streamname=c(".streamname"),this.$socket=c(".socket"),this.$resolution=c(".resolution"),this.$videoBitsPerSecond=c(".videoBitsPerSecond"),this.$debug=c(".debug"),this.$start=c(".start"),this.$stop=c(".stop"),this.bindEvent(),this.updateConfig(),this.updateDebug(),this.updateRecording(),t=function(t){t.debug&&n.updateDebug(),t.recording&&n.updateRecording()},chrome.storage.onChanged.addListener(t)}return n(r,[{key:"bindEvent",value:function(){var e=this;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:this.$name.addEventListener("click",(function(){h("https://chrome.google.com/webstore/detail/".concat(chrome.runtime.id))})),this.$feedback.addEventListener("click",(function(){h("https://github.com/zhw2590582/bilibili-live-hime")})),this.$rtmp.addEventListener("input",(function(){e.saveInput("rtmp")})),this.$streamname.addEventListener("input",(function(){e.saveInput("streamname")})),this.$socket.addEventListener("input",(function(){e.saveInput("socket")})),this.$start.addEventListener("click",(function(){e.start()})),this.$stop.addEventListener("click",(function(){return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(e.stop());case 2:return r.next=4,t.awrap(e.close());case 4:case"end":return r.stop()}}))})),n=function(t){switch(t.type){case"close":e.close()}},chrome.runtime.onMessage.addListener(n);case 8:case"end":return r.stop()}var n}),null,this)}},{key:"saveInput",value:function(e){var r;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.awrap(u("config"));case 2:if(n.t0=n.sent,n.t0){n.next=5;break}n.t0={};case 5:return(r=n.t0)[e]=this["$".concat(e)].value.trim(),n.next=9,t.awrap(s("config",r));case 9:case"end":return n.stop()}}),null,this)}},{key:"updateConfig",value:function(){var e;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(u("config"));case 2:(e=r.sent)&&(this.$rtmp.value=e.rtmp||"rtmp://bvc.live-send.acg.tv/live-bvc/",this.$streamname.value=e.streamname||"",this.$socket.value=e.socket||"http://localhost:8080",this.$resolution.value=e.resolution||"1920",this.$videoBitsPerSecond.value=e.videoBitsPerSecond||"2500000");case 4:case"end":return r.stop()}}),null,this)}},{key:"updateDebug",value:function(){var e;return t.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.awrap(u("debug"));case 2:if(r.t0=r.sent,r.t0){r.next=5;break}r.t0=[];case 5:e=r.t0,this.$debug.innerHTML=e.map((function(t){return'<p class="'.concat(t.type,'">').concat(t.data,"</p>")})).join(""),this.$debug.scrollTo(0,this.$debug.scrollHeight);case 8:case"end":return r.stop()}}),null,this)}},{key:"updateRecording",value:function(){var e,r;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.awrap(u("recording"));case 2:return e=n.sent,n.next=5,t.awrap(u("config"));case 5:if(r=n.sent,!e||!r){n.next=25;break}return n.next=9,t.awrap(f(r.tab));case 9:if(!n.sent){n.next=19;break}this.$container.classList.add("recording"),this.$rtmp.disabled=!0,this.$streamname.disabled=!0,this.$socket.disabled=!0,this.$resolution.disabled=!0,this.$videoBitsPerSecond.disabled=!0,n.next=23;break;case 19:return n.next=21,t.awrap(this.stop());case 21:return n.next=23,t.awrap(this.close());case 23:n.next=27;break;case 25:return n.next=27,t.awrap(d());case 27:case"end":return n.stop()}}),null,this)}},{key:"start",value:function(){var e,r;return t.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.awrap(new Promise((function(t){chrome.tabs.query({active:!0,currentWindow:!0},(function(e){t(e[0])}))})));case 2:if(e=n.sent){n.next=7;break}return n.next=6,t.awrap(p("未获取到当前激活的标签"));case 6:return n.abrupt("return");case 7:if((r={tab:e.id,rtmp:this.$rtmp.value.trim(),streamname:this.$streamname.value.trim(),socket:this.$socket.value.trim(),resolution:Number(this.$resolution.value),videoBitsPerSecond:Number(this.$videoBitsPerSecond.value)}).rtmp&&/^rtmp:\/\/.+/i.test(r.rtmp)){n.next=12;break}return n.next=11,t.awrap(p("请输入正确的rtmp推流地址"));case 11:return n.abrupt("return");case 12:if(r.streamname){n.next=16;break}return n.next=15,t.awrap(p("请输入正确的直播码"));case 15:return n.abrupt("return");case 16:if(r.socket&&/^https?:\/\/.+/i.test(r.socket)){n.next=20;break}return n.next=19,t.awrap(p("请输入正确的中转地址"));case 19:return n.abrupt("return");case 20:return n.next=22,t.awrap(l("当前页面：".concat(e.title)));case 22:return n.next=24,t.awrap(s("recording",!0));case 24:return n.next=26,t.awrap(s("config",r));case 26:v("start",r);case 27:case"end":return n.stop()}}),null,this)}},{key:"stop",value:function(){return t.async((function(t){for(;;)switch(t.prev=t.next){case 0:v("stop");case 1:case"end":return t.stop()}}))}},{key:"close",value:function(){return t.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.awrap(l("正在关闭连接..."));case 2:return e.next=4,t.awrap(i(1e3));case 4:return e.next=6,t.awrap(s("recording",!1));case 6:return e.next=8,t.awrap(d());case 8:chrome.runtime.reload(),window.close();case 10:case"end":return e.stop()}}))}}]),r}())}();