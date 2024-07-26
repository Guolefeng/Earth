import * as Cesium from "cesium";

const baseUrl = "";

// const localImageryProvider = new Cesium.UrlTemplateImageryProvider({
//     url: baseUrl + "",
//     minimumLevel: 1,
//     maximumLevel: 14,
//     hasAlphaChannel: false,
//     enablePickFeatures: false,
// });
// const localImageryLayer = new Cesium.ImageryLayer(localImageryProvider);

// const selectedImageryProviderViewModelCreationFunction = () =>
//     localImageryProvider;

// const selectedImageryProviderViewModel = new Cesium.ProviderViewModel({
//     name: 'local',
//     tooltip: 'local imagert provider',
//     iconUrl: '',
//     category: 'local',
//     creationFunction: selectedImageryProviderViewModelCreationFunction
// });

// const localCiaImageryProvider = new Cesium.UrlTemplateImageryProvider({
//     url: baseUrl + "",
//     minimumLevel: 1,
//     maximumLevel: 13,
//     hasAlphaChannel: true,
//     enablePickFeatures: false,
// });

// export const localCiaImageryLayer = new Cesium.ImageryLayer(
//     localCiaImageryProvider
// );

// export const loaclTerrainProviderPromise = Cesium.CesiumTerrainProvider.fromUrl(
//     baseUrl + "/cesium_dem",
//     {
//         requestWaterMask: true,
//         requestVertexNormals: true,
//     }
// );

// export let loaclTerrainProvider: Cesium.CesiumTerrainProvider;
// loaclTerrainProviderPromise.then((res) => {
//     loaclTerrainProvider = res;
// });

export const viewerOption = {
    animation: false, // 是否创建动画小器件，左下角仪表
    baseLayerPicker: true, // 是否显示图层选择器
    fullscreenButton: true, // 是否显示全屏按钮
    vrButton: true, //  用于切换 VR 模式的单个按钮小部件。
    geocoder: true, //  // 是否显示geocoder小器件，右上角查询按钮
    homeButton: true, // 是否显示Home按钮
    infoBox: true, // 是否显示信息框
    sceneModePicker: true, // 是否显示3D/2D选择器
    selectionIndicator: true, // 是否显示选取指示器组件
    timeline: false, // 是否显示时间轴
    navigationHelpButton: true, // 是否显示右上角的帮助按钮
    navigationInstructionsInitiallyVisible: true, // 是否显示导航说明
    scene3DOnly: false, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    shouldAnimate: false, //  初始化是否开始动画
    // clockViewModel: undefined, //  一个视图模型，它为用户界面提供 Clock
    // selectedImageryProviderViewModel: undefined, // 当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    // selectedTerrainProviderViewModel: undefined, // 当前地形图层的显示模型，仅baseLayerPicker设为true有意义
    skyBox: new Cesium.SkyBox({
        sources: {
            positiveX: "/skybox/00h+00.jpg",
            negativeX: "/skybox/12h+00.jpg",
            positiveY: "/skybox/06h+00.jpg",
            negativeY: "/skybox/18h+00.jpg",
            positiveZ: "/skybox/06h+90.jpg",
            negativeZ: "/skybox/06h-90.jpg",
        },
    }), // 用于渲染星空的SkyBox对象
    skyAtmosphere: new Cesium.SkyAtmosphere(), //  围绕提供的椭球体边缘绘制的大气
    fullscreenElement: document.body, // 全屏时渲染的HTML元素,
    useDefaultRenderLoop: true, // 如果需要控制渲染循环，则设为true
    targetFrameRate: 60, // 使用默认render loop时的帧率
    showRenderLoopErrors: true, // 如果设为true，将在一个HTML面板中显示错误信息
    useBrowserRecommendedResolution: true, // 设置为true时，以浏览器推荐分辨率渲染
    automaticallyTrackDataSourceClocks: true, // 自动追踪最近添加的数据源的时钟设置
    contextOptions: {
        requestWebgl1: true, // 强制使用WebGL1而不是WebGL2
        //     allowTextureFilterAnisotropic: true, // 允许使用anisotropic texture filtering（纹理过滤）
        //     webgl: {
        //         alpha: false, // 透明
        //         depth: true, // 深度缓冲
        //         stencil: false, // 模板缓冲
        //         antialias: true, // 抗锯齿
        //         premultipliedAlpha: true, // 预乘alpha
        //         preserveDrawingBuffer: false, // 保留绘图缓冲区数据，用于离屏渲染
        //         powerPreference: 'high-performance', // 性能优先
        //         failIfMajorPerformanceCaveat: false, // 性能问题时，是否阻止渲染
        //     } // 传递给WebGLContextOptions的上下文参数（contextOptions）
        //     // getWebGLStub: undefined, // 用于创建WebGL上下文的函数
    }, // 传递给Scene对象的上下文参数（scene.options）
    sceneMode: Cesium.SceneMode.SCENE3D, // 初始场景模式
    mapProjection: new Cesium.WebMercatorProjection(), // 地图投影体系
    // globe: undefined, //  在场景中渲染的地球仪，包括其地形 ( Globe#terrainProvider ) 和图像图层 ( Globe#imageryLayers )
    // globe: new Cesium.Globe(Cesium.Ellipsoid.WGS84),
    orderIndependentTranslucency: true, // 如果设为true，则每个几何图形都会使用独立的 translucency 状态
    // creditContainer: document.createElement("div"), // 用于显示credit的DOM元素
    // creditViewport: document.createElement("div"), // 用于显示credit的DOM元素
    dataSources: new Cesium.DataSourceCollection(), // 需要进行可视化的数据源的集合
    shadows: true, // 是否显示阴影
    // projectionPicker: undefined, // ProjectionPicker 是用于在透视和正交投影之间切换的单按钮小部件。
    // terrainShadows: Cesium.ShadowMode.ENABLED, // 阴影模式
    // imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), // 图层选择器,可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    // terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), // 地形选择器,可供BaseLayerPicker选择的地形图层ProviderViewModel数组
    // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
    //   credit: "",
    //   url: "Custom url",
    // }), // 图像图层提供者，仅baseLayerPicker设为false有意义
    terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
    // mapMode2D: Cesium.MapMode2D.INFINITE_SCROLL, // 2D地图模式
    // blurActiveElementOnCanvasFocus: true, // 失去焦点时模糊canvas
    // requestRenderMode: false, // 请求渲染模式
    // maximumRenderTimeChange: 0, // 最大渲染时间间隔
    // depthPlaneEllipsoidOffset: 0, // 深度平面椭球体偏移
    msaaSamples: 4, // 用于MSAA的样本数
};
