//= require easymarklet/consumer
//= require fvb_iframe_bookmarklet
//= require artoo.js
//
var fvb_iframe_consumer = new Easymarklet.Consumer(FvbIframeBookmarklet);
fvb_iframe_consumer.consumerMethod = function(){console.log('consumer defined iframe_consumer.js')};
fvb_iframe_consumer.init();
loadArtoo();

