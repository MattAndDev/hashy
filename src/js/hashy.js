
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



    hashy.checkElem = () =>{


      var scrollPos = () => {
        var getPosition, scrollOffset;
        scrollOffset = 0;

        getPosition = () => {

          this.scrollOffset = window.pageYOffset || window.scrollTop;
          if (this.scrollOffset == null) {
            this.scrollOffset = 0;
          };


          var elemArray = this.elems;


          elemArray.forEach( (elem) => {
            var elemOffset = elem.offsetTop + this.globalOffset;
            var elemHeight = elem.offsetHeight || elem.clientHeight;
            var height = window.innerHeight || document.documentElement.clientHeight;
            if (this.scrollOffset + height > elemOffset && this.scrollOffset > elemOffset && this.scrollOffset < elemOffset + elemHeight ) {
              if (elem !== selectedElem ) {
                selectedElem = elem;
                hashy.setHash(selectedElem.getAttribute(this.itemAttr));
              };
            }
          });

          hashy.runtime = requestAnimationFrame(getPosition);
        };


        return getPosition();

      };

      scrollPos();

    }

    hashy.setHash = (hash) => {
      if (window.location.hash !== hash) {
        window.location.hash = hash;
      } else {
        return false;
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
      // offset is a string, so we get the height of the matchingitem
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
      if (elem.offsetTop < (this.globalOffset * -1)) {
        var elemPos = elem.offsetTop + 1 ;
      } else {
        var elemPos = elem.offsetTop + 1 + this.globalOffset;
      }
      if (elemPos > this.scrollOffset) {
        var i = this.scrollOffset;
        var y = elemPos;
        var diff = y -i;
        var scrollPlus = () => {
          if(i < y){
            i = i + diff/this.averageSpeed;
            document.body.scrollTop = i;
            document.documentElement.scrollTop = i;
          } else{
           clearInterval(interval);
           hashy.checkElem();
           hashy.setHash(hash);
          }
        }

        var interval = setInterval(scrollPlus, 1);

      } else {
        var i = this.scrollOffset;
        var y = elemPos;
        var diff = i - y;
        var scrollMinus = () => {
          if(i > y){
            i = i - diff/this.averageSpeed;
            document.body.scrollTop = i;
            document.documentElement.scrollTop = i;
          } else{
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
      hashy.bind(this.triggerElems)
    }




    // ===========================================================================
    // init global vars
    // ===========================================================================

    //  Raf runtime
    this.runtime = function(){};


    //  All hashy elems
    this.elems = [].slice.call(document.querySelectorAll(this.itemClass));

    //  All hashy triggers
    this.triggerElems = document.querySelectorAll(this.triggerClass);
    // Set inenr scrolling to 0
    this.scrollOffset = 0;
    // no selectedElem
    var selectedElem = null;


    // checks if offset is class and set value
    this.globalOffset = hashy.checkOffset(this.offset);
    // Repeat the check after resize
    var resizeTimeout;
    hashy.doneResize = () => {
      this.globalOffset = hashy.checkOffset(this.offset);
      this.scrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
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
      document.documentElement.scrollTop = elem.offsetTop + this.globalOffset;
      document.body.scrollTop = elem.offsetTop + this.globalOffset;
      this.scrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    }

    // ===========================================================================


    // Starting the magic
    hashy.init()

    // Closing hashy
  };





  window.hashy = hashy;
}())
