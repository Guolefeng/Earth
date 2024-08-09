<script lang="ts" setup>
withDefaults(
    defineProps<{
        hidden?: boolean;
        text?: string;
    }>(),
    {
        hidden: false,
        text: "LOADING",
    }
);
</script>

<template>
    <div :class="`uiloading-wrapper${hidden ? ' hidden' : ''}`">
        <div class="uiloading-container">
            <div class="uiloading">
                <span
                    v-for="(c, i) in text.split('')"
                    :key="i"
                    :style="{
                        '--i': i,
                    }"
                    >{{ c }}</span
                >
            </div>
        </div>
    </div>
</template>

<style>
.uiloading-wrapper {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    background: black;
}

.uiloading-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.uiloading {
    color: white;
    font-size: 1.875rem;
    letter-spacing: 0.1em;
    user-select: none;
}

.uiloading span {
    animation: blur 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
}

@keyframes blur {
    to {
        filter: blur(2px);
    }
}
.hidden {
    opacity: 0;
    pointer-events: none;
}
</style>
