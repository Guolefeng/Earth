(this["webpackJsonpreact-cesium-demo"]=this["webpackJsonpreact-cesium-demo"]||[]).push([[0],{117:function(e){e.exports=JSON.parse('{"asset":{"version":"1.0","tilesetVersion":"1.2.3"},"extras":{"name":"Sample Tileset"},"properties":{"id":{"minimum":0,"maximum":9},"Longitude":{"minimum":-1.3197192952275933,"maximum":-1.319644104024109},"Latitude":{"minimum":0.698848878034009,"maximum":0.6989046192460953},"Height":{"minimum":6.161747192963958,"maximum":85.41026367992163}},"geometricError":240,"root":{"boundingVolume":{"region":[-1.3197209591796106,0.6988424218,-1.3196390408203893,0.6989055782,0,88]},"geometricError":70,"refine":"ADD","content":{"uri":"parent.b3dm","boundingVolume":{"region":[-1.3197004795898053,0.6988582109,-1.3196595204101946,0.6988897891,0,88]}},"children":[{"boundingVolume":{"region":[-1.3197209591796106,0.6988424218,-1.31968,0.698874,0,20]},"geometricError":0,"content":{"uri":"ll.b3dm"}},{"boundingVolume":{"region":[-1.31968,0.6988424218,-1.3196390408203893,0.698874,0,20]},"geometricError":0,"content":{"uri":"lr.b3dm"},"extras":{"id":"Special Tile"}},{"boundingVolume":{"region":[-1.31968,0.698874,-1.3196390408203893,0.6989055782,0,20]},"geometricError":0,"content":{"uri":"ur.b3dm"}},{"boundingVolume":{"region":[-1.3197209591796106,0.698874,-1.31968,0.6989055782,0,20]},"geometricError":0,"content":{"uri":"ul.b3dm"}}]}}')},131:function(e,n,r){},132:function(e,n,r){},133:function(e,n,r){},166:function(e,n){},168:function(e,n){},193:function(e,n){function r(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}r.keys=function(){return[]},r.resolve=r,e.exports=r,r.id=193},196:function(e,n,r){},197:function(e,n,r){},198:function(e,n,r){},199:function(e,n,r){},201:function(e,n,r){},274:function(e,n,r){"use strict";r.r(n);var i=r(0),t=r.n(i),o=r(18),a=r.n(o),l=(r(131),r(132),r(133),r(31)),c=(r(194),r(7));l.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGFkNmRmNC05NmFkLTRmMDktYTFkMS0yNTE0NjNmOWEwYjMiLCJpZCI6NjA1MDAsImlhdCI6MTYyNTEyMDcyNn0.S14rriO-ggk-vKvkUa3wONp0zSAOEUBBx8tZJRrPzqY",window.Cesium=l;var s=function(){return Object(i.useEffect)((function(){var e=new l.Viewer(document.getElementById("earth"),{animation:!1,timeline:!1,fullscreenButton:!1,terrainProvider:l.createWorldTerrain({requestVertexNormals:!0,requestWaterMask:!0})});e.imageryLayers.addImageryProvider(new l.UrlTemplateImageryProvider({url:"https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=78c0c5a1844ab8a716f09bc9113d909d",subdomains:["0","1","2","3","4","5","6","7"],layer:"tdtIboLayer",style:"default",format:"image/png",tileMatrixSetID:"GoogleMapsCompatible"})),e.imageryLayers.addImageryProvider(new l.UrlTemplateImageryProvider({url:"https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=78c0c5a1844ab8a716f09bc9113d909d",subdomains:["0","1","2","3","4","5","6","7"],layer:"tdtCiaLayer",style:"default",format:"image/png",tileMatrixSetID:"GoogleMapsCompatible"})),e.camera.flyTo({destination:l.Cartesian3.fromDegrees(116.39,39.91,2e7)}),e.scene.debugShowFramesPerSecond=!0,e.extend(l.viewerDragDropMixin),e.dropError.addEventListener((function(e,n,r){console.log("Cesium viewer drop error: ",r),window.alert(r)})),window.viewer=e}),[]),Object(c.jsx)("div",{id:"earth",className:"earth"})},u=(r(196),r(125)),m=(r(197),r(198),r(276)),d=(r(199),r(277)),C=r.p+"static/media/castle.7bae1c2e.gltf",f=r.p+"static/media/icon.48ec34f4.png",b=r(117),p=function(){var e,n=window,r=n.viewer,t=n.Cesium;Object(i.useEffect)((function(){return function(){e&&(r.entities.remove(e),e=null)}}),[]);var o=function(e){return new t.Entity(e)};function a(e){for(var n=[],r=0;r<360;r++){var i=t.Math.toRadians(r);n.push(new t.Cartesian2(e*Math.cos(i),e*Math.sin(i)))}return n}var l=function(n){switch(e&&(r.entities.remove(e),e=null),n){case 0:e=o({position:new t.Cartesian3.fromDegrees(116.39,39.91,50),label:{text:"Oh My lezi",font:"14pt monospace",fillColor:t.Color.RED,style:t.LabelStyle.FILL_AND_OUTLINE,outlineWidth:2,outlineColor:t.Color.RED,verticalOrigin:t.VerticalOrigin.BOTTOM,showBackground:!0,backgroundColor:new t.Color(.165,.165,.165,.8),pixelOffset:new t.Cartesian2(0,-9)}});break;case 1:e=o({position:new t.Cartesian3.fromDegrees(116.39,39.91,50),model:{uri:C}});break;case 2:e=o({position:new t.Cartesian3.fromDegrees(117.39,39.91,1e3),billboard:{image:f,width:342,height:362}});break;case 3:e=o({position:new t.Cartesian3.fromDegrees(116.39,39.91,50),plane:{dimensions:new t.Cartesian2(5e5,5e5),fill:!0,material:t.Color.DARKGREY.withAlpha(.5),plane:new t.Plane(t.Cartesian3.UNIT_Y,0)}});break;case 4:e=o({position:new t.Cartesian3.fromDegrees(116.39,34.91,50),point:{color:t.Color.WHITE,outlineColor:t.Color.RED,outlineWidth:100,pixelSize:100}});break;case 5:e=o({position:new t.Cartesian3.fromDegrees(116.39,39.91,50),polygon:{hierarchy:t.Cartesian3.fromDegreesArray([-115,37,-115,32,-107,33,-102,31,-102,35]),material:t.Color.RED}});break;case 6:e=o({polyline:{positions:t.Cartesian3.fromDegreesArrayHeights([-75,38,25e4,-125,38,25e4]),width:5,material:new t.PolylineDashMaterialProperty({color:t.Color.BLUE,gapColor:t.Color.YELLOW,dashLength:8,dashPattern:parseInt("110000001111",2)})}});break;case 7:e=o({polylineVolume:{positions:t.Cartesian3.fromDegreesArray([-85,32,-85,36,-89,36]),shape:a(6e4),material:t.Color.RED}});break;case 8:e=o({rectangle:{coordinates:t.Rectangle.fromDegrees(-110,30,-100,40),material:t.Color.GREEN.withAlpha(.5),rotation:t.Math.toRadians(45),extrudedHeight:3e5,height:1e5,outline:!0,outlineColor:t.Color.BLACK}});break;case 9:e=o({position:new t.Cartesian3.fromDegrees(116.39,39.91,50),tileset:{uri:b}});break;case 10:e=o({wall:{positions:t.Cartesian3.fromDegreesArray([-115,50,-112.5,50,-110,50,-107.5,50,-105,50,-102.5,50,-100,50,-97.5,50,-95,50,-92.5,50,-90,50]),maximumHeights:[1e5,2e5,1e5,2e5,1e5,2e5,1e5,2e5,1e5,2e5,1e5],minimumHeights:[0,1e5,0,1e5,0,1e5,0,1e5,0,1e5,0],material:t.Color.BLUE.withAlpha(.5),outline:!0,outlineColor:t.Color.BLACK}});break;case 11:e=o({name:"red box",position:new t.Cartesian3.fromDegrees(116.39,39.91,15e3),box:{dimensions:new t.Cartesian3(4e4,3e4,5e4),material:t.Color.DARKGREY.withAlpha(.5),outline:!0,outlineColor:t.Color.BLACK}})}e&&(r.entities.add(e),r.flyTo(e))};return Object(c.jsxs)("div",{className:"ae",children:[Object(c.jsx)(d.a,{onClick:function(){return l(0)},children:"label"}),Object(c.jsx)(d.a,{onClick:function(){return l(1)},children:"model"}),Object(c.jsx)(d.a,{onClick:function(){return l(2)},children:"billboard"}),Object(c.jsx)(d.a,{onClick:function(){return l(3)},children:"plane"}),Object(c.jsx)(d.a,{onClick:function(){return l(4)},children:"point"}),Object(c.jsx)(d.a,{onClick:function(){return l(5)},children:"polygon"}),Object(c.jsx)(d.a,{onClick:function(){return l(6)},children:"polyline"}),Object(c.jsx)(d.a,{onClick:function(){return l(7)},children:"polylineVolume"}),Object(c.jsx)(d.a,{onClick:function(){return l(8)},children:"rectangle"}),Object(c.jsx)(d.a,{onClick:function(){return l(10)},children:"wall"}),Object(c.jsx)(d.a,{onClick:function(){return l(11)},children:"box"})]})},h=function(){return Object(i.useEffect)((function(){var e=window,n=e.viewer,r=e.Cesium,i=n.scene.primitives.add(new r.Cesium3DTileset({url:r.IonResource.fromAssetId(75343)}));return n.flyTo(i),function(){n.scene.primitives.remove(i)}}),[]),null},g=(r(201),r.p+"static/media/build.5f056628.png"),j=function(){var e,n,r=window,t=r.viewer,o=r.Cesium;Object(i.useEffect)((function(){return e=t.entities.add({name:"red box",position:new o.Cartesian3.fromDegrees(116.39,39.91,15e3),box:{dimensions:new o.Cartesian3(4e5,3e5,5e5),material:o.Color.RED.withAlpha(.5),outline:!0,outlineColor:o.Color.BLACK}}),n=t.entities.add({polyline:{positions:o.Cartesian3.fromDegreesArray([116.39,35.91,100,42.91]),width:10,material:o.Color.BURLYWOOD}}),t.flyTo(t.entities),function(){t.entities.remove(e),t.entities.remove(n)}}),[]);return Object(c.jsxs)("div",{className:"sm",children:[Object(c.jsx)(d.a,{onClick:function(){e&&(e.box.material=o.Color.ALICEBLUE.withAlpha(.5))},children:"\u989c\u8272\u6750\u8d28"}),Object(c.jsx)(d.a,{onClick:function(){e&&(e.box.material=new o.ImageMaterialProperty({image:g}))},children:"\u56fe\u7247\u6750\u8d28"}),Object(c.jsx)(d.a,{onClick:function(){e&&(e.box.material=new o.CheckerboardMaterialProperty({evenColor:o.Color.WHITE,oddColor:o.Color.BLACK,repeat:new o.Cartesian2(4,4)}))},children:"\u68cb\u76d8\u7eb9\u7406"}),Object(c.jsx)(d.a,{onClick:function(){e&&(e.box.material=new o.StripeMaterialProperty({evenColor:o.Color.WHITE,oddColor:o.Color.BLACK,repeat:32,offset:20,orientation:o.StripeOrientation.VERTICAL}))},children:"\u6761\u7eb9\u7eb9\u7406"}),Object(c.jsx)(d.a,{onClick:function(){e&&(e.box.material=new o.GridMaterialProperty({color:o.Color.AZURE,cellAlpha:.2,lineCount:new o.Cartesian2(8,8),lineThickness:new o.Cartesian2(1,3)}))},children:"\u7f51\u683c\u7eb9\u7406"}),Object(c.jsx)(d.a,{onClick:function(){n&&(n.polyline.material=new o.PolylineGlowMaterialProperty({glowPower:.5,color:o.Color.BLUE}))},children:"\u7ebf\u6761\u53d1\u5149\u7eb9\u7406"}),Object(c.jsx)(d.a,{onClick:function(){n&&(n.polyline.material=new o.PolylineOutlineMaterialProperty({color:o.Color.ORANGE,outlineWidth:2,outlineColor:o.Color.BLACK}))},children:"\u7ebf\u6761\u8fb9\u6846\u7eb9\u7406"})]})},w={0:{name:"\u6dfb\u52a0\u5f62\u72b6",component:Object(c.jsx)(p,{})},1:{name:"\u6dfb\u52a03DTiles",component:Object(c.jsx)(h,{})},2:{name:"\u8bbe\u7f6e\u6750\u8d28",component:Object(c.jsx)(j,{})}},x=function(e){var n=e.onSelect,r=void 0===n?function(){}:n;return Object(c.jsx)(m.a,{onSelect:r,mode:"inline",children:Object.keys(w).map((function(e){return Object(c.jsx)(m.a.Item,{children:w[e].name},e)}))})},O=function(){var e=Object(i.useState)(""),n=Object(u.a)(e,2),r=n[0],t=n[1];return Object(c.jsxs)("div",{className:"home",children:[Object(c.jsx)(x,{onSelect:function(e){var n=e.key;return t(w[n].component)}}),r||null]})},y=function(){return Object(c.jsx)("div",{className:"layout",children:Object(c.jsx)(O,{})})};var v=function(){return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(s,{}),Object(c.jsx)(y,{})]})},k=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,278)).then((function(n){var r=n.getCLS,i=n.getFID,t=n.getFCP,o=n.getLCP,a=n.getTTFB;r(e),i(e),t(e),o(e),a(e)}))},E=r(124),D=r.n(E),I=(r(269),r(25));a.a.render(Object(c.jsx)(t.a.StrictMode,{children:Object(c.jsx)(I.a,{locale:D.a,children:Object(c.jsx)(v,{})})}),document.getElementById("root")),k()}},[[274,1,2]]]);
//# sourceMappingURL=main.0efdad2e.chunk.js.map