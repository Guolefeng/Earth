import * as CesiumTemp from 'cesium/Cesium'

let Cesium = CesiumTemp

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

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.time = ((new Date().getTime() - this._time) % this.duration) / this.duration;
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof WallDiffuseMaterialProperty &&
                Cesium.Property.equals(this._color, other._color))
        )
    }
}

Object.defineProperties(WallDiffuseMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    duration: Cesium.createPropertyDescriptor('duration'),
})

Cesium.WallDiffuseMaterialProperty = WallDiffuseMaterialProperty;
Cesium.Material.WallDiffuseMaterialProperty = 'WallDiffuseMaterialProperty';
Cesium.Material.WallDiffuseMaterialType = 'WallDiffuseMaterialType';
Cesium.Material.WallDiffuseMaterialSource = `
    czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        if (direction == 1.0) { // 向上
            material.alpha = color.a * (1.0 - fract(st.t - time)) * 0.8;
        } else if (direction == 2.0) { // 向下
            material.alpha = color.a * (fract(st.t + time));
        } else if (direction == 3.0) { // 水平逆时针
            material.alpha = color.a * (fract(st.s + time));
        } else if (direction == 4.0) { // 水平顺时针
            material.alpha = color.a * (1.0 - fract(st.s - time));
        }
        material.diffuse = color.rgb;
        return material;
    }     
`

Cesium.Material._materialCache.addMaterial(Cesium.Material.WallDiffuseMaterialType, {
    fabric: {
        type: Cesium.Material.WallDiffuseMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            time: 0,
            direction: 2.0,
        },
        source: Cesium.Material.WallDiffuseMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})

export default WallDiffuseMaterialProperty;