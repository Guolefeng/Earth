import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { set3dtilesHeight, update3dtilesMaxtrix } from "../common";

export interface TilesParams {
    id: string;
    url: string;
    rgb?: string;
    lightShader?: boolean;
}

export class TilesControl {
    collection: Cesium.PrimitiveCollection;
    viewer: Cesium.Viewer;
    tiles: { [key: string]: Cesium.Cesium3DTileset } = {};

    constructor() {
        this.viewer = getMapInstance();
        this.add(
            {
                id: "testtiles",
                url: "http://data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
                rgb: "rgb(51, 153, 255)",
                lightShader: true,
            },
            (tilesets) => {
                // 设置相机视角
                this.viewer.flyTo(tilesets);
            }
        );
    }

    add(params: TilesParams, cb?: (tilesets: Cesium.Cesium3DTileset) => void) {
        const {
            id,
            url,
            rgb = "rgb(51, 153, 255)",
            lightShader = false,
        } = params;
        Cesium.Cesium3DTileset.fromUrl(url)
            .then((res) => {
                // 加载建筑数据，赋给变量tilesets
                const tilesets = this.viewer.scene.primitives.add(res);
                tilesets.style = new Cesium.Cesium3DTileStyle({
                    color: {
                        conditions: [["true", `color('${rgb}',1)`]],
                    },
                });
                if (lightShader) {
                    // 将定义好的着色器作用域建筑tilesets
                    tilesets.customShader = this.createLightShader();
                }
                // 修改模型高度
                set3dtilesHeight(tilesets, -40);

                // 数据加载完成回调函数
                cb?.(tilesets);
            })
            .catch((err) => {
                console.log("load 3dtiles error: ", err);
            });
    }

    createLightShader() {
        return new Cesium.CustomShader({
            // 不考虑光照模型
            lightingModel: Cesium.LightingModel.UNLIT,
            // 修改片元着色器
            fragmentShaderText: `
                void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                    float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
                    float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange) 默认是 0-60米
                    float _glowRange = 600.0; // 光环的移动范围(高度)
                    float vtxf_height = fsInput.attributes.positionMC.z - _baseHeight;
                    float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                    float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
                    material.diffuse *= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
                    float vtxf_a13 = fract(czm_frameNumber / 360.0);
                    float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
                    vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
                    float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
                    material.diffuse += material.diffuse * (1.0 - vtxf_diff);
                }
            `,
        });
    }
}
