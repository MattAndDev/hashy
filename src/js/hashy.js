
(function(){

  var hashy = function(options){

    // ===========================================================================
    // Managing the options
    // ===========================================================================

    if (! options) {
      options = {};
    };


    // TODO: addoption for data title _> push state
    this.itemClass = options.itemClass || '.hashy-item';
    this.itemAttr = options.itemAttr || 'data-hash'
    this.triggerClass = options.triggerClass || '.hashy-go'
    this.triggerAttr = options.triggerAttr || 'href'
    this.averageSpeed = options.averageSpeed || 100
    this.offset = options.offset || 0



    hashy.checkElem = () =>{


      var scrollPos = () => {
        var getPosition;

        getPosition = () => {

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
              if (elem !== hashy.SelectedElem ) {
                if (hashy.Elems.indexOf(hashy.SelectedElem) < hashy.Elems.indexOf(elem)) {
                  var down = true
                } else {
                  var down = false
                }
                hashy.SelectedElem = elem;
                hashy.setHash(hashy.SelectedElem.getAttribute(this.itemAttr), down);
              };
            }
          });

          hashy.runtime = requestAnimationFrame(getPosition);
        };


        return getPosition();

      };

      scrollPos();

    }



    hashy.setHash = (hash, down) => {
      if (hashy.history &&  hashy.Hash !== hash){
        console.log('called');
        // TODO: this should be treiggered only scrolling down!!
        hashy.Hash = hash;
        hashy.history.pushState({scrollTop: hashy.ScrollOffset}, null, hash);
      } else if( window.location.hash !== '#' + hash &&  hashy.Hash !== hash) {
        hashy.Hash = hash;
        // window.location.hash = hash;
      }
    }




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
            e.preventDefault();
            hashy.go(e.target.getAttribute(attr))
          };
      }
    }

    hashy.go = (hash) => {
      let elem = document.querySelector('[' + this.itemAttr + '="' + hash + '"]');
      hashy.scrollTo(elem, hash);
      hashy.setHash(hash);
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

    hashy.scrollTo = (elem, hash) => {
      cancelAnimationFrame(hashy.runtime);
      if (elem.offsetTop < (hashy.GlobalOffset * -1)) {
        var elemPos = elem.offsetTop + 1 ;
      } else {
        var elemPos = elem.offsetTop + 1 + hashy.GlobalOffset;
      }
      if (elemPos > hashy.ScrollOffset) {
        var i = hashy.ScrollOffset;
        var y = elemPos;
        var diff = y -i;
        var scrollPlus = () => {
          if(i < y){
            i = i + diff/this.averageSpeed;
            document.body.scrollTop = i;
            document.documentElement.scrollTop = i;
          } else{
            document.documentElement.scrollTop = elemPos;
            document.body.scrollTop = elemPos;
            hashy.scrollOffset = elemPos;
            clearInterval(interval);
            hashy.checkElem();
            hashy.setHash(hash);
          }
        }

        var interval = setInterval(scrollPlus, 1);

      } else {
        var i = hashy.ScrollOffset;
        var y = elemPos;
        var diff = i - y;
        var scrollMinus = () => {
        if(i > y){
          i = i - diff/this.averageSpeed;
          document.body.scrollTop = i;
          document.documentElement.scrollTop = i;
        } else{
          document.documentElement.scrollTop = elemPos;
          document.body.scrollTop = elemPos;
          hashy.scrollOffset = elemPos;
          clearInterval(interval);
          hashy.checkElem();
          hashy.setHash(hash);
          }
        }

        var interval = setInterval(scrollMinus, 1);
      };
    }


    hashy.init = () => {
      hashy.checkElem()
      hashy.bind(hashy.TriggerElems)
      if (window.history){
       hashy.history = window.history;
      }
    }


    // ===========================================================================
    // init global vars
    // ===========================================================================

    //  Raf runtime
    hashy.runtime = function(){};

    hashy.Hash = null;

    //  All hashy elems
    hashy.Elems = [].slice.call(document.querySelectorAll(this.itemClass));

    //  All hashy triggers
    hashy.TriggerElems = document.querySelectorAll(this.triggerClass);
    // Set inenr scrolling to 0
    hashy.ScrollOffset = 0;
    // no selectedElem
    hashy.SelectedElem = null;


    // checks if offset is class and set value
    hashy.GlobalOffset = hashy.checkOffset(this.offset);
    // Repeat the check after resize
    var resizeTimeout;
    hashy.doneResize = () => {
      hashy.GlobalOffset = hashy.checkOffset(this.offset);
      hashy.ScrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    }
    window.onresize = function(){
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(hashy.doneResize, 100);
    };


    // ===========================================================================
    // Finish init global vars
    // ===========================================================================

    // ===========================================================================
    // On pageload:
    // Look for valid location hash and scroll to position via scrollIntoView
    // ===========================================================================

    if(window.location.hash.length && window.location.hash != 'undefined'){
      let cleanHash = window.location.hash.replace('#', '');
      let elem = document.querySelector('[' + this.itemAttr + '="' + cleanHash + '"]');
      document.documentElement.scrollTop = elem.offsetTop + hashy.GlobalOffset;
      document.body.scrollTop = elem.offsetTop + hashy.GlobalOffset;
      hashy.ScrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    }

  // ===========================================================================


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
    // Starting the magic
    hashy.init()

    // Closing hashy
  };

  window.hashy = hashy;
}())
