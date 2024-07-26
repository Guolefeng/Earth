import * as Cesium from "cesium";
import { getMapInstance } from "../instance";
import { ChessPiece } from "./ChessPiece";
import { ChessLayer } from "./ChessLayer";
import {
    ChessControl as ChessControlType,
    PieceData,
} from "../../types/chessTypes";

export class ChessControl implements ChessControlType {
    viewer: Cesium.Viewer;
    collection: Cesium.PrimitiveCollection;

    updateInterval = 0.1; // 图片序列每0.1s更新一张图片
    tick: () => void;
    tween: () => void;
    interval: any = null;

    layers: { [id: string]: ChessLayer } = {};
    pieceBucket: { [pieceId: string]: ChessPiece } = {};

    constructor() {
        this.tick = this._tick.bind(this);
        this.tween = this._tween.bind(this);
        this.interval = setInterval(this.tween, this.updateInterval * 1000);
        this.viewer = getMapInstance();
        this.collection = new Cesium.PrimitiveCollection();
        this.viewer.scene.primitives.add(this.collection);

        const piece1 = this.addPiece(
            {
                id: "test",
                symbol: ["/Cesium/Assets/Images/ion-credit.png"],
                lonlat: [116.397428, 39.90923],
                name: "test",
                data: {},
            },
            "testLayer"
        );
        const effect1 = piece1.addEffect("producing");

        const piece2 = this.addPiece(
            {
                id: "test2",
                symbol: ["/Cesium/Assets/Images/ion-credit.png"],
                lonlat: [125.397428, 39.90923],
                name: "test",
                data: {},
            },
            "testLayer"
        );
        const effect2 = piece2.addEffect("fix");
        const piece3 = this.addPiece(
            {
                id: "test3",
                symbol: ["/Cesium/Assets/Images/ion-credit.png"],
                lonlat: [130.397428, 39.90923],
                name: "test",
                data: {},
            },
            "testLayer"
        );
        const effect3 = piece3.addEffect("explosion");
    }

    addPiece(pieceData: PieceData, layerId: string) {
        // 添加layer
        if (!this.getLayer(layerId)) {
            this.addLayer(layerId);
        }
        // layer添加piece
        const newPiece = this.getLayer(layerId).addPiece(pieceData);
        // 添加pieceBucket索引
        this.pieceBucket[pieceData.id] = newPiece;
        return newPiece;
    }
    addLayer(layerId: string) {
        // 添加layer索引
        const newLayer = new ChessLayer(layerId, this.viewer.scene);
        this.layers[layerId] = newLayer;
        this.collection.add(newLayer.collection);
        return newLayer;
    }
    removeLayer(layerId: string) {
        const layer = this.getLayer(layerId);
        if (!layer) {
            return;
        }
        this.collection.remove(layer.collection);
        // 移除pieceBucket索引
        Object.keys(layer.pieceBucket).forEach((pieceId) => {
            delete layer.pieceBucket[pieceId];
        });
        // 移除layer 索引
        delete this.layers[layerId];
        // layer销毁
        layer.destroy();
    }
    showLayer(layerId: string) {
        this.getLayer(layerId).showLayer();
    }
    hideLayer(layerId: string) {
        this.getLayer(layerId).hideLayer();
    }

    getLayer(layerId: string) {
        return this.layers[layerId];
    }

    getPieces() {
        return Object.values(this.pieceBucket);
    }

    /**
     * 逐帧tick
     */
    _tick() {
        for (const pieceId in this.pieceBucket) {
            this.pieceBucket[pieceId].tick();
        }
    }

    /**
     * 动态序列播放
     */
    _tween() {
        for (const pieceId in this.pieceBucket) {
            const piece = this.pieceBucket[pieceId];
            if (piece.params.symbol.length > 1) {
                piece.changeSymbol();
            }
            piece.tween();
        }
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        if (this.collection && !this.collection.isDestroyed()) {
            this.collection.destroy();
            this.collection = null;
        }
        for (const layerId in this.layers) {
            this.layers[layerId].destroy();
        }
    }
}
