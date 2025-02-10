!function(){var e=function(e){var t={exports:{}};return e.call(t.exports,t,t.exports),t.exports},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)};e((function(e,o){"use strict";function a(e,t,n){if(e.length!=t.length)throw Error("Payload body and response have different number of items");e.forEach((function(e,r){var o=1;try{o=parseInt(t[r].quantity,10)||1}catch(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleBulkItemCartAddResponse: "+e.message)}c(e,o,n)}))}function i(e,t){for(var n=new Array(t),r=0;r<t;r++)n[r]={};var o=!0,a=!1,i=void 0;try{for(var d,c=decodeURI(e).split("&")[Symbol.iterator]();!(o=(d=c.next()).done);o=!0){var s=d.value.split("="),u=s[0].match(/items\[(\d+)\]\[(\w+)\].*/);if(u){var l=u[1],y=u[2];"quantity"===y?n[l].quantity=s[1]:"id"===y&&(n[l].id=s[1])}}}catch(e){a=!0,i=e}finally{try{!o&&c.return&&c.return()}finally{if(a)throw i}}return n}function d(e){if(!e)return 1;try{return JSON.parse(e).quantity||1}catch(o){if(e instanceof FormData){if(e.has("quantity"))return e.get("quantity")}else for(var t=e.split("&"),n=0;n<t.length;n++){var r=t[n].split("=");if("quantity"===r[0])return r[1]}}return 1}function c(e,t,n){var r=l("cart"),o=u({variantId:String(e.id),productId:e.product_id,currency:window.ShopifyAnalytics.meta.currency,quantity:String(t||1),price:e.presentment_price,name:e.title,sku:e.sku,brand:e.vendor,variant:e.variant_title,category:e.product_type},s()),a=u({cartToken:r},o);window.ShopifyAnalytics.lib.track("Added Product",a,void 0,void 0,{addApiSource:n,shopifyEmitted:!0});var i=u({referer:window.location.href},o);window.ShopifyAnalytics.lib.track("monorail://trekkie_storefront_track_added_product/1.1",i)}function s(){var e={};return window.ShopifyAnalytics.meta.page&&(e={pageType:window.ShopifyAnalytics.meta.page.pageType,resourceType:window.ShopifyAnalytics.meta.page.resourceType,resourceId:window.ShopifyAnalytics.meta.page.resourceId}),e}function u(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function l(e){try{var t=new RegExp("("+e+")=([^;]+)").exec(document.cookie);return t?unescape(t[2]):null}catch(e){return null}}Object.defineProperty(o,"__esModule",{value:!0});var y,f,h,p=function(){function e(t,r,o,a){n(this,e),this.xhr=t,this.url=r,this.method=o,this.body=a}return t(e,null,[{key:"handleXhrOpen",value:function(){}}]),t(e,[{key:"onReadyStateChange",value:function(){this.xhr.readyState===XMLHttpRequest.DONE&&e.handleXhrDone({method:this.method,url:this.url,body:this.body,xhr:this.xhr}),this.oldOnReadyStateChange&&this.oldOnReadyStateChange()}}],[{key:"handleXhrDone",value:function(t){try{var n=document.createElement("a");n.href=t.url;var r=n.pathname?n.pathname:t.url;e.ADD_TO_CART_REGEX.test(r)&&e._parsePayloadResponse(t,(function(e){var n=Object.keys(e);if(1===n.length&&"items"===n[0]){var r=e.items,o=void 0;try{o=JSON.parse(t.body).items}catch(e){o=i(t.body,r.length)}a(r,o,"add-xhr-bulk")}else c(e,d(t.body),"add-xhr")}))}catch(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleXhrDone:  "+e.message)}}},{key:"parseBlobToJson",value:function(e,t){var n=new FileReader;n.addEventListener("loadend",(function(){return t(JSON.parse(String.fromCharCode.apply(String,r(new Uint8Array(n.result)))))})),n.readAsArrayBuffer(e)}},{key:"_parsePayloadResponse",value:function(t,n){t.xhr.response instanceof Blob?e.parseBlobToJson(t.xhr.response,n):t.xhr.responseText&&n(JSON.parse(t.xhr.responseText))}}]),e}();p.ADD_TO_CART_REGEX=/^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/+cart\/+add(?:\.js|\.json)?\/*$/,o.default=p,function(){function e(e,t,n){window.jQuery&&window.jQuery(e).bind?window.jQuery(e).bind(t,n):e.addEventListener?e.addEventListener(t,n):e.attachEvent&&e.attachEvent("on"+t,n)}function t(e){if(!((e=e||window.event).defaultPrevented||e.isDefaultPrevented&&e.isDefaultPrevented())){var t=e.target||e.srcElement;if(t&&(t.getAttribute("action")||t.getAttribute("href")))try{var n=void 0,r=t.id||t.elements.id;n=r.options?r.options[r.selectedIndex]:r;var o=l("cart"),i=a(n.value);i.quantity=String(t.quantity?t.quantity.value:1);var d=u({cartToken:o},i),c=u({referer:window.location.href},i);window.ShopifyAnalytics.lib.track("Added Product",d,void 0,void 0,{addApiSource:"add-form",shopifyEmitted:!0}),window.ShopifyAnalytics.lib.track("monorail://trekkie_storefront_track_added_product/1.1",c)}catch(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleSubmitCartAdd: "+e.message)}}}function n(e){var t=(e=e||window.event).target||e.srcElement;if(t&&t.getAttribute("action")&&null!==t.getAttribute("data-payment-form"))try{window.ShopifyAnalytics.lib.track("Added Payment",{currency:window.ShopifyAnalytics.meta.currency,total:window.ShopifyAnalytics.meta.checkout.payment_due/100},void 0,void 0,{shopifyEmitted:!0})}catch(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleSubmitToPaymentAdd: "+e.message)}}function r(e){o((e=e||window.event).currentTarget)}function o(e){try{var t=void 0,n=e.id||e.elements.id;if(!(t=n.options&&n.options[n.selectedIndex]?n.options[n.selectedIndex]:n))return;var r=t.value;if(window.ShopifyAnalytics.meta.selectedVariantId&&window.ShopifyAnalytics.meta.selectedVariantId==r)return;window.ShopifyAnalytics.meta.selectedVariantId=r;var o=a(r);window.ShopifyAnalytics.lib.track("Viewed Product Variant",o,void 0,void 0,{shopifyEmitted:!0})}catch(e){console&&console.warn&&console.warn("[shop_events_listener] Error in trackViewedProductVariant: "+e.message)}}function a(e){var t=u(c(e),s());return t.currency=window.ShopifyAnalytics.meta.currency,t}function i(e,t){var n=!0,r=!1,o=void 0;try{for(var a,i=t[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var c=a.value,s=d(e,c);if(s)return{product:c,variant:s}}}catch(e){r=!0,o=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw o}}}function d(e,t){var n=!0,r=!1,o=void 0;try{for(var a,i=t.variants[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var d=a.value;if(d.id==e)return d}}catch(e){r=!0,o=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw o}}}function c(e){var t=void 0,n=void 0,r=void 0;if(window.ShopifyAnalytics.meta.products){var o=i(e,window.ShopifyAnalytics.meta.products);t=o.product,n=o.variant}else window.ShopifyAnalytics.meta.product&&(n=d(e,t=window.ShopifyAnalytics.meta.product));return t?(r={productId:t.id,productGid:t.gid,brand:t.vendor,category:t.type},n&&(r=u(r,{variantId:e,price:n.price/100,name:n.name,sku:n.sku,variant:n.public_title}))):r={variantId:e},r}e(window,"load",(function(){for(var a=0;a<document.forms.length;a++){var i=document.forms[a].getAttribute("action");i&&i.indexOf("/cart/add")>=0&&(e(document.forms[a],"submit",t),e(document.forms[a],"change",r),o(document.forms[a]));var d=document.forms[a].elements.previous_step;d&&"payment_method"===d.value&&e(document.body,"submit",n)}}))}(),y=XMLHttpRequest,f=y.prototype.open,h=y.prototype.send,y.prototype.open=function(e,t){this._url=t,this._method=e,p.handleXhrOpen(),f.apply(this,arguments)},y.prototype.send=function(e){var t=new p(this,this._url,this._method,e);this.addEventListener?this.addEventListener("readystatechange",t.onReadyStateChange.bind(t),!1):(t.oldOnReadyStateChange=this.onreadystatechange,this.onreadystatechange=t.onReadyStateChange),h.call(this,e)},function(e,t){function n(e,t){e.clone().json().then((function(e){var n=t.items;return a(e.items,n,"add-fetch-bulk"),e})).catch(o)}function r(e,t){var n=d(t);e.clone().json().then((function(e){return c(e,n,"add-fetch")})).catch(o)}function o(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleFetchRequest:  "+e.message)}"function"==typeof t&&(e.fetch=function(){var e=arguments;return t.apply(this,Array.prototype.slice.call(arguments)).then((function(t){if(!t.ok)return t;var a=document.createElement("a");a.href=t.url;var i=a.pathname?a.pathname:t.url;try{if(p.ADD_TO_CART_REGEX.test(i)){try{var d=JSON.parse(e[1].body);if(Object.keys(d).includes("items"))return n(t,d),t}catch(e){}r(t,e[1].body)}}catch(e){o(e)}return t}))})}(window,window.fetch)}))}("undefined"!=typeof global?global:"undefined"!=typeof window&&window);