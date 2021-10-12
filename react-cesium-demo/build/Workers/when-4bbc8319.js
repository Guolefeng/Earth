define(["exports"],(function(n){"use strict";function r(n,r){return null!=n?n:r}r.EMPTY_OBJECT=Object.freeze({});var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function t(n,r,e){return n(e={path:r,exports:{},require:function(n,r){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==r&&e.path)}},e.exports),e.exports}var u=t((function(n,r){var e;e=function(){var n,r,e;function t(n,r,e,t){return u(n).then(r,e,t)}function u(n){var r,e;return n=n instanceof o?n:c(n)?(r=f(),n.then((function(n){r.resolve(n)}),(function(n){r.reject(n)}),(function(n){r.progress(n)})),r.promise):(e=n,new o((function(n){try{return u(n?n(e):e)}catch(n){return i(n)}})))}function o(n){this.then=n}function i(n){return new o((function(r,e){try{return e?u(e(n)):i(n)}catch(r){return i(r)}}))}function f(){var n=new o(a),r=[],t=[],c=function(n,e,u){var o=f(),i="function"==typeof u?function(n){try{o.progress(u(n))}catch(n){o.progress(n)}}:function(n){o.progress(n)};return r.push((function(r){r.then(n,e).then(o.resolve,o.reject,i)})),t.push(i),o.promise},s=function(n){return h(t,n),n},l=function(n){return n=u(n),c=n.then,l=u,s=v,h(r,n),t=r=e,n};return{then:a,resolve:p,reject:d,progress:g,promise:n,resolver:{resolve:p,reject:d,progress:g}};function a(n,r,e){return c(n,r,e)}function p(n){return l(n)}function d(n){return l(i(n))}function g(n){return s(n)}}function c(n){return n&&"function"==typeof n.then}function s(n,r,e,u,o){return p(2,arguments),t(n,(function(n){var i,c,s,l,a=n.length>>>0,h=Math.max(0,Math.min(r,a)),p=[],d=a-h+1,g=[],y=f();if(h)for(s=y.progress,c=function(n){g.push(n),--d||(i=c=v,y.reject(g))},i=function(n){p.push(n),--h||(i=c=v,y.resolve(p))},l=0;l<a;++l)l in n&&t(n[l],w,m,s);else y.resolve(p);return y.then(e,u,o);function m(n){c(n)}function w(n){i(n)}}))}function l(n,r,e,t){return p(1,arguments),a(n,d).then(r,e,t)}function a(n,r){return t(n,(function(n){var e,u,o,i=e=n.length>>>0,c=[],s=f();if(i)for(u=function(n,e){t(n,r).then((function(n){c[e]=n,--i||s.resolve(c)}),s.reject)},o=0;o<e;o++)o in n?u(n[o],o):--i;else s.resolve(c);return s.promise}))}function h(n,r){for(var e,t=0;e=n[t++];)e(r)}function p(n,r){for(var e,t=r.length;n<t;)if(null!=(e=r[--t])&&"function"!=typeof e)throw new Error("arg "+t+" must be a function")}function v(){}function d(n){return n}return t.defer=f,t.resolve=u,t.reject=function(n){return t(n,i)},t.join=function(){return a(arguments,d)},t.all=l,t.map=a,t.reduce=function(e,u){var o=r.call(arguments,1);return t(e,(function(r){var e=r.length;return o[0]=function(n,r,o){return t(n,(function(n){return t(r,(function(r){return u(n,r,o,e)}))}))},n.apply(r,o)}))},t.any=function(n,r,e,t){return s(n,1,(function(n){return r?r(n[0]):n[0]}),e,t)},t.some=s,t.chain=function(n,r,e){var u=2<arguments.length;return t(n,(function(n){return r.resolve(n=u?e:n),n}),(function(n){return r.reject(n),i(n)}),r.progress)},t.isPromise=c,o.prototype={always:function(n,r){return this.then(n,n,r)},otherwise:function(n){return this.then(e,n)},yield:function(n){return this.then((function(){return n}))},spread:function(n){return this.then((function(r){return l(r,(function(r){return n.apply(e,r)}))}))}},r=[].slice,n=[].reduce||function(n){var r,e=0,t=Object(this),u=t.length>>>0,o=arguments;if(o.length<=1)for(;;){if(e in t){r=t[e++];break}if(++e>=u)throw new TypeError}else r=o[1];for(;e<u;++e)e in t&&(r=n(r,t[e],e,t));return r},t},n.exports=e()}));n.commonjsGlobal=e,n.createCommonjsModule=t,n.defaultValue=r,n.defined=function(n){return null!=n},n.when=u}));