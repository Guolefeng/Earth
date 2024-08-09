<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import Experience from "./experience";

const scene = ref();

onMounted(() => {
    scene.value = new Experience("#sketch");
});

onUnmounted(() => {
    scene.value?.dispose();
});
</script>

<template>
    <main class="box">
        <div id="sketch" class="scene"></div>
        <div class="loader-screen">
            <div class="loading-container">
                <div class="loading">
                    <span style="--i: 0">L</span>
                    <span style="--i: 1">O</span>
                    <span style="--i: 2">A</span>
                    <span style="--i: 3">D</span>
                    <span style="--i: 4">I</span>
                    <span style="--i: 5">N</span>
                    <span style="--i: 6">G</span>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.box {
    position: relative;
    width: 100%;
    height: 100%;
}
.scene {
    width: 20vw;
    height: 20vw;
}
.loader-screen {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    background: black;
}

.loading-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.loading {
    color: white;
    font-size: 1.875rem;
    letter-spacing: 0.1em;
}

.loading span {
    animation: blur 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
}

@keyframes blur {
    to {
        filter: blur(2px);
    }
}
.hollow {
    opacity: 0;
    pointer-events: none;
}
</style>
