import $ from 'jquery';

// Shimmed plugin example
import plugin from 'plugin';

// Enable inline svgs in IE
// import svg4everybody from 'svg4everybody';
// svg4everybody();

$(() => {
  $('*').on('click',function(){
    hashy.go('two');
  })
  var hash = new hashy
});


(function(){

  const hashy = function(options){

    if (! options) {
      options = {};
    };

    this.elemClass = options.class || '.hashy-item';
    this.dataAttr = options.data || 'data-hash'

    // This shoudl be fixed now jsut working when getting an selectByID

    if(window.location.hash.length && window.location.hash != 'undefined'){
      let cleanHash = window.location.hash.replace('#', '');
      let elem = document.querySelector('[' + this.dataAttr + '="' + cleanHash + '"]');
      elem.scrollIntoView()
    }


    this.runtime = function(){};



    // =============================
    // Check when element is in window
    // =============================

    this.elems = document.querySelectorAll(this.elemClass);

    this.scrollOffset = 0;

    var selectedElem = null;

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

    hashy.go = (hash) => {
      let elem = document.querySelector('[' + this.dataAttr + '="' + hash + '"]');
      hashy.scrollTo(elem, hash);
      hashy.setHash(hash);
    }

    hashy.scrollTo = (elem, hash) => {

      cancelAnimationFrame(hashy.runtime);

      let elemPos = Math.abs(elem.offsetTop);

      if (elemPos > this.scrollOffset) {
        var i = this.scrollOffset;
        var y = elemPos;
        var diff = y -i;
        function scrollPlus() {
          if(i < y){
            i = i + diff/100;
            document.body.scrollTop = i;
          } else{
           clearInterval(interval);
           hashy.setHash(hash);
           hashy.checkElem();
          }
        }

        var interval = setInterval(scrollPlus, 1);

      } else {
        var i = this.scrollOffset;
        var y = elemPos;
        var diff = i - y;
        function scrollMinus() {
          if(i > y){
            i = i - diff/100;
            document.body.scrollTop = i;
          } else{
           clearInterval(interval);
           hashy.setHash(hash);
           hashy.checkElem();
          }
        }

        var interval = setInterval(scrollMinus, 1);
      };

    }



    hashy.checkElem()
  };

  window.hashy = hashy;
}())