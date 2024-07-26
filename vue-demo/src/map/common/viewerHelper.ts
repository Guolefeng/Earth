import * as Cesium from "cesium";

const baseUrl = "";

const localImageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: baseUrl + "/google_terrain/{z}/{x}_{y}.png",
    minimumLevel: 1,
    maximumLevel: 14,
    hasAlphaChannel: false,
    enablePickFeatures: false,
});

const localImageryLayer = new Cesium.ImageryLayer(localImageryProvider);

// const selectedImageryProviderViewModelCreationFunction = () =>
//     localImageryProvider;
// const selectedImageryProviderViewModel = new Cesium.ProviderViewModel({
//     name: 'local',
//     tooltip: 'local imagert provider',
//     iconUrl: '',
//     category: 'local',
//     creationFunction: selectedImageryProviderViewModelCreationFunction
// });

const localCiaImageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: baseUrl + "/satellite_cia/{z}/{x}_{y}.png",
    minimumLevel: 1,
    maximumLevel: 13,
    hasAlphaChannel: true,
    enablePickFeatures: false,
});

export const localCiaImageryLayer = new Cesium.ImageryLayer(
    localCiaImageryProvider
);

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    30,
    -30,
    -160,
    90
);

export const loaclTerrainProviderPromise = Cesium.CesiumTerrainProvider.fromUrl(
    baseUrl + "/cesium_dem",
    {
        requestWaterMask: true,
        requestVertexNormals: true,
    }
);

export let loaclTerrainProvider: Cesium.CesiumTerrainProvider | null = null;

loaclTerrainProviderPromise.then((res) => {
    loaclTerrainProvider = res;
});

export const viewerOption = {
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    vrButton: false,
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: true, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: true, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    shouldAnimate: true,
    clockViewModel: new Cesium.ClockViewModel(new Cesium.Clock()),
    // selectedImageryProviderViewModel,
    // imageryProviderViewModels:,
    // selectedTerrainProviderViewModel:,
    // terrainProviderViewModels:,
    baseLayer: localImageryLayer,
    terrain: new Cesium.Terrain(loaclTerrainProviderPromise),
    // terrainProvider: ,
    // terrain: Cesium.Terrain.fromWorldTerrain({
    //     requestVertexNormals: true,
    //     requestWaterMask: true
    // }),
    // skyBox: new Cesium.SkyBox({
    //     // sources: {
    //     //     positiveX: 'skybox_px.png',
    //     //     negativeX: 'skybox_nx.png',
    //     //     positiveY: 'skybox_py.png',
    //     //     negativeY: 'skybox_ny.png',
    //     //     positiveZ: 'skybox_pz.png',
    //     //     negativeZ: 'skybox_nz.png'
    //     // },
    //     // show: true
    // }),
    skyAtmosphere: new Cesium.SkyAtmosphere(),
    // fullscreenElement: document.body,
    useDefaultRenderLoop: true, //如果需要控制渲染循环，则设为true
    targetFrameRate: 60, //使用默认render loop时的帧率
    showRenderLoopErrors: true, //如果设为true，将在一个HTML面板中显示错误信息
    useBrowserRecommendedResolution: true,
    automaticallyTrackDataSourceClocks: true, //自动追踪最近添加的数据源的时钟设置
    contextOptions: {
        requestWebgl1: true,
        //     allowTextureFilterAnisotropic: true,
        //     webgl: {
        //         alpha: false,
        //         depth: true,
        //         stencil: false,
        //         antialias: true,
        //         premultipliedAlpha: true,
        //         preserveDrawingBuffer: false,
        //         powerPreference: 'high-performance',
        //         failIfMajorPerformanceCaveat: false
        //     }
        //     // getWebGLStub:
    },
    // sceneMode: Cesium.SceneMode.SCENE3D,
    // mapProjection: new Cesium.GeographicProjection(),
    // globe: new Cesium.Globe(Cesium.Ellipsoid.WGS84),
    // orderIndependentTranslucency: true,
    creditContainer: document.createElement("div"),
    creditViewport: document.createElement("div"),
    // dataSources: new Cesium.DataSourceCollection(),
    shadows: true,
    terrainShadows: Cesium.ShadowMode.ENABLED,
    // mapMode2D: Cesium.MapMode2D.INFINITE_SCROLL,
    // projectionPicker: false,
    // blurActiveElementOnCanvasFocus: true,
    // requestRenderMode: false,
    // maximumRenderTimeChange: 0,
    // depthPlaneEllipsoidOffset: 0,
    msaaSamples: 4,
};
