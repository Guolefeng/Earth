<script setup lang="ts">
type IType =
    | "yellow"
    | "orange"
    | "red"
    | "green"
    | "blue"
    | "purple"
    | "liver";

const props = withDefaults(
    defineProps<{
        type?: IType; // 类型
        color?: string; // 颜色，如果同时设置了type与color, 则color颜色优先展示, 目前支持rgb, rgba, hex, hexa
    }>(),
    {
        type: "yellow",
        color: "",
    }
);

const typeColor = {
    yellow: "#e2ae23",
    orange: "#e27423",
    red: "#e22a23",
    green: "#23e2cc",
    blue: "#2399e2",
    purple: "#7e6aef",
    liver: "#c254d6",
};

const ex = {
    rgb: /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
    rgba: /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i,
    hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    hexA: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
};

const getHex = (s: string) => {
    // rgb to hex
    if (ex.rgb.test(s)) {
        return s.replace(
            /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/,
            function (color, r, g, b) {
                return (
                    "#" +
                    ("0" + parseInt(r, 10).toString(16)).slice(-2) +
                    ("0" + parseInt(g, 10).toString(16)).slice(-2) +
                    ("0" + parseInt(b, 10).toString(16)).slice(-2)
                );
            }
        );
        // rgba to hex, alpha is ignored
    } else if (ex.rgba.test(s)) {
        return s.replace(
            /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(1|0|(0\.[\d]+))\)$/,
            function (color, r, g, b, a) {
                return (
                    "#" +
                    ("0" + parseInt(r, 10).toString(16)).slice(-2) +
                    ("0" + parseInt(g, 10).toString(16)).slice(-2) +
                    ("0" + parseInt(b, 10).toString(16)).slice(-2)
                );
            }
        );
        // hex
    } else if (ex.hex.test(s)) {
        return s;
        // hexa, alpha is ignored
    } else if (ex.hexA.test(s)) {
        return s.slice(0, 7);
        // if color is invalid
    } else {
        return typeColor.yellow;
    }
};
</script>

<template>
    <span
        :style="{
            backgroundColor: `${color ? getHex(color) : typeColor[type]}80`,
            borderColor: color ? getHex(color) : typeColor[type],
        }"
        class="uitag"
    >
        <slot></slot>
    </span>
</template>

<style>
.uitag {
    display: inline-block;
    padding: 2px 14px;
    border: 1px solid;
    color: var(--font-color);
    font-size: var(--fs-12);
    border-radius: 4px;
}
</style>
