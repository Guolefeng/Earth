define(["./when-4bbc8319","./Transforms-d5c6ad6e","./Matrix2-ccd5b911","./RuntimeError-346a3079","./ComponentDatatype-93750d1a","./FrustumGeometry-6ddd5218","./GeometryAttribute-c30799b8","./GeometryAttributes-7827a6c2","./combine-83860057","./WebGLConstants-1c8239cc","./Plane-18bb00f8","./VertexFormat-71718faa"],(function(e,t,r,n,a,i,u,o,c,s,p,m){"use strict";function d(n){var a,u,o=n.frustum,c=n.orientation,s=n.origin;n=e.defaultValue(n._drawNearPlane,!0);o instanceof i.PerspectiveFrustum?(a=0,u=i.PerspectiveFrustum.packedLength):o instanceof i.OrthographicFrustum&&(a=1,u=i.OrthographicFrustum.packedLength),this._frustumType=a,this._frustum=o.clone(),this._origin=r.Cartesian3.clone(s),this._orientation=t.Quaternion.clone(c),this._drawNearPlane=n,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+u+r.Cartesian3.packedLength+t.Quaternion.packedLength}d.pack=function(n,a,u){u=e.defaultValue(u,0);var o=n._frustumType,c=n._frustum;return 0===(a[u++]=o)?(i.PerspectiveFrustum.pack(c,a,u),u+=i.PerspectiveFrustum.packedLength):(i.OrthographicFrustum.pack(c,a,u),u+=i.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,a,u),u+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,a,u),a[u+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,a};var h=new i.PerspectiveFrustum,f=new i.OrthographicFrustum,g=new t.Quaternion,_=new r.Cartesian3;return d.unpack=function(n,a,u){a=e.defaultValue(a,0);var o,c=n[a++];0===c?(o=i.PerspectiveFrustum.unpack(n,a,h),a+=i.PerspectiveFrustum.packedLength):(o=i.OrthographicFrustum.unpack(n,a,f),a+=i.OrthographicFrustum.packedLength);var s=r.Cartesian3.unpack(n,a,_);a+=r.Cartesian3.packedLength;var p=t.Quaternion.unpack(n,a,g);n=1===n[a+=t.Quaternion.packedLength];return e.defined(u)?(a=c===u._frustumType?u._frustum:void 0,u._frustum=o.clone(a),u._frustumType=c,u._origin=r.Cartesian3.clone(s,u._origin),u._orientation=t.Quaternion.clone(p,u._orientation),u._drawNearPlane=n,u):new d({frustum:o,origin:s,orientation:p,_drawNearPlane:n})},d.createGeometry=function(e){var r=e._frustumType,n=e._frustum,c=e._origin,s=e._orientation,p=e._drawNearPlane;e=new Float64Array(24);i.FrustumGeometry._computeNearFarPlanes(c,s,r,n,e);n=new o.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e})});for(var m,d,h=p?2:1,f=new Uint16Array(8*(1+h)),g=p?0:1;g<2;++g)f[m=p?8*g:0]=d=4*g,f[m+1]=d+1,f[m+2]=d+1,f[m+3]=d+2,f[m+4]=d+2,f[m+5]=d+3,f[m+6]=d+3,f[m+7]=d;for(g=0;g<2;++g)f[m=8*(h+g)]=d=4*g,f[m+1]=d+4,f[m+2]=d+1,f[m+3]=d+5,f[m+4]=d+2,f[m+5]=d+6,f[m+6]=d+3,f[m+7]=d+7;return new u.Geometry({attributes:n,indices:f,primitiveType:u.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(e)})},function(t,r){return e.defined(r)&&(t=d.unpack(t,r)),d.createGeometry(t)}}));