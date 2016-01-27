
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




    hashy.checkElem = () =>{


      var scrollPos = () => {
        var getPosition, scrollOffset;
        scrollOffset = 0;

        getPosition = () => {

          this.scrollOffset = window.pageYOffset || window.scrollTop;

          if (this.scrollOffset === undefined) {
            this.scrollOffset = 0;
          };


          var elemArray = Array.from(this.elems);

          elemArray.forEach( (elem) => {
            var elemOffset = Math.abs(elem.offsetTop);
            var elemHeight = elem.offsetHeight || elem.clientHeight;
            var height = window.innerHeight||document.documentElement.clientHeight;
            if (this.scrollOffset + height > elemOffset && this.scrollOffset > elemOffset && this.scrollOffset < elemOffset + elemHeight ) {
              if (elem !== selectedElem ) {
                selectedElem = elem;
                hashy.setHash(selectedElem.getAttribute(this.dataAttr));
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
            e.preventDefault();
            hashy.go(e.target.getAttribute(attr))
          };
      }
    }

    hashy.go = (hash) => {
      let elem = document.querySelector('[' + this.dataAttr + '="' + hash + '"]');
      hashy.scrollTo(elem, hash);
      hashy.setHash(hash);
    }

    hashy.scrollTo = (elem, hash) => {

      cancelAnimationFrame(hashy.runtime);
      console.log(this.averageSpeed);
      let elemPos = Math.abs(elem.offsetTop) + 1;

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
    // On pageload:
    // Look for valid location hash and scroll to position via scrollIntoView
    // ===========================================================================

    if(window.location.hash.length && window.location.hash != 'undefined'){
      let cleanHash = window.location.hash.replace('#', '');
      let elem = document.querySelector('[' + this.dataAttr + '="' + cleanHash + '"]');
      elem.scrollIntoView()
    }

    // ===========================================================================



    // ===========================================================================
    // init global vars
    // ===========================================================================

    //  Raf runtime
    this.runtime = function(){};
    //  All hashy elems
    this.elems = document.querySelectorAll(this.itemClass);
    //  All hashy triggers
    this.triggerElems = document.querySelectorAll(this.triggerClass);
    // Set inenr scrolling to 0
    this.scrollOffset = 0;
    // no selectedElem
    var selectedElem = null;

    // Starting the magic
    hashy.init()

    // ===========================================================================
    // Finish init global vars
    // ===========================================================================

    // Closing hashy
  };





  window.hashy = hashy;
}())
