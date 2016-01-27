import $ from 'jquery';

// Shimmed plugin example
import hashyaa from 'hashy';

// Enable inline svgs in IE
// import svg4everybody from 'svg4everybody';
// svg4everybody();

$(() => {
  var hash = new hashy({
    triggerAttr: 'data-go'
  });
});
