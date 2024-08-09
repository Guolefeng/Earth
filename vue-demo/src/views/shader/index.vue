<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import Experience from "./experience";
import DistortSphere from "./distortSphere";

const spere = ref();
const spereLoading = ref(true);

const imgGallery = ref();
const imgLoading = ref(true);

onMounted(() => {
    spere.value = new DistortSphere("#shpere", {
        onReady: () => {
            spereLoading.value = false;
        },
    });

    imgGallery.value = new Experience("#img", {
        onReady: () => {
            imgLoading.value = false;
        },
    });
});

onUnmounted(() => {
    spere.value?.dispose();
    imgGallery.value?.dispose();
});
</script>

<template>
    <main class="box">
        <div id="shpere" class="scene">
            <ui-textloading :hidden="!spereLoading" />
        </div>
        <div id="img" class="scene">
            <div class="gallery">
                <img
                    class="gallery-item"
                    src="https://s2.loli.net/2023/09/12/ySLGYKhVqH3BtN4.jpg"
                    crossorigin="anonymous"
                    alt=""
                />
                <img
                    class="gallery-item"
                    src="https://s2.loli.net/2023/09/12/BhmSdM2XA9yYftK.jpg"
                    crossorigin="anonymous"
                    alt=""
                />
                <img
                    class="gallery-item"
                    src="https://s2.loli.net/2023/09/12/CqIlJd1XO9rh68e.jpg"
                    crossorigin="anonymous"
                    alt=""
                />
                <img
                    class="gallery-item"
                    src="https://s2.loli.net/2023/09/12/RzwqhImAV9H57xs.jpg"
                    crossorigin="anonymous"
                    alt=""
                />
                <img
                    class="gallery-item"
                    src="https://s2.loli.net/2023/09/12/p3FME9qcUAnJixm.jpg"
                    crossorigin="anonymous"
                    alt=""
                />
            </div>
            <ui-textloading :hidden="!imgLoading" />
        </div>
    </main>
</template>

<style scoped>
.box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
.scene {
    position: relative;
    width: 20vw;
    height: 20vw;
    border-radius: 4px;
    overflow: hidden;
    background: #000;
}
.gallery {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.gallery .gallery-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>
<style>
.lil-gui {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--title-background-color);
}
.lil-gui.root > .title {
    display: none;
}
</style>
