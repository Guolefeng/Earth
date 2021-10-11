define(["exports","./GeometryOffsetAttribute-1772960d","./Transforms-d5c6ad6e","./Matrix2-ccd5b911","./RuntimeError-346a3079","./ComponentDatatype-93750d1a","./when-4bbc8319","./EllipseGeometryLibrary-9dda9a85","./GeometryAttribute-c30799b8","./GeometryAttributes-7827a6c2","./GeometryInstance-5f4fe82b","./GeometryPipeline-548e76d2","./IndexDatatype-b7d979a6","./VertexFormat-71718faa"],(function(t,e,r,a,i,n,o,s,u,l,m,p,y,c){"use strict";var d=new a.Cartesian3,A=new a.Cartesian3,x=new a.Cartesian3,f=new a.Cartesian3,h=new a.Cartesian2,g=new a.Matrix3,_=new a.Matrix3,b=new r.Quaternion,C=new a.Cartesian3,v=new a.Cartesian3,w=new a.Cartesian3,E=new a.Cartographic,M=new a.Cartesian3,I=new a.Cartesian2,T=new a.Cartesian2;function G(t,i,m){var p=i.vertexFormat,y=i.center,c=i.semiMajorAxis,f=i.semiMinorAxis,G=i.ellipsoid,N=i.stRotation,P=m?t.length/3*2:t.length/3,F=i.shadowVolume,V=p.st?new Float32Array(2*P):void 0,D=p.normal?new Float32Array(3*P):void 0,O=p.tangent?new Float32Array(3*P):void 0,S=p.bitangent?new Float32Array(3*P):void 0,L=F?new Float32Array(3*P):void 0,R=0,j=C,z=v,k=w,B=new r.GeographicProjection(G),Y=B.project(G.cartesianToCartographic(y,E),M);y=G.scaleToGeodeticSurface(y,d);G.geodeticSurfaceNormal(y,y);var H=g,U=_;U=0!==N?(it=r.Quaternion.fromAxisAngle(y,N,b),H=a.Matrix3.fromQuaternion(it,H),it=r.Quaternion.fromAxisAngle(y,-N,b),a.Matrix3.fromQuaternion(it,U)):(H=a.Matrix3.clone(a.Matrix3.IDENTITY,H),a.Matrix3.clone(a.Matrix3.IDENTITY,U));for(var Q=a.Cartesian2.fromElements(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,I),W=a.Cartesian2.fromElements(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,T),J=t.length,q=m?J:0,Z=q/3*2,K=0;K<J;K+=3){var X,$=K+1,tt=K+2,et=a.Cartesian3.fromArray(t,K,d);p.st&&(X=a.Matrix3.multiplyByVector(H,et,A),X=B.project(G.cartesianToCartographic(X,E),x),a.Cartesian3.subtract(X,Y,X),h.x=(X.x+c)/(2*c),h.y=(X.y+f)/(2*f),Q.x=Math.min(h.x,Q.x),Q.y=Math.min(h.y,Q.y),W.x=Math.max(h.x,W.x),W.y=Math.max(h.y,W.y),m&&(V[R+Z]=h.x,V[R+1+Z]=h.y),V[R++]=h.x,V[R++]=h.y),(p.normal||p.tangent||p.bitangent||F)&&(j=G.geodeticSurfaceNormal(et,j),F&&(L[K+q]=-j.x,L[$+q]=-j.y,L[tt+q]=-j.z),(p.normal||p.tangent||p.bitangent)&&((p.tangent||p.bitangent)&&(z=a.Cartesian3.normalize(a.Cartesian3.cross(a.Cartesian3.UNIT_Z,j,z),z),a.Matrix3.multiplyByVector(U,z,z)),p.normal&&(D[K]=j.x,D[$]=j.y,D[tt]=j.z,m&&(D[K+q]=-j.x,D[$+q]=-j.y,D[tt+q]=-j.z)),p.tangent&&(O[K]=z.x,O[$]=z.y,O[tt]=z.z,m&&(O[K+q]=-z.x,O[$+q]=-z.y,O[tt+q]=-z.z)),p.bitangent&&(k=a.Cartesian3.normalize(a.Cartesian3.cross(j,z,k),k),S[K]=k.x,S[$]=k.y,S[tt]=k.z,m&&(S[K+q]=k.x,S[$+q]=k.y,S[tt+q]=k.z))))}if(p.st){J=V.length;for(var rt=0;rt<J;rt+=2)V[rt]=(V[rt]-Q.x)/(W.x-Q.x),V[rt+1]=(V[rt+1]-Q.y)/(W.y-Q.y)}var at,it=new l.GeometryAttributes;return p.position&&(at=s.EllipseGeometryLibrary.raisePositionsToHeight(t,i,m),it.position=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:at})),p.st&&(it.st=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:V})),p.normal&&(it.normal=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:D})),p.tangent&&(it.tangent=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:O})),p.bitangent&&(it.bitangent=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:S})),F&&(it.extrudeDirection=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),m&&o.defined(i.offsetAttribute)&&(at=new Uint8Array(P),at=i.offsetAttribute===e.GeometryOffsetAttribute.TOP?e.arrayFill(at,1,0,P/2):(i=i.offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(at,i)),it.applyOffset=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:at})),it}function N(t){for(var e,r,a=new Array(t*(t+1)*12-6),i=0,n=0,o=1,s=0;s<3;s++)a[i++]=o++,a[i++]=n,a[i++]=o;for(s=2;s<t+1;++s){for(o=s*(s+1)-1,n=(s-1)*s-1,a[i++]=o++,a[i++]=n,a[i++]=o,e=2*s,r=0;r<e-1;++r)a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n,a[i++]=o;a[i++]=o++,a[i++]=n,a[i++]=o}for(e=2*t,++o,++n,s=0;s<e-1;++s)a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n,a[i++]=o;for(a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n++,a[i++]=n,++n,s=t-1;1<s;--s){for(a[i++]=n++,a[i++]=n,a[i++]=o,e=2*s,r=0;r<e-1;++r)a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n,a[i++]=o;a[i++]=n++,a[i++]=n++,a[i++]=o++}for(s=0;s<3;s++)a[i++]=n++,a[i++]=n,a[i++]=o;return a}var P=new a.Cartesian3,F=new r.BoundingSphere,V=new r.BoundingSphere;function D(t,e,r,i,o,u,l){for(var m=s.EllipseGeometryLibrary.computeEllipsePositions({center:t,semiMajorAxis:e,semiMinorAxis:r,rotation:i,granularity:o},!1,!0).outerPositions,p=m.length/3,y=new Array(p),c=0;c<p;++c)y[c]=a.Cartesian3.fromArray(m,3*c);return(l=a.Rectangle.fromCartesianArray(y,u,l)).width>n.CesiumMath.PI&&(l.north=0<l.north?n.CesiumMath.PI_OVER_TWO-n.CesiumMath.EPSILON7:l.north,l.south=l.south<0?n.CesiumMath.EPSILON7-n.CesiumMath.PI_OVER_TWO:l.south,l.east=n.CesiumMath.PI,l.west=-n.CesiumMath.PI),l}function O(t){var e=(t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT)).center,r=o.defaultValue(t.ellipsoid,a.Ellipsoid.WGS84),i=t.semiMajorAxis,s=t.semiMinorAxis,u=o.defaultValue(t.granularity,n.CesiumMath.RADIANS_PER_DEGREE),l=o.defaultValue(t.vertexFormat,c.VertexFormat.DEFAULT),m=o.defaultValue(t.height,0),p=o.defaultValue(t.extrudedHeight,m);this._center=a.Cartesian3.clone(e),this._semiMajorAxis=i,this._semiMinorAxis=s,this._ellipsoid=a.Ellipsoid.clone(r),this._rotation=o.defaultValue(t.rotation,0),this._stRotation=o.defaultValue(t.stRotation,0),this._height=Math.max(p,m),this._granularity=u,this._vertexFormat=c.VertexFormat.clone(l),this._extrudedHeight=Math.min(p,m),this._shadowVolume=o.defaultValue(t.shadowVolume,!1),this._workerName="createEllipseGeometry",this._offsetAttribute=t.offsetAttribute,this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0}O.packedLength=a.Cartesian3.packedLength+a.Ellipsoid.packedLength+c.VertexFormat.packedLength+9,O.pack=function(t,e,r){return r=o.defaultValue(r,0),a.Cartesian3.pack(t._center,e,r),r+=a.Cartesian3.packedLength,a.Ellipsoid.pack(t._ellipsoid,e,r),r+=a.Ellipsoid.packedLength,c.VertexFormat.pack(t._vertexFormat,e,r),r+=c.VertexFormat.packedLength,e[r++]=t._semiMajorAxis,e[r++]=t._semiMinorAxis,e[r++]=t._rotation,e[r++]=t._stRotation,e[r++]=t._height,e[r++]=t._granularity,e[r++]=t._extrudedHeight,e[r++]=t._shadowVolume?1:0,e[r]=o.defaultValue(t._offsetAttribute,-1),e};var S=new a.Cartesian3,L=new a.Ellipsoid,R=new c.VertexFormat,j={center:S,ellipsoid:L,vertexFormat:R,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,stRotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};O.unpack=function(t,e,r){e=o.defaultValue(e,0);var i=a.Cartesian3.unpack(t,e,S);e+=a.Cartesian3.packedLength;var n=a.Ellipsoid.unpack(t,e,L);e+=a.Ellipsoid.packedLength;var s=c.VertexFormat.unpack(t,e,R);e+=c.VertexFormat.packedLength;var u=t[e++],l=t[e++],m=t[e++],p=t[e++],y=t[e++],d=t[e++],A=t[e++],x=1===t[e++];e=t[e];return o.defined(r)?(r._center=a.Cartesian3.clone(i,r._center),r._ellipsoid=a.Ellipsoid.clone(n,r._ellipsoid),r._vertexFormat=c.VertexFormat.clone(s,r._vertexFormat),r._semiMajorAxis=u,r._semiMinorAxis=l,r._rotation=m,r._stRotation=p,r._height=y,r._granularity=d,r._extrudedHeight=A,r._shadowVolume=x,r._offsetAttribute=-1===e?void 0:e,r):(j.height=y,j.extrudedHeight=A,j.granularity=d,j.stRotation=p,j.rotation=m,j.semiMajorAxis=u,j.semiMinorAxis=l,j.shadowVolume=x,j.offsetAttribute=-1===e?void 0:e,new O(j))},O.computeRectangle=function(t,e){var r=(t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT)).center,i=o.defaultValue(t.ellipsoid,a.Ellipsoid.WGS84),s=t.semiMajorAxis,u=t.semiMinorAxis,l=o.defaultValue(t.granularity,n.CesiumMath.RADIANS_PER_DEGREE);return D(r,s,u,o.defaultValue(t.rotation,0),l,i,e)},O.createGeometry=function(t){if(!(t._semiMajorAxis<=0||t._semiMinorAxis<=0)){var i=t._height,c=t._extrudedHeight,_=!n.CesiumMath.equalsEpsilon(i,c,0,n.CesiumMath.EPSILON2);t._center=t._ellipsoid.scaleToGeodeticSurface(t._center,t._center);var D;i={center:t._center,semiMajorAxis:t._semiMajorAxis,semiMinorAxis:t._semiMinorAxis,ellipsoid:t._ellipsoid,rotation:t._rotation,height:i,granularity:t._granularity,vertexFormat:t._vertexFormat,stRotation:t._stRotation};return _?(i.extrudedHeight=c,i.shadowVolume=t._shadowVolume,i.offsetAttribute=t._offsetAttribute,D=function(t){var i=t.center,c=t.ellipsoid,_=t.semiMajorAxis,P=a.Cartesian3.multiplyByScalar(c.geodeticSurfaceNormal(i,d),t.height,d);F.center=a.Cartesian3.add(i,P,F.center),F.radius=_,P=a.Cartesian3.multiplyByScalar(c.geodeticSurfaceNormal(i,P),t.extrudedHeight,P),V.center=a.Cartesian3.add(i,P,V.center),V.radius=_,c=(D=s.EllipseGeometryLibrary.computeEllipsePositions(t,!0,!0)).positions,i=D.numPts,P=D.outerPositions,_=r.BoundingSphere.union(F,V);var D=G(c,t,!0),O=(R=N(i)).length;R.length=2*O;for(var S=c.length/3,L=0;L<O;L+=3)R[L+O]=R[L+2]+S,R[L+1+O]=R[L+1]+S,R[L+2+O]=R[L]+S;c=y.IndexDatatype.createTypedArray(2*S/3,R),c=new u.Geometry({attributes:D,indices:c,primitiveType:u.PrimitiveType.TRIANGLES}),t=function(t,i){var s=i.vertexFormat,m=i.center,p=i.semiMajorAxis,y=i.semiMinorAxis,c=i.ellipsoid,_=i.height,G=i.extrudedHeight,N=i.stRotation,P=t.length/3*2,F=new Float64Array(3*P),V=s.st?new Float32Array(2*P):void 0,D=s.normal?new Float32Array(3*P):void 0,O=s.tangent?new Float32Array(3*P):void 0,S=s.bitangent?new Float32Array(3*P):void 0,L=i.shadowVolume,R=L?new Float32Array(3*P):void 0,j=0,z=C,k=v,B=w,Y=new r.GeographicProjection(c),H=Y.project(c.cartesianToCartographic(m,E),M);m=c.scaleToGeodeticSurface(m,d),c.geodeticSurfaceNormal(m,m),m=r.Quaternion.fromAxisAngle(m,N,b);for(var U=a.Matrix3.fromQuaternion(m,g),Q=a.Cartesian2.fromElements(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,I),W=a.Cartesian2.fromElements(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,T),J=(et=t.length)/3*2,q=0;q<et;q+=3){var Z=q+1,K=q+2,X=a.Cartesian3.fromArray(t,q,d);s.st&&(tt=a.Matrix3.multiplyByVector(U,X,A),$=Y.project(c.cartesianToCartographic(tt,E),x),a.Cartesian3.subtract($,H,$),h.x=($.x+p)/(2*p),h.y=($.y+y)/(2*y),Q.x=Math.min(h.x,Q.x),Q.y=Math.min(h.y,Q.y),W.x=Math.max(h.x,W.x),W.y=Math.max(h.y,W.y),V[j+J]=h.x,V[j+1+J]=h.y,V[j++]=h.x,V[j++]=h.y),X=c.scaleToGeodeticSurface(X,X),tt=a.Cartesian3.clone(X,A),z=c.geodeticSurfaceNormal(X,z),L&&(R[q+et]=-z.x,R[Z+et]=-z.y,R[K+et]=-z.z);var $=a.Cartesian3.multiplyByScalar(z,_,f),tt=(X=a.Cartesian3.add(X,$,X),$=a.Cartesian3.multiplyByScalar(z,G,$),a.Cartesian3.add(tt,$,tt));s.position&&(F[q+et]=tt.x,F[Z+et]=tt.y,F[K+et]=tt.z,F[q]=X.x,F[Z]=X.y,F[K]=X.z),(s.normal||s.tangent||s.bitangent)&&(B=a.Cartesian3.clone(z,B),$=a.Cartesian3.fromArray(t,(q+3)%et,f),a.Cartesian3.subtract($,X,$),X=a.Cartesian3.subtract(tt,X,x),z=a.Cartesian3.normalize(a.Cartesian3.cross(X,$,z),z),s.normal&&(D[q]=z.x,D[Z]=z.y,D[K]=z.z,D[q+et]=z.x,D[Z+et]=z.y,D[K+et]=z.z),s.tangent&&(k=a.Cartesian3.normalize(a.Cartesian3.cross(B,z,k),k),O[q]=k.x,O[Z]=k.y,O[K]=k.z,O[q+et]=k.x,O[q+1+et]=k.y,O[q+2+et]=k.z),s.bitangent&&(S[q]=B.x,S[Z]=B.y,S[K]=B.z,S[q+et]=B.x,S[Z+et]=B.y,S[K+et]=B.z))}if(s.st)for(var et=V.length,rt=0;rt<et;rt+=2)V[rt]=(V[rt]-Q.x)/(W.x-Q.x),V[rt+1]=(V[rt+1]-Q.y)/(W.y-Q.y);return N=new l.GeometryAttributes,s.position&&(N.position=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:F})),s.st&&(N.st=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:V})),s.normal&&(N.normal=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:D})),s.tangent&&(N.tangent=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:O})),s.bitangent&&(N.bitangent=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:S})),L&&(N.extrudeDirection=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:R})),o.defined(i.offsetAttribute)&&(m=new Uint8Array(P),m=i.offsetAttribute===e.GeometryOffsetAttribute.TOP?e.arrayFill(m,1,0,P/2):(i=i.offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(m,i)),N.applyOffset=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:m})),N}(P,t);var R=function(t){for(var e=t.length/3,r=y.IndexDatatype.createTypedArray(e,6*e),a=0,i=0;i<e;i++){var n=i,o=i+e,s=(n+1)%e,u=s+e;r[a++]=n,r[a++]=o,r[a++]=s,r[a++]=s,r[a++]=o,r[a++]=u}return r}(P);return P=y.IndexDatatype.createTypedArray(2*P.length/3,R),P=new u.Geometry({attributes:t,indices:P,primitiveType:u.PrimitiveType.TRIANGLES}),{boundingSphere:_,attributes:(P=p.GeometryPipeline.combineInstances([new m.GeometryInstance({geometry:c}),new m.GeometryInstance({geometry:P})]))[0].attributes,indices:P[0].indices}}(i)):(D=function(t){var e=t.center;P=a.Cartesian3.multiplyByScalar(t.ellipsoid.geodeticSurfaceNormal(e,P),t.height,P),P=a.Cartesian3.add(e,P,P);var i=new r.BoundingSphere(P,t.semiMajorAxis),n=(e=(n=s.EllipseGeometryLibrary.computeEllipsePositions(t,!0,!1)).positions,n.numPts);t=G(e,t,!1),n=N(n);return{boundingSphere:i,attributes:t,indices:n=y.IndexDatatype.createTypedArray(e.length/3,n)}}(i),o.defined(t._offsetAttribute)&&(c=D.attributes.position.values.length,i=new Uint8Array(c/3),c=t._offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(i,c),D.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i}))),new u.Geometry({attributes:D.attributes,indices:D.indices,primitiveType:u.PrimitiveType.TRIANGLES,boundingSphere:D.boundingSphere,offsetAttribute:t._offsetAttribute})}},O.createShadowVolume=function(t,e,r){var a=t._granularity,i=t._ellipsoid;e=e(a,i),r=r(a,i);return new O({center:t._center,semiMajorAxis:t._semiMajorAxis,semiMinorAxis:t._semiMinorAxis,ellipsoid:i,rotation:t._rotation,stRotation:t._stRotation,granularity:a,extrudedHeight:e,height:r,vertexFormat:c.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(O.prototype,{rectangle:{get:function(){return o.defined(this._rectangle)||(this._rectangle=D(this._center,this._semiMajorAxis,this._semiMinorAxis,this._rotation,this._granularity,this._ellipsoid)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return o.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(t){var e=-t._stRotation;if(0==e)return[0,0,0,1,1,0];for(var r=s.EllipseGeometryLibrary.computeEllipsePositions({center:t._center,semiMajorAxis:t._semiMajorAxis,semiMinorAxis:t._semiMinorAxis,rotation:t._rotation,granularity:t._granularity},!1,!0).outerPositions,i=r.length/3,n=new Array(i),o=0;o<i;++o)n[o]=a.Cartesian3.fromArray(r,3*o);var l=t._ellipsoid;t=t.rectangle;return u.Geometry._textureCoordinateRotationPoints(n,e,l,t)}(this)),this._textureCoordinateRotationPoints}}}),t.EllipseGeometry=O}));