define(["exports","./Matrix2-ccd5b911","./RuntimeError-346a3079","./when-4bbc8319"],(function(e,n,i,o){"use strict";function r(){this.high=n.Cartesian3.clone(n.Cartesian3.ZERO),this.low=n.Cartesian3.clone(n.Cartesian3.ZERO)}r.encode=function(e,n){var i;return o.defined(n)||(n={high:0,low:0}),0<=e?(i=65536*Math.floor(e/65536),n.high=i,n.low=e-i):(i=65536*Math.floor(-e/65536),n.high=-i,n.low=e+i),n};var h={high:0,low:0};r.fromCartesian=function(e,n){var i=(n=o.defined(n)?n:new r).high,t=n.low;return r.encode(e.x,h),i.x=h.high,t.x=h.low,r.encode(e.y,h),i.y=h.high,t.y=h.low,r.encode(e.z,h),i.z=h.high,t.z=h.low,n};var t=new r;r.writeElements=function(e,n,i){r.fromCartesian(e,t);var o=t.high;e=t.low;n[i]=o.x,n[i+1]=o.y,n[i+2]=o.z,n[i+3]=e.x,n[i+4]=e.y,n[i+5]=e.z},e.EncodedCartesian3=r}));