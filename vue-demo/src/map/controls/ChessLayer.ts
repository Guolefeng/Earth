// import {ChessLayer as ChessLayerType, PieceData} from '../../types/chessTypes';
import { ChessPiece } from "./ChessPiece";
import * as Cesium from "cesium";

export class ChessLayer implements ChessLayerType {
    scene: Cesium.Scene;
    _hiddenPieces: { [pieceId: string]: boolean } = {};
    pieceBucket: { [pieceId: string]: ChessPiece } = {};
    visible: boolean = true;
    collection: Cesium.PrimitiveCollection;
    layerId: string;

    constructor(layerId: string, scene: Cesium.Scene) {
        this.layerId = layerId;
        this.scene = scene;
        this.collection = new Cesium.PrimitiveCollection();
    }

    addPiece(pieceData: PieceData) {
        // 添加索引
        const newPiece = new ChessPiece(pieceData, this.scene);
        this.pieceBucket[pieceData.id] = newPiece;
        newPiece.layerId = this.layerId;
        newPiece.layer = this;
        // 添加到场景里
        newPiece.append();
        this.collection.add(newPiece.collection);
        return newPiece;
    }

    removePiece(pieceOrId: ChessPiece | string) {
        let piece;
        if (typeof pieceOrId === "string") {
            piece = this.pieceBucket[pieceOrId];
        } else {
            piece = pieceOrId;
        }

        piece.layer = null;
        piece.layerId = null;
        // 从场景里移除
        this.collection.remove(piece.collection);
        // 移除pieceBucket索引
        delete this.pieceBucket[piece.params.id];

        piece.detach();
    }

    showPiece(pieceOrId: ChessPiece | string) {
        let piece;
        if (typeof pieceOrId === "string") {
            piece = this.pieceBucket[pieceOrId];
        } else {
            piece = pieceOrId;
        }
        if (!this._hiddenPieces[piece.params.id]) {
            return;
        }
        piece.show();
        delete this._hiddenPieces[piece.params.id];
    }

    hidePiece(pieceOrId: ChessPiece | string) {
        let piece;
        if (typeof pieceOrId === "string") {
            piece = this.pieceBucket[pieceOrId];
        } else {
            piece = pieceOrId;
        }
        if (this._hiddenPieces[piece.params.id]) {
            return;
        }
        piece.hide();
        this._hiddenPieces[piece.params.id] = true;
    }

    showLayer() {
        this.visible = true;
        this.collection.show = true;
    }
    hideLayer() {
        this.visible = false;
        this.collection.show = false;
    }

    clearPieces() {
        this.collection.removeAll();
        this._hiddenPieces = {};
        this.pieceBucket = {};
    }

    destroy() {
        if (this.collection && !this.collection.isDestroyed()) {
            this.collection.destroy();
        }

        for (const pieceId in this.pieceBucket) {
            this.pieceBucket[pieceId].destroy();
        }

        this._hiddenPieces = null;
        this.pieceBucket = null;
    }
}
