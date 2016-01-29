"use strict";!function(){var e=function t(e){var o=this;e||(e={}),this.itemClass=e.itemClass||".hashy-item",this.itemAttr=e.itemAttr||"data-hash",this.triggerClass=e.triggerClass||".hashy-go",this.triggerAttr=e.triggerAttr||"href",this.averageSpeed=e.averageSpeed||100,this.offset=e.offset||0,t.getPosition=function(){t.ScrollOffset=window.pageYOffset||window.scrollTop,null==t.ScrollOffset&&(t.ScrollOffset=0);var e=t.Elems;e.forEach(function(e){var n=e.offsetTop+t.GlobalOffset,i=e.offsetHeight||e.clientHeight,l=window.innerHeight||document.documentElement.clientHeight;t.ScrollOffset+l>n&&t.ScrollOffset>n&&t.ScrollOffset<n+i&&e!==t.SelectedElem&&(t.SelectedElem=e,t.setHash(t.SelectedElem.getAttribute(o.itemAttr),!0))}),t.runtime=requestAnimationFrame(t.getPosition)},t.bind=function(e){for(var n=0;n<e.length;n++){var i=e[n];if(o.triggerAttr)var l=o.triggerAttr;else var l=href;i.onclick=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,t.go(e.target.getAttribute(l),!0)}}},t.go=function(e,n){var i=document.querySelector("["+o.itemAttr+'="'+e+'"]');t.scrollTo(i,e,function(){t.setHash(e,n,function(){t.getPosition()})})},t.setHash=function(e,o,n){t.history&&o===!0&&t.Hash!=e||t.history&&o===!0&&null==t.Hash?(console.log("pushing to history"),t.history.pushState({hash:e},null,"#"+e),t.Hash=e,n&&n()):window.location.hash==="#"+e||t.Hash===e||t.history?n&&n():(t.Hash=e,window.location.hash=e,n&&n())},t.checkOffset=function(e){if("string"==typeof e)var o=t.getHeight(e);else var o=e;return o=-1*o},t.getHeight=function(e){var t=document.querySelectorAll(e)[0],o=window.getComputedStyle(t).height;return o=o.replace("px"),o=parseInt(o)},t.scrollTo=function(e,n,i){if(cancelAnimationFrame(t.runtime),t.IsScrolling=!0,e&&e.offsetTop<-1*t.GlobalOffset)var l=e.offsetTop+1;else if(e)var l=e.offsetTop+1+t.GlobalOffset;else var l=0;if(l>t.ScrollOffset)var r=t.ScrollOffset,s=l,a=s-r,c=function(){s>r?(r+=a/o.averageSpeed,document.body.scrollTop=r,document.documentElement.scrollTop=r):(document.documentElement.scrollTop=l,document.body.scrollTop=l,t.ScrollOffset=l,t.SelectedElem=e,clearInterval(f),t.IsScrolling=!1,i())},f=setInterval(c,1);else var r=t.ScrollOffset,s=l,a=r-s,u=function(){r>s?(r-=a/o.averageSpeed,document.body.scrollTop=r,document.documentElement.scrollTop=r):(document.documentElement.scrollTop=l,document.body.scrollTop=l,t.ScrollOffset=l,t.SelectedElem=e,clearInterval(f),t.IsScrolling=!1,i())},f=setInterval(u,1)},t.init=function(){if(t.bind(t.TriggerElems),!t.history&&window.history&&(t.history=window.history),window.location.hash.length&&"undefined"!=window.location.hash){var e=window.location.hash.replace("#","");t.go(e,!1)}else t.getPosition()},t.runtime=function(){},t.Hash=null,t.Elems=[].slice.call(document.querySelectorAll(this.itemClass)),t.TriggerElems=document.querySelectorAll(this.triggerClass),t.ScrollOffset=0,t.SelectedElem=null,t.IsScrolling=null,t.GlobalOffset=t.checkOffset(this.offset);var n;t.doneResize=function(){t.GlobalOffset=t.checkOffset(o.offset),t.ScrollOffset=document.documentElement.scrollTop||document.body.scrollTop},window.onresize=function(){clearTimeout(n),n=setTimeout(t.doneResize,100)},window.onpopstate=function(e){if(e.preventDefault(),null!=e.state)t.go(e.state.hash,!1);else{var o=window.location.hash.replace("#","");t.go(o,!1)}return!1},window.onhashchange=function(e){e.preventDefault()};for(var i=0,l=["ms","moz","webkit","o"],r=0;r<l.length&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[l[r]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[l[r]+"CancelAnimationFrame"]|window[l[r]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var o=(new Date).getTime(),n=Math.max(0,16-(o-i)),l=window.setTimeout(function(){e(o+n)},n);return i=o+n,l}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)}),t.init()};window.hashy=e}();