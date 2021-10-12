define(["./GeometryOffsetAttribute-1772960d","./arrayRemoveDuplicates-18786327","./Transforms-d5c6ad6e","./Matrix2-ccd5b911","./RuntimeError-346a3079","./ComponentDatatype-93750d1a","./PolylineVolumeGeometryLibrary-6bb54199","./CorridorGeometryLibrary-67a603a9","./when-4bbc8319","./GeometryAttribute-c30799b8","./GeometryAttributes-7827a6c2","./IndexDatatype-b7d979a6","./PolygonPipeline-83fb62b0","./combine-83860057","./WebGLConstants-1c8239cc","./EllipsoidTangentPlane-e000bae1","./AxisAlignedBoundingBox-883f9c89","./IntersectionTests-4d6f5c54","./Plane-18bb00f8","./PolylinePipeline-8457214f","./EllipsoidGeodesic-19ea7553","./EllipsoidRhumbLine-aa9e6266"],(function(e,t,i,r,o,a,n,s,l,d,u,p,h,f,y,c,g,b,m,A,v,_){"use strict";var E=new r.Cartesian3,C=new r.Cartesian3,G=new r.Cartesian3;function T(e,t){var i,o=[],h=e.positions,f=e.corners,y=e.endPositions,c=new u.GeometryAttributes,g=0,b=0,m=0;for(M=0;M<h.length;M+=2)g+=i=h[M].length-3,m+=i/3*4,b+=h[M+1].length-3;for(g+=3,b+=3,M=0;M<f.length;M++){var A=f[M],v=f[M].leftPositions;l.defined(v)?g+=i=v.length:b+=i=f[M].rightPositions.length,m+=i/3*2}var _,T=l.defined(y);T&&(g+=_=y[0].length-3,b+=_,m+=4*(_/=3));e=g+b;var P,w,L,D,x=new Float64Array(e),k=0,N=e-1,O=_/2,V=p.IndexDatatype.createTypedArray(e/3,m+4),H=0;if(V[H++]=k/3,V[H++]=(N-2)/3,T){o.push(k/3);for(var I=E,S=C,B=y[0],M=0;M<O;M++)I=r.Cartesian3.fromArray(B,3*(O-1-M),I),S=r.Cartesian3.fromArray(B,3*(O+M),S),s.CorridorGeometryLibrary.addAttribute(x,S,k),s.CorridorGeometryLibrary.addAttribute(x,I,void 0,N),D=1+(w=k/3),L=(P=(N-2)/3)-1,V[H++]=P,V[H++]=L,V[H++]=w,V[H++]=D,k+=3,N-=3}var R=0,U=h[R++],F=h[R++];for(x.set(U,k),x.set(F,N-F.length+1),i=F.length-3,o.push(k/3,(N-2)/3),M=0;M<i;M+=3)D=1+(w=k/3),L=(P=(N-2)/3)-1,V[H++]=P,V[H++]=L,V[H++]=w,V[H++]=D,k+=3,N-=3;for(M=0;M<f.length;M++){var Y,q,W=(A=f[M]).leftPositions,J=A.rightPositions,j=G;if(l.defined(W)){for(N-=3,q=L,o.push(D),Y=0;Y<W.length/3;Y++)j=r.Cartesian3.fromArray(W,3*Y,j),V[H++]=q-Y-1,V[H++]=q-Y,s.CorridorGeometryLibrary.addAttribute(x,j,void 0,N),N-=3;o.push(q-Math.floor(W.length/6)),t===n.CornerType.BEVELED&&o.push((N-2)/3+1),k+=3}else{for(k+=3,q=D,o.push(L),Y=0;Y<J.length/3;Y++)j=r.Cartesian3.fromArray(J,3*Y,j),V[H++]=q+Y,V[H++]=q+Y+1,s.CorridorGeometryLibrary.addAttribute(x,j,k),k+=3;o.push(q+Math.floor(J.length/6)),t===n.CornerType.BEVELED&&o.push(k/3-1),N-=3}for(U=h[R++],F=h[R++],U.splice(0,3),F.splice(F.length-3,3),x.set(U,k),x.set(F,N-F.length+1),i=F.length-3,Y=0;Y<F.length;Y+=3)w=(D=k/3)-1,V[H++]=P=1+(L=(N-2)/3),V[H++]=L,V[H++]=w,V[H++]=D,k+=3,N-=3;k-=3,N+=3,o.push(k/3,(N-2)/3)}if(T){k+=3,N-=3,I=E,S=C;var z=y[1];for(M=0;M<O;M++)I=r.Cartesian3.fromArray(z,3*(_-M-1),I),S=r.Cartesian3.fromArray(z,3*M,S),s.CorridorGeometryLibrary.addAttribute(x,I,void 0,N),s.CorridorGeometryLibrary.addAttribute(x,S,k),w=(D=k/3)-1,V[H++]=P=1+(L=(N-2)/3),V[H++]=L,V[H++]=w,V[H++]=D,k+=3,N-=3;o.push(k/3)}else o.push(k/3,(N-2)/3);return V[H++]=k/3,V[H++]=(N-2)/3,c.position=new d.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x}),{attributes:c,indices:V,wallIndices:o}}function P(e){var t=(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).positions,i=e.width,o=l.defaultValue(e.height,0),s=l.defaultValue(e.extrudedHeight,o);this._positions=t,this._ellipsoid=r.Ellipsoid.clone(l.defaultValue(e.ellipsoid,r.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(o,s),this._extrudedHeight=Math.min(o,s),this._cornerType=l.defaultValue(e.cornerType,n.CornerType.ROUNDED),this._granularity=l.defaultValue(e.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*r.Cartesian3.packedLength+r.Ellipsoid.packedLength+6}P.pack=function(e,t,i){i=l.defaultValue(i,0);var o=e._positions,a=o.length;t[i++]=a;for(var n=0;n<a;++n,i+=r.Cartesian3.packedLength)r.Cartesian3.pack(o[n],t,i);return r.Ellipsoid.pack(e._ellipsoid,t,i),i+=r.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=l.defaultValue(e._offsetAttribute,-1),t};var w=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),L={positions:void 0,ellipsoid:w,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return P.unpack=function(e,t,i){t=l.defaultValue(t,0);for(var o=e[t++],a=new Array(o),n=0;n<o;++n,t+=r.Cartesian3.packedLength)a[n]=r.Cartesian3.unpack(e,t);var s=r.Ellipsoid.unpack(e,t,w);t+=r.Ellipsoid.packedLength;var d=e[t++],u=e[t++],p=e[t++],h=e[t++],f=e[t++],y=e[t];return l.defined(i)?(i._positions=a,i._ellipsoid=r.Ellipsoid.clone(s,i._ellipsoid),i._width=d,i._height=u,i._extrudedHeight=p,i._cornerType=h,i._granularity=f,i._offsetAttribute=-1===y?void 0:y,i):(L.positions=a,L.width=d,L.height=u,L.extrudedHeight=p,L.cornerType=h,L.granularity=f,L.offsetAttribute=-1===y?void 0:y,new P(L))},P.createGeometry=function(o){var n=o._positions,u=o._width,f=o._ellipsoid,y=(n=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(n,f),t.arrayRemoveDuplicates(n,r.Cartesian3.equalsEpsilon));if(!(y.length<2||u<=0)){var c,g=o._height,b=o._extrudedHeight;n=!a.CesiumMath.equalsEpsilon(g,b,0,a.CesiumMath.EPSILON2),u={ellipsoid:f,positions:y,width:u,cornerType:o._cornerType,granularity:o._granularity,saveAttributes:!1};n?(u.height=g,u.extrudedHeight=b,u.offsetAttribute=o._offsetAttribute,c=function(t){var i=t.ellipsoid,r=(c=T(s.CorridorGeometryLibrary.computePositions(t),t.cornerType)).wallIndices,o=t.height,n=t.extrudedHeight,u=c.attributes,f=c.indices,y=(g=u.position.values).length;(b=new Float64Array(y)).set(g);var c=new Float64Array(2*y),g=h.PolygonPipeline.scaleToGeodeticHeight(g,o,i),b=h.PolygonPipeline.scaleToGeodeticHeight(b,n,i);c.set(g),c.set(b,y),u.position.values=c,y/=3,l.defined(t.offsetAttribute)&&(b=new Uint8Array(2*y),b=t.offsetAttribute===e.GeometryOffsetAttribute.TOP?e.arrayFill(b,1,0,y):(t=t.offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(b,t)),u.applyOffset=new d.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:b}));var m=f.length,A=p.IndexDatatype.createTypedArray(c.length/3,2*(m+r.length));A.set(f);for(var v,_,E=m,C=0;C<m;C+=2){var G=f[C],P=f[C+1];A[E++]=G+y,A[E++]=P+y}for(C=0;C<r.length;C++)_=(v=r[C])+y,A[E++]=v,A[E++]=_;return{attributes:u,indices:A}}(u)):((c=T(s.CorridorGeometryLibrary.computePositions(u),u.cornerType)).attributes.position.values=h.PolygonPipeline.scaleToGeodeticHeight(c.attributes.position.values,g,f),l.defined(o._offsetAttribute)&&(m=c.attributes.position.values.length,A=new Uint8Array(m/3),m=o._offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(A,m),c.attributes.applyOffset=new d.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:A})));var m=c.attributes,A=i.BoundingSphere.fromVertices(m.position.values,void 0,3);return new d.Geometry({attributes:m,indices:c.indices,primitiveType:d.PrimitiveType.LINES,boundingSphere:A,offsetAttribute:o._offsetAttribute})}},function(e,t){return(e=l.defined(t)?P.unpack(e,t):e)._ellipsoid=r.Ellipsoid.clone(e._ellipsoid),P.createGeometry(e)}}));