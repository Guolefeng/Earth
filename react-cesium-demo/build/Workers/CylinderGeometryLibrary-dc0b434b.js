define(["exports","./ComponentDatatype-93750d1a"],(function(t,r){"use strict";var e={computePositions:function(t,e,a,n,o){for(var i=.5*t,s=-i,u=(t=n+n,new Float64Array(3*(o?2*t:t))),c=0,y=0,f=o?3*t:0,m=o?3*(t+n):3*n,p=0;p<n;p++){var d=p/n*r.CesiumMath.TWO_PI,h=(v=Math.cos(d))*a,v=(d=(C=Math.sin(d))*a,v*e),C=C*e;u[y+f]=h,u[y+f+1]=d,u[y+f+2]=s,u[y+m]=v,u[y+m+1]=C,u[y+m+2]=i,y+=3,o&&(u[c++]=h,u[c++]=d,u[c++]=s,u[c++]=v,u[c++]=C,u[c++]=i)}return u}};t.CylinderGeometryLibrary=e}));