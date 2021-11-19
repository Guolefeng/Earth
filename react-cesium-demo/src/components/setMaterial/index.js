import { useEffect } from 'react'
import './index.css'
import { Button } from 'antd'
import BuildPng from '../../assets/build.png'

const AddEntites = () => {
    const { viewer, Cesium } = window
    let entity
    let polyline

    useEffect(() => {
        // 通过Entity添加形状
        entity = viewer.entities.add({
            name: 'red box',
            position: new Cesium.Cartesian3.fromDegrees(116.39, 39.91, 15000.0),
            box: {
                dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK,
            }
        })
        
        polyline = viewer.entities.add({
            polyline : {
                positions : Cesium.Cartesian3.fromDegreesArray([116.39, 35.91, 100.00, 42.91]),
                width : 10,
                material : Cesium.Color.BURLYWOOD 
            }
        });
        
        viewer.flyTo(viewer.entities)
        return () => {
            viewer.entities.remove(entity)
            viewer.entities.remove(polyline)
        }
    }, [])

    const onColorChange = () => {
        if (entity) {
            // 颜色是最常见的材质，可以将几何形状修改为不同的纯色，达到区分的目的，也可以完成比如鼠标移动到某个建筑，建筑变色之类;使用比较简单,只需要赋值颜色就行了
            entity.box.material = Cesium.Color.ALICEBLUE.withAlpha(0.5)
        }
    }

    const onImageChange = () => {
        if (entity) {
            entity.box.material = new Cesium.ImageMaterialProperty({
                image: BuildPng,
                // color: Cesium.Color.BLUE,
                // repeat: new Cesium.Cartesian2(4, 4),
                // transparent: true,
            });
        }
    }

    const onCheckerboardChange = () => {
        if (entity) {
            entity.box.material = new Cesium.CheckerboardMaterialProperty({
                evenColor: Cesium.Color.WHITE,
                oddColor: Cesium.Color.BLACK,
                repeat: new Cesium.Cartesian2(4, 4),
            });
        }
    }

    const onStripeChange = () => {
        if (entity) {
            entity.box.material = new Cesium.StripeMaterialProperty({
                evenColor: Cesium.Color.WHITE,
                oddColor: Cesium.Color.BLACK,
                repeat: 32,
                offset:20,
                orientation: Cesium.StripeOrientation.VERTICAL,
            });
        }
    }

    const onGridChange = () => {
        if (entity) {
            entity.box.material = new Cesium.GridMaterialProperty({
                color : Cesium.Color.AZURE,
                cellAlpha : 0.2,
                lineCount : new Cesium.Cartesian2(8, 8),
                lineThickness : new Cesium.Cartesian2(1.0, 3.0)
            });
        }
    }

    const onPolylineGlowChange = () => {
        if (polyline) {
            polyline.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                glowPower : 0.5,
                color : Cesium.Color.BLUE
            });
        }
    }

    const onPolylineOutlineChange = () => {
        if (polyline) {
            polyline.polyline.material = new Cesium.PolylineOutlineMaterialProperty({
                color : Cesium.Color.ORANGE,
                outlineWidth : 2,
                outlineColor : Cesium.Color.BLACK
            });
        }
    }

    return <div className='sm'>
        <Button onClick={onColorChange}>颜色材质</Button>
        <Button onClick={onImageChange}>图片材质</Button>
        <Button onClick={onCheckerboardChange}>棋盘纹理</Button>
        <Button onClick={onStripeChange}>条纹纹理</Button>
        <Button onClick={onGridChange}>网格纹理</Button>
        <Button onClick={onPolylineGlowChange}>线条发光纹理</Button>
        <Button onClick={onPolylineOutlineChange}>线条边框纹理</Button>
    </div>
}

export default AddEntites