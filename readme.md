# Note this is a wip version, wait for npm module

# #hashy

One pager hash navigation script.<br>
Uses Raf to make your one page navigation smooth, performant and precise.


## Usage

In your js just:

```javascript

import hashy from 'hashy';

var hash = new hashy();

```

The markup should then look like this:

```html
<!--
  hashy looks for links with .hashy-go class
  and uses the href as hash value
-->
<a href="one" class="hashy-go">Go to one</a>
<a href="two" class="hashy-go">Go to one</a>


<!--
hashy looks for elems with .hashy-item class
and uses the data hash attribute for hash value
-->
<section class="hashy-item" data-hash="one">
    ...
</section>

<section class="hashy-item" data-hash="two">
    ...
</section>

```

## Options

You can override the previous defaults like this:

```javascript

import hashy from 'hashy';

var hash = new hashy({
  averageSpeed :  10,                  // integer - default is 100
  itemClass :     '.item-class',       // class selector -  default is '.hashy-item'
  itemAttr :      'data-name',         // valid attribute - default is 'data-hash'
  triggerClass :  '.scroll-anchor',    // class selector - default is '.hashy-go'
  triggerAttr :   'data-name'          // valid attribute - default is 'href'
});

```


## Notes

```averageSpeed``` is an interpolated variable, used to interpolate distances.
The bigger the value the slower the scrolling will be, note that hashy takes care of scrolling faster to more distant items.

```Raf``` needs to be available in the browser.
