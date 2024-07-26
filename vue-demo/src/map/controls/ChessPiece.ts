import * as Cesium from "cesium";
import { Mountable } from "@/utils/Mountable";
import { ChessPiece as ChessPieceType, PieceData } from "../instance";
import { ChessLayer } from "./ChessLayer";
import { Effect } from "../Effects/Effect";

export class ChessPiece extends Mountable implements ChessPieceType {
    scene: Cesium.Scene;
    params: PieceData;
    collection: Cesium.PrimitiveCollection;
    billboardCollection: Cesium.BillboardCollection;
    piece: Cesium.Billboard;
    position: Cesium.Cartesian3;
    symbolIndex: number = 0; // 图片序列索引
    height = 256;
    width = 256;
    layerId: string;
    layer: ChessLayer;

    constructor(chessData: PieceData, scene: Cesium.Scene) {
        super();
        this.params = chessData;
        this.scene = scene;

        this.collection = new Cesium.PrimitiveCollection();

        this.billboardCollection = new Cesium.BillboardCollection({
            scene: this.scene,
        });

        this.position = Cesium.Cartesian3.fromDegrees(
            chessData.lonlat[0],
            chessData.lonlat[1]
        );
        this.piece = this.createChess();
    }
    createChess() {
        return this.billboardCollection.add({
            show: true, // default
            image: this.params.symbol[this.symbolIndex],
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
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
    }

    /**图片序列切换方法 */
    changeSymbol() {
        if (this.symbolIndex === this.params.symbol.length - 1) {
            this.symbolIndex = 0;
        } else {
            this.symbolIndex++;
        }
        // this.piece.image = this.params.symbol[this.symbolIndex];
        this.piece.setImage(
            this.params.symbol[this.symbolIndex],
            this.params.symbol[this.symbolIndex]
        );
    }

    tween() {
        this.getAddonByClass(Effect).forEach((effect: Effect) => {
            effect.tween();
        });
    }

    addEffect(id: string) {
        const effect = new Effect(id, this.scene, this.position, this.params);
        this.addAddon(effect);
        this.collection.add(effect.collection);
        return effect;
    }
    removeEffect(id: string) {
        const effect = this.getAddonById(id);
        if (effect) {
            this.removeAddon(effect);
            this.collection.remove(effect.collection);
        }
    }

    append() {
        this.billboardCollection.add(this.piece);
        this.collection.add(this.billboardCollection);
    }
    detach() {
        this.billboardCollection.destroy();
        this.collection.removeAll();
        this.clearAddons();
    }

    show() {
        this.collection.show = true;
        // todo 其他不在collection里的内容的显示
    }

    hide() {
        this.collection.show = false;
        // todo 其他不在collection里的内容的隐藏
    }
    tick() {}

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
        this.clearAddons();

        this.piece = null;
    }
}
