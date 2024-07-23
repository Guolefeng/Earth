import * as CesiumTemp from "cesium/Cesium";

let Cesium = CesiumTemp;

class WallDiffuseMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._time = new Date().getTime();
        this.color = options.color;
        this.duration = options.duration || 1000;
    }

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return Cesium.Material.WallDiffuseMaterialType;
    }

    getValue(time, res) {
        let result = res;
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(
            this._color,
            time,
            Cesium.Color.RED,
            result.color
        );
        result.time =
            ((new Date().getTime() - this._time) % this.duration) /
            this.duration;
        return result;
    }

    equals(other) {
        return (
            this === other ||
            (other instanceof WallDiffuseMaterialProperty &&
                Cesium.Property.equals(this._color, other._color))
        );
    }
}

Object.defineProperties(WallDiffuseMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor("color"),
    duration: Cesium.createPropertyDescriptor("duration"),
});

Cesium.WallDiffuseMaterialProperty = WallDiffuseMaterialProperty;
Cesium.Material.WallDiffuseMaterialProperty = "WallDiffuseMaterialProperty";
Cesium.Material.WallDiffuseMaterialType = "WallDiffuseMaterialType";
Cesium.Material.WallDiffuseMaterialSource = `
    czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        int d = int(direction);
        float p = 1.0 / count;
        if (d == 1) { // 向上
            material.alpha = color.a * (1.0 - mod(st.t - time, p) / p);
        } else if (d == 2) { // 向下
            material.alpha = color.a * mod(st.t + time, p) / p;
        } else if (d == 3) { // 水平逆时针
            material.alpha = color.a * mod(st.s + time, p) / p;
        } else if (d == 4) { // 水平顺时针
            // material.alpha = color.a * (1.0 - fract(st.s - time));
            material.alpha = color.a * (1.0 - mod(st.s - time, p) / p);
        }
        material.diffuse = color.rgb;
        // material.emission = color.rgb * 0.5;
        // material.specular = 0.5;
        return material;
    }     
`;

Cesium.Material._materialCache.addMaterial(
    Cesium.Material.WallDiffuseMaterialType,
    {
        fabric: {
            type: Cesium.Material.WallDiffuseMaterialType,
            uniforms: {
                color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                time: 0,
                direction: 2,
                count: 3,
            },
            source: Cesium.Material.WallDiffuseMaterialSource,
        },
        translucent: function (material) {
            return true;
        },
    }
);

export default WallDiffuseMaterialProperty;
