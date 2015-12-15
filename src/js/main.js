import $ from 'jquery';

// Shimmed plugin example
import plugin from 'plugin';

// Enable inline svgs in IE
// import svg4everybody from 'svg4everybody';
// svg4everybody();

$(() => {
  $('body').on('click',function(){
    hashy.go('three')
  });

  (function(){

    const hashy = function(){

      // This shoudl be fixed now jsut working when getting an selectByID

      if(window.location.hash.length && window.location.hash != 'undefined'){

        let cleanHash = window.location.hash.replace('#', '');
        let elem = document.querySelector('[data-hash="' + cleanHash + '"]');

        let element = document.getElementById(elem.id);
        element.scrollIntoView()
      }


      this.runtime = function(){};


      this.elemClass = '.hashy-item';

      // =============================
      // Check when element is in window
      // =============================

      this.elems = document.querySelectorAll(this.elemClass);

      hashy.checkElem = () =>{

        var scrollPos;

        scrollPos = () => {
          var getPosition, scrollOffset;
          scrollOffset = 0;

          getPosition = () => {

            scrollOffset = window.pageYOffset || window.scrollTop;

            if (scrollOffset === undefined) {
              scrollOffset = 0;
            };
            var elemArray = Array.from(this.elems);

            // Thisi s very important preventing the hashsetter to be triggered continously
            var selectedElem;

            elemArray.forEach( (elem) => {
              var elemOffset = Math.abs(elem.offsetTop);
              var elemHeight = elem.offsetHeight || elem.clientHeight
              var height = window.innerHeight||document.documentElement.clientHeight;
              if (scrollOffset + height > elemOffset && scrollOffset > elemOffset && scrollOffset < elemOffset + elemHeight ) {
                var selectedElem = elem;
              }
              if (selectedElem) {
                 hashy.setHash(selectedElem.getAttribute('data-hash'));
              };
            });

            hashy.runtime = requestAnimationFrame(getPosition);
          };


          return getPosition();

        };

        scrollPos();

      }

      hashy.setHash = (hash) => {
        console.log('called')
        if (window.location.hash !== hash) {
          window.location.hash = hash
        } else {
          return false;
        }
      }
      // cancelAnimationFrame(hashy.runtime);

      hashy.go = function(hash){
        let elem = document.querySelector('[data-hash="' + hash + '"]');
        let element = document.getElementById(elem.id);
        element.scrollIntoView()
        hashy.setHash(hash);
      }

      hashy.checkElem()
    };
    window.hashy = hashy;
  }())

  var hash = new hashy

});
