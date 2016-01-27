"use strict";!function(){var e=function t(e){var o=this;e||(e={}),this.itemClass=e.itemClass||".hashy-item",this.itemAttr=e.itemAttr||"data-hash",this.triggerClass=e.triggerClass||".hashy-go",this.triggerAttr=e.triggerAttr||"href",this.averageSpeed=e.averageSpeed||100,this.offset=e.offset||0,t.checkElem=function(){var e=function(){var e;return(e=function(){o.scrollOffset=window.pageYOffset||window.scrollTop,null==o.scrollOffset&&(o.scrollOffset=0);var n=t.Elems;n.forEach(function(e){var n=e.offsetTop+t.GlobalOffset,l=e.offsetHeight||e.clientHeight,r=window.innerHeight||document.documentElement.clientHeight;o.scrollOffset+r>n&&o.scrollOffset>n&&o.scrollOffset<n+l&&e!==t.SelectedElem&&(t.selectedElem=e,t.setHash(t.selectedElem.getAttribute(o.itemAttr)))}),t.runtime=requestAnimationFrame(e)})()};e()},t.setHash=function(e){window.location.hash!==e&&(null==window.history?history.pushState({},window.location,e):window.location.hash=e)},t.bind=function(e){for(var n=0;n<e.length;n++){var l=e[n];if(o.triggerAttr)var r=o.triggerAttr;else var r=href;l.onclick=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,e.preventDefault(),t.go(e.target.getAttribute(r))}}},t.go=function(e){var n=document.querySelector("["+o.itemAttr+'="'+e+'"]');t.scrollTo(n,e),t.setHash(e)},t.checkOffset=function(e){if("string"==typeof e)var o=t.getHeight(e);else var o=e;return o=-1*o},t.getHeight=function(e){var t=document.querySelectorAll(e)[0],o=window.getComputedStyle(t).height;return o=o.replace("px"),o=parseInt(o)},t.scrollTo=function(e,n){if(cancelAnimationFrame(t.runtime),e.offsetTop<-1*t.GlobalOffset)var l=e.offsetTop+1;else var l=e.offsetTop+1+t.GlobalOffset;if(l>o.scrollOffset)var r=o.scrollOffset,i=l,s=i-r,c=function(){i>r?(r+=s/o.averageSpeed,document.body.scrollTop=r,document.documentElement.scrollTop=r):(document.documentElement.scrollTop=l,document.body.scrollTop=l,t.scrollOffset=l,clearInterval(a),t.checkElem(),t.setHash(n))},a=setInterval(c,1);else var r=o.scrollOffset,i=l,s=r-i,f=function(){r>i?(r-=s/o.averageSpeed,document.body.scrollTop=r,document.documentElement.scrollTop=r):(document.documentElement.scrollTop=l,document.body.scrollTop=l,t.scrollOffset=l,clearInterval(a),t.checkElem(),t.setHash(n))},a=setInterval(f,1)},t.init=function(){t.checkElem(),t.bind(t.TriggerElems)},t.runtime=function(){},t.Elems=[].slice.call(document.querySelectorAll(this.itemClass)),t.TriggerElems=document.querySelectorAll(this.triggerClass),t.ScrollOffset=0,t.SelectedElem=null,t.GlobalOffset=t.checkOffset(this.offset);var n;if(t.doneResize=function(){t.GlobalOffset=t.checkOffset(o.offset),o.scrollOffset=document.documentElement.scrollTop||document.body.scrollTop},window.onresize=function(){clearTimeout(n),n=setTimeout(t.doneResize,100)},window.location.hash.length&&"undefined"!=window.location.hash){var l=window.location.hash.replace("#",""),r=document.querySelector("["+this.itemAttr+'="'+l+'"]');document.documentElement.scrollTop=r.offsetTop+t.GlobalOffset,document.body.scrollTop=r.offsetTop+t.GlobalOffset,this.scrollOffset=document.documentElement.scrollTop||document.body.scrollTop}for(var i=0,s=["ms","moz","webkit","o"],c=0;c<s.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[s[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[c]+"CancelAnimationFrame"]|window[s[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var o=(new Date).getTime(),n=Math.max(0,16-(o-i)),l=window.setTimeout(function(){e(o+n)},n);return i=o+n,l}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)}),t.init()};window.hashy=e}();