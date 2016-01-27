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
hashy looks for links with .hashy-item class
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
  averageSpeed :  10,                   // default is 100
  itemClass :     '.item-class',       // default is '.hashy-item'
  itemAttr :      'data-name',         // default is 'data-hash'
  triggerClass :  '.scroll-anchor',    // default is '.hashy-go'
  triggerAttr :   'data-name'          // default is 'href'
});

```
