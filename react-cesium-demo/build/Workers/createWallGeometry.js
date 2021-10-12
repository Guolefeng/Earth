define(["./when-4bbc8319","./Matrix2-ccd5b911","./Transforms-d5c6ad6e","./ComponentDatatype-93750d1a","./RuntimeError-346a3079","./GeometryAttribute-c30799b8","./GeometryAttributes-7827a6c2","./IndexDatatype-b7d979a6","./VertexFormat-71718faa","./WallGeometryLibrary-ee5443ac","./combine-83860057","./WebGLConstants-1c8239cc","./arrayRemoveDuplicates-18786327","./PolylinePipeline-8457214f","./EllipsoidGeodesic-19ea7553","./EllipsoidRhumbLine-aa9e6266","./IntersectionTests-4d6f5c54","./Plane-18bb00f8"],(function(e,t,a,i,n,r,o,s,m,l,u,p,d,c,y,g,f,h){"use strict";var v=new t.Cartesian3,C=new t.Cartesian3,x=new t.Cartesian3,b=new t.Cartesian3,A=new t.Cartesian3,_=new t.Cartesian3,E=new t.Cartesian3;function w(a){var n=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).positions,r=a.maximumHeights,o=a.minimumHeights,s=e.defaultValue(a.vertexFormat,m.VertexFormat.DEFAULT),l=e.defaultValue(a.granularity,i.CesiumMath.RADIANS_PER_DEGREE);a=e.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84);this._positions=n,this._minimumHeights=o,this._maximumHeights=r,this._vertexFormat=m.VertexFormat.clone(s),this._granularity=l,this._ellipsoid=t.Ellipsoid.clone(a),this._workerName="createWallGeometry",n=1+n.length*t.Cartesian3.packedLength+2,e.defined(o)&&(n+=o.length),e.defined(r)&&(n+=r.length),this.packedLength=n+t.Ellipsoid.packedLength+m.VertexFormat.packedLength+1}w.pack=function(a,i,n){var r;n=e.defaultValue(n,0);var o=a._positions,s=o.length;for(i[n++]=s,r=0;r<s;++r,n+=t.Cartesian3.packedLength)t.Cartesian3.pack(o[r],i,n);var l=a._minimumHeights;s=e.defined(l)?l.length:0;if(i[n++]=s,e.defined(l))for(r=0;r<s;++r)i[n++]=l[r];var u=a._maximumHeights;if(s=e.defined(u)?u.length:0,i[n++]=s,e.defined(u))for(r=0;r<s;++r)i[n++]=u[r];return t.Ellipsoid.pack(a._ellipsoid,i,n),n+=t.Ellipsoid.packedLength,m.VertexFormat.pack(a._vertexFormat,i,n),i[n+=m.VertexFormat.packedLength]=a._granularity,i};var F=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),L=new m.VertexFormat,k={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:F,vertexFormat:L,granularity:void 0};return w.unpack=function(a,i,n){i=e.defaultValue(i,0);for(var r,o,s=a[i++],l=new Array(s),u=0;u<s;++u,i+=t.Cartesian3.packedLength)l[u]=t.Cartesian3.unpack(a,i);if(0<(s=a[i++]))for(r=new Array(s),u=0;u<s;++u)r[u]=a[i++];if(0<(s=a[i++]))for(o=new Array(s),u=0;u<s;++u)o[u]=a[i++];var p=t.Ellipsoid.unpack(a,i,F);i+=t.Ellipsoid.packedLength;var d=m.VertexFormat.unpack(a,i,L),c=a[i+=m.VertexFormat.packedLength];return e.defined(n)?(n._positions=l,n._minimumHeights=r,n._maximumHeights=o,n._ellipsoid=t.Ellipsoid.clone(p,n._ellipsoid),n._vertexFormat=m.VertexFormat.clone(d,n._vertexFormat),n._granularity=c,n):(k.positions=l,k.minimumHeights=r,k.maximumHeights=o,k.granularity=c,new w(k))},w.fromConstantHeights=function(t){var a=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,i=t.minimumHeight,n=t.maximumHeight,r=e.defined(i),o=e.defined(n);if(r||o)for(var s=a.length,m=r?new Array(s):void 0,l=o?new Array(s):void 0,u=0;u<s;++u)r&&(m[u]=i),o&&(l[u]=n);return new w({positions:a,maximumHeights:l,minimumHeights:m,ellipsoid:t.ellipsoid,vertexFormat:t.vertexFormat})},w.createGeometry=function(n){var m=n._positions,u=n._minimumHeights,p=n._maximumHeights,d=n._vertexFormat,c=n._granularity,y=n._ellipsoid;p=l.WallGeometryLibrary.computePositions(y,m,p,u,c,!0);if(e.defined(p)){for(var g=p.bottomPositions,f=p.topPositions,h=(u=p.numCorners,f.length),w=(c=2*h,d.position?new Float64Array(c):void 0),F=d.normal?new Float32Array(c):void 0,L=d.tangent?new Float32Array(c):void 0,k=d.bitangent?new Float32Array(c):void 0,H=d.st?new Float32Array(c/3*2):void 0,V=0,G=0,D=0,P=0,T=0,z=E,O=_,R=A,S=!0,I=0,N=1/((h/=3)-u-1),M=0;M<h;++M){var W,B=3*M,U=t.Cartesian3.fromArray(f,B,v),q=t.Cartesian3.fromArray(g,B,C);d.position&&(w[V++]=q.x,w[V++]=q.y,w[V++]=q.z,w[V++]=U.x,w[V++]=U.y,w[V++]=U.z),d.st&&(H[T++]=I,H[T++]=0,H[T++]=I,H[T++]=1),(d.normal||d.tangent||d.bitangent)&&(W=t.Cartesian3.clone(t.Cartesian3.ZERO,b),q=t.Cartesian3.subtract(U,y.geodeticSurfaceNormal(U,C),C),M+1<h&&(W=t.Cartesian3.fromArray(f,3+B,b)),S&&(B=t.Cartesian3.subtract(W,U,x),q=t.Cartesian3.subtract(q,U,v),z=t.Cartesian3.normalize(t.Cartesian3.cross(q,B,z),z),S=!1),t.Cartesian3.equalsEpsilon(U,W,i.CesiumMath.EPSILON10)?S=!0:(I+=N,d.tangent&&(O=t.Cartesian3.normalize(t.Cartesian3.subtract(W,U,O),O)),d.bitangent&&(R=t.Cartesian3.normalize(t.Cartesian3.cross(z,O,R),R))),d.normal&&(F[G++]=z.x,F[G++]=z.y,F[G++]=z.z,F[G++]=z.x,F[G++]=z.y,F[G++]=z.z),d.tangent&&(L[P++]=O.x,L[P++]=O.y,L[P++]=O.z,L[P++]=O.x,L[P++]=O.y,L[P++]=O.z),d.bitangent&&(k[D++]=R.x,k[D++]=R.y,k[D++]=R.z,k[D++]=R.x,k[D++]=R.y,k[D++]=R.z))}p=new o.GeometryAttributes,d.position&&(p.position=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:w})),d.normal&&(p.normal=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:F})),d.tangent&&(p.tangent=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),d.bitangent&&(p.bitangent=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:k})),d.st&&(p.st=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:H}));var J=c/3,Y=s.IndexDatatype.createTypedArray(J,c-=6*(u+1)),Z=0;for(M=0;M<J-2;M+=2){var j=M,K=M+2,Q=t.Cartesian3.fromArray(w,3*j,v),X=t.Cartesian3.fromArray(w,3*K,C);t.Cartesian3.equalsEpsilon(Q,X,i.CesiumMath.EPSILON10)||(X=M+3,Y[Z++]=M+1,Y[Z++]=j,Y[Z++]=X,Y[Z++]=X,Y[Z++]=j,Y[Z++]=K)}return new r.Geometry({attributes:p,indices:Y,primitiveType:r.PrimitiveType.TRIANGLES,boundingSphere:new a.BoundingSphere.fromVertices(w)})}},function(a,i){return(a=e.defined(i)?w.unpack(a,i):a)._ellipsoid=t.Ellipsoid.clone(a._ellipsoid),w.createGeometry(a)}}));