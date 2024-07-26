import * as Cesium from 'cesium';
import {ChessLayer as ChessLayerType, PieceData} from '../../types/chessTypes';
import {drawProducing, drawFix, drawExplosion} from './effectTypes';
import {Addon} from '@/util/Mountable';

const stateAnimateList: {
    [key: string]: Boolean;
} = {
    fix: true,
    explosion: true
};
const stateHandler: {
    [key: string]: Function;
} = {
    producing: (canvas: HTMLCanvasElement, data: any) =>
        drawProducing(canvas, data.producing || 0),
    fix: (imgUrl: string, data: any) => drawFix(imgUrl || ''),
    explosion: (imgUrl: string, data: any) => drawExplosion(imgUrl || '')

    // todo 更多效果
};

export class Effect implements Addon {
    id: string; // id代表效果类型
    position: Cesium.Cartesian3;
    collection: Cesium.PrimitiveCollection;
    billboardCollection: Cesium.BillboardCollection;
    effectImg: string | HTMLCanvasElement = '';
    effect: Cesium.Billboard;
    height = 256 * 4;
    width = 256 * 4;
    pieceData: PieceData;
    constructor(
        id: string,
        scene: Cesium.Scene,
        position: Cesium.Cartesian3,
        pieceData: PieceData
    ) {
        this.id = id || 'effect';
        this.position = position;
        this.pieceData = pieceData;
        this.collection = new Cesium.PrimitiveCollection();
        this.billboardCollection = new Cesium.BillboardCollection({
            scene: scene
        });
        this.collection.add(this.billboardCollection);
        // todo 做动画序列

        this.createImgOrCanvas();
        this.handleImg();
        console.log(this.effectImg);

        this.effect = this.createEffect();
    }

    createImgOrCanvas() {
        if (!stateAnimateList[this.id]) {
            this.effectImg = document.createElement('canvas');
            this.effectImg.width = this.width;
            this.effectImg.height = this.height;
        } else {
            this.effectImg = '';
        }
    }

    handleImg() {
        // 有handler 的话就执行
        if (stateHandler[this.id]) {
            this.effectImg = stateHandler[this.id](
                this.effectImg,
                this.pieceData.data
            );
        }
    }

    createEffect() {
        return this.billboardCollection.add({
            show: true, // default
            image: this.effectImg,
            position: this.position,
            width: this.width,
            height: this.height,
            pixelOffset: new Cesium.Cartesian2(0, 0), // default: (0, 0)
            eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
            verticalOrigin: Cesium.VerticalOrigin.CENTER, // default: CENTER
            scale: 1.0, // default: 1.0
            color: Cesium.Color.WHITE, // default: WHITE
            rotation: Cesium.Math.TWO_PI, // default: 0.0
            alignedAxis: Cesium.Cartesian3.ZERO, // default
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.1),
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
            // disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
    }

    /**
     *
     * @param percent 一些影响canvas绘制和进度的内容，由于图像会有缓存，必须传一个动态参数，表示跟之前不一样的话cesium才会重新绘制
     * 不能tick逐帧update，会闪屏，只能参数更新时绘制
     *
     */
    updateEffect(percent: number | string = '') {
        this.handleImg();
        this.effect.setImage(
            this.id +
                '_' +
                (typeof this.effectImg == 'string' ? this.effectImg : percent),
            this.effectImg
        );
    }

    tween() {
        if (stateAnimateList[this.id]) {
            this.updateEffect();
        }
    }

    destroy() {
        if (
            this.billboardCollection &&
            !this.billboardCollection.isDestroyed()
        ) {
            this.billboardCollection.destroy();
        }
        if (this.collection && !this.collection.isDestroyed()) {
            this.collection.destroy();
        }
        this.collection = null;
        this.billboardCollection = null;
    }
}
