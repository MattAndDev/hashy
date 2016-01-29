
(function(){

  var hashy = function(options){

    // ===========================================================================
    // Managing the options
    // ===========================================================================

    if (! options) {
      options = {};
    };


    this.itemClass = options.itemClass || '.hashy-item';
    this.itemAttr = options.itemAttr || 'data-hash'
    this.triggerClass = options.triggerClass || '.hashy-go'
    this.triggerAttr = options.triggerAttr || 'href'
    this.averageSpeed = options.averageSpeed || 100
    this.offset = options.offset || 0

    // TODO: addoption for data title _> push state




    hashy.getPosition = () => {
      hashy.ScrollOffset = window.pageYOffset || window.scrollTop;
      if (hashy.ScrollOffset == null) {
        hashy.ScrollOffset = 0;
      };

      var elemArray = hashy.Elems;

      elemArray.forEach( (elem) => {
        var elemOffset = elem.offsetTop + hashy.GlobalOffset;
        var elemHeight = elem.offsetHeight || elem.clientHeight;
        var height = window.innerHeight || document.documentElement.clientHeight;
        if (hashy.ScrollOffset + height > elemOffset && hashy.ScrollOffset > elemOffset && hashy.ScrollOffset < elemOffset + elemHeight ) {
          console.log('yeag');
          if (elem !== hashy.SelectedElem ) {
            hashy.SelectedElem = elem;
            hashy.setHash(hashy.SelectedElem.getAttribute(this.itemAttr),true);
          };
        }
      });

      hashy.runtime = requestAnimationFrame(hashy.getPosition);
    };

    hashy.bind = (elems) => {
      for(var i =0; i < elems.length; i++){
          var elem = elems[i];
          if (this.triggerAttr) {
            var attr = this.triggerAttr;
          } else {
            var attr = href;
          }
          elem.onclick = function(e){
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            hashy.go(e.target.getAttribute(attr),true)
          };
      }
      return false;
    }

    hashy.go = (hash, history) => {
      let elem = document.querySelector('[' + this.itemAttr + '="' + hash + '"]');
      hashy.scrollTo(elem, hash, () => {
        console.log('done scrolling');
        hashy.setHash(hash,history, () => {
          hashy.runtime = requestAnimationFrame(hashy.getPosition);
        });
      });
      return false;
    }


    hashy.setHash = (hash, history, callback) => {
      console.log(history);
      if (hashy.history &&  history === true && hashy.Hash != hash || hashy.history &&  history === true && hashy.Hash == null ){
        console.log('pushing to history');
        hashy.history.pushState({ hash: hash}, null, '#' + hash);
        hashy.Hash = hash;
        if (callback) callback();
      } else if( window.location.hash !== '#' + hash &&  hashy.Hash !== hash && !hashy.history) {
        hashy.Hash = hash;
        window.location.hash = hash;
        if (callback) callback();
      } else  {
        if (callback) callback();
      }
      return false;
    }

    hashy.checkOffset = (offset) => {
      if (typeof offset == 'string') {
        var calcOffset = hashy.getHeight(offset);
      } else {
        var calcOffset = offset;
      }
      calcOffset = calcOffset * -1;
      return calcOffset;
    }

    hashy.getHeight = (className) => {
      var element = document.querySelectorAll(className)[0];
      var height = window.getComputedStyle(element).height;
      height = height.replace('px');
      height = parseInt(height);
      return height;
    }

    hashy.scrollTo = (elem, hash, callback) => {
      cancelAnimationFrame(hashy.runtime);
      hashy.IsScrolling = true;
      if (elem && elem.offsetTop < (hashy.GlobalOffset * -1)) {
        var elemPos = elem.offsetTop + 1 ;
      } else if (elem){
        var elemPos = elem.offsetTop + 1 + hashy.GlobalOffset;
      } else {
        var elemPos = 0;
      }
      var i = hashy.ScrollOffset;
      var y = elemPos;
      if (y > i) {
        var diff = y -i;
        var scrollPlus = () => {
          if(i < y){
            i = i + diff/this.averageSpeed;
            document.body.scrollTop = i;
            document.documentElement.scrollTop = i;
          } else{
            document.documentElement.scrollTop = elemPos;
            document.body.scrollTop = elemPos;
            hashy.ScrollOffset = elemPos;
            hashy.SelectedElem = elem;
            clearInterval(interval);
            hashy.IsScrolling = false;
            callback();
          }
        }

        var interval = setInterval(scrollPlus, 1);

      } else {
        var diff = i - y;
        var scrollMinus = () => {
        if(i > y){
          i = i - diff/this.averageSpeed;
          document.body.scrollTop = i;
          document.documentElement.scrollTop = i;
        } else{
          document.documentElement.scrollTop = elemPos;
          document.body.scrollTop = elemPos;
          hashy.ScrollOffset = elemPos;
          hashy.SelectedElem = elem;
          clearInterval(interval);
          hashy.IsScrolling = false;
          callback();
          }
        }
        var interval = setInterval(scrollMinus, 1);
      };
      return false;
    }


    hashy.init = () => {
      hashy.bind(hashy.TriggerElems);
      if (!hashy.history && window.history){
       hashy.history = window.history;
      }
      if(window.location.hash.length && window.location.hash != 'undefined'){
        let cleanHash = window.location.hash.replace('#', '');
        hashy.go(cleanHash,false);
      }else {
        hashy.runtime = requestAnimationFrame(hashy.getPosition);
      }
    }


    // ===========================================================================
    // init global vars
    // ===========================================================================

    //  Raf runtime
    hashy.runtime;
    hashy.Hash = null;
    hashy.Elems = [].slice.call(document.querySelectorAll(this.itemClass));
    hashy.TriggerElems = document.querySelectorAll(this.triggerClass);
    hashy.ScrollOffset = 0;
    hashy.SelectedElem = null;
    hashy.IsScrolling = null;
    hashy.GlobalOffset = hashy.checkOffset(this.offset);





    // Repeat the check after resize
    var resizeTimeout;
    hashy.doneResize = () => {
      hashy.GlobalOffset = hashy.checkOffset(this.offset);
      hashy.ScrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    }

    // TODO: refactor this to be event listener?
    window.onresize = function(){
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(hashy.doneResize, 100);
    };


    window.onpopstate = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (event.state != null) {
        hashy.go(event.state.hash,false);
      }else {
        let cleanHash = window.location.hash.replace('#', '');
        hashy.go(cleanHash,false);
      }
      return false;
    }


    window.onhashchange = (e) => {
      e.stopPropagation();
      e.preventDefault();
    }


    hashy.init()



    // raf polifill
    // from https://gist.github.com/paulirish/1579671

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] | window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
    };

    // Closing hashy
  };

  window.hashy = hashy;
}())
