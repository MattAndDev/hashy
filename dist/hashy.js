!function(e){function t(i){if(o[i])return o[i].exports;var s=o[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),s=function(){function e(t){var i=this;o(this,e),this.scrollListener=function(){i.ScrollOffset=window.pageYOffset||window.scrollTop,null==i.ScrollOffset&&(i.ScrollOffset=0);var e=i.Elems;e.forEach(function(e){var t=e.offsetTop+i.GlobalOffset,o=e.offsetHeight||e.clientHeight,s=window.innerHeight||document.documentElement.clientHeight;i.ScrollOffset+s>t&&i.ScrollOffset>t&&i.ScrollOffset<t+o&&e!==i.SelectedElem&&(i.SelectedElem=e,i.setHash(i.SelectedElem.getAttribute(i.itemAttr),!0))}),i.runtime=requestAnimationFrame(i.scrollListener)},t||(t={}),this.itemClass=t.itemClass||".hashy-item",this.itemAttr=t.itemAttr||"data-hash",this.triggerClass=t.triggerClass||".hashy-go",this.triggerAttr=t.triggerAttr||"href",this.averageSpeed=t.averageSpeed||50,this.offset=t.offset||0,this.runtime=function(){},this.Hash=null,this.Elems=[].slice.call(document.querySelectorAll(this.itemClass)),this.TriggerElems=document.querySelectorAll(this.triggerClass),this.ScrollOffset=0,this.SelectedElem=null,this.IsScrolling=null,this.GlobalOffset=this.checkOffset(this.offset);var s;this.doneResize=function(){i.GlobalOffset=i.checkOffset(i.offset),i.ScrollOffset=document.documentElement.scrollTop||document.body.scrollTop},window.onresize=function(){clearTimeout(s),s=setTimeout(i.doneResize,100)},window.onpopstate=function(e){if(cancelAnimationFrame(i.runtime),e.preventDefault(),null!=e.state)i.go(e.state.hash,!1);else{var t=window.location.hash.replace("#","");i.go(t,!1)}return!1},window.onhashchange=function(e){e.preventDefault()},this.init()}return i(e,[{key:"init",value:function(){if(this.bind(this.TriggerElems),this.history||(this.history=window.history),window.location.hash.length&&"undefined"!==window.location.hash){var e=window.location.hash.replace("#","");window.history&&(this.history=window.history),this.go(e,!1)}else this.scrollListener()}},{key:"bind",value:function(e){for(var t=this,o=0;o<e.length;o++){var i,s=e[o];i=this.triggerAttr?this.triggerAttr:href,s.onclick=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,cancelAnimationFrame(t.runtime),t.go(e.target.getAttribute(i),!0)}}}},{key:"go",value:function(e,t){var o=this,i=document.querySelector("["+this.itemAttr+'="'+e+'"]');this.scrollTo(i,e,function(){o.setHash(e,t,function(){setTimeout(function(){o.scrollListener()},200)})})}},{key:"setHash",value:function(e,t,o){this.history&&t&&this.Hash!==e||this.history&&null==this.Hash?(console.log("pushing to history"),this.history.pushState({hash:e},null,"#"+e),this.Hash=e,o&&o()):window.location.hash==="#"+e||this.Hash===e||this.history?o&&o():(this.Hash=e,window.location.hash=e,o&&o())}},{key:"checkOffset",value:function(e){var t;return t="string"==typeof e?this.getHeight(e):e,t*=-1}},{key:"getHeight",value:function(e){var t=document.querySelectorAll(e)[0],o=window.getComputedStyle(t).height;return o=o.replace("px"),o=parseInt(o)}},{key:"scrollTo",value:function(e,t,o){var i=this;cancelAnimationFrame(this.runtime),this.IsScrolling=!0;var s;s=e.offsetTop<this.GlobalOffset*-1?e.offsetTop+1:e.offsetTop+1+this.GlobalOffset;var n,r=this.ScrollOffset,l=s;n=s>this.ScrollOffset?l-r:r-l,this.scroller=function(){if(r<l-n/i.averageSpeed)r=Math.round(r+n/i.averageSpeed),document.body.scrollTop=r,document.documentElement.scrollTop=r,i.ScrollOffset=r;else{if(!(r>l+n/i.averageSpeed))return document.documentElement.scrollTop=s,document.body.scrollTop=s,i.ScrollOffset=s,i.SelectedElem=e,i.IsScrolling=!1,o(),cancelAnimationFrame(i.runtime),!1;r=Math.round(r-n/i.averageSpeed),document.body.scrollTop=r,document.documentElement.scrollTop=r,i.ScrollOffset=r}i.runtime=requestAnimationFrame(i.scroller)},this.scroller()}}]),e}();t.default=s}]);