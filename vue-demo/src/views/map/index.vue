<script setup lang="ts">
import { onMounted, ref } from "vue";
import CesiumMap from "@/map";

const mapContainer = ref();
const map = ref<CesiumMap>();
const cameraInfo = ref({
    lon: 0,
    lat: 0,
    h: 0,
});
const mapScale = ref(0);
const isRoaming = ref(false);

const onRoamToggle = () => {
    isRoaming.value = !isRoaming.value;
    if (isRoaming.value) {
        map.value?.roamControl.start();
    } else {
        map.value?.roamControl.end();
    }
};

onMounted(() => {
    const m = new CesiumMap();
    m.appendMapElementTo(mapContainer.value);
    m.ix.listenCameraMoveEnd((info: any, scale: number) => {
        cameraInfo.value = info;
        mapScale.value = scale;
    });
    m.ix.listenLeftClick((info: any) => {
        console.log("click info: ", info);
    });
    map.value = m;
});
</script>

<template>
    <div class="map" ref="mapContainer">
        <div class="footer">
            <span class="footer-item">
                经纬度：
                {{ cameraInfo.lon?.toFixed(2) }} ,
                {{ cameraInfo.lat?.toFixed(2) }}
            </span>
            <span class="footer-item">
                高度：{{ cameraInfo.h?.toFixed(2) }} m
            </span>
            <span class="footer-item">
                比例尺：{{ mapScale?.toFixed(0) || 0 }} m
            </span>
            <el-button @click="onRoamToggle">
                {{ isRoaming ? "结束" : "开启" }}漫游
            </el-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.map {
    width: 100%;
    height: 100%;
}
.footer {
    .fvc();
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    color: #fff;
    &-item {
        margin-right: 20px;
    }
}
</style>
