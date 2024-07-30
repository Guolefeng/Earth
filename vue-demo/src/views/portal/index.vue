<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import userComponent from "@/components/userss.vue";
import defaultImg from "@/assets/images/defaultImg.png";
import hubuser from "@/assets/images/hubuser.png";
import hubconfig from "@/assets/images/hubconfig.png";
import hubdoc from "@/assets/images/hubdoc.png";

const router = useRouter();
const hasToken = ref(false);
const menus = [
    {
        name: "home",
        img: hubdoc,
        path: "/home",
        description: "",
    },
    {
        name: "test1",
        img: hubconfig,
        path: "/test1",
        description: "",
    },
    {
        name: "test2",
        img: hubconfig,
        path: "/test2",
        description: "",
    },
    {
        name: "test3",
        img: hubuser,
        path: "/test3",
        description: "",
    },
    {
        name: "map",
        path: "/map",
        description: "",
    },
];

const inputName = ref("");

const onMenuClick = (item: any) => {
    if (!item) {
        return;
    }
    if (hasToken) {
        if (item.path) {
            window.location.href = item.path;
        } else {
            ElMessage.warning("应用未配置跳转链接");
        }
    } else {
        router.push({ path: "/login" });
    }
};
</script>

<template>
    <div class="appcenter">
        <div class="appcenter-header"><userComponent /></div>
        <div class="appcenter-filter">
            <el-input
                v-model="inputName"
                placeholder="请输入应用名称"
                class="appcenter-filter-input"
            >
                <template #prepend>
                    <el-icon :size="20">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="appcenter-cont">
            <div class="list">
                <div
                    v-for="item in menus.filter((m: any) => m.name?.includes(inputName))"
                    class="appcenter-item"
                    @click="() => onMenuClick(item)"
                >
                    <img
                        :src="item.img || defaultImg"
                        class="appcenter-item-img"
                    />
                    <div class="appcenter-item-name">
                        {{ item.name }}
                    </div>
                    <div v-if="item.description" class="appcenter-item-desc">
                        {{ item.description }}
                    </div>
                </div>
                <el-empty v-if="!menus.length" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.appcenter {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    background-image: url("@/assets/images/login-bj.png");
    background-size: cover;
    background-repeat: no-repeat;
    &-header {
        .fed();
        padding: 0 20px;
        height: 60px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
        z-index: 1;
    }
    &-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 24px 0;
        &-input {
            width: 560px;
            height: 48px;
        }
    }
    &-cont {
        height: calc(100% - 156px);
        padding: 0px 60px 30px;
        overflow: auto;
        .filter {
            display: flex;
            align-items: center;
            gap: 20px;
            &-item {
                padding: 4px 16px;
                border-radius: 2px;
                opacity: 1;
                background: #ffffff;
                box-sizing: border-box;
                border: 1px solid #d5d6da;
                font-family: PingFang SC;
                font-size: 16px;
                font-weight: normal;
                line-height: 24px;
                display: flex;
                align-items: center;
                letter-spacing: 0em;
                color: #62666e;
                cursor: pointer;
            }
            &-selected {
                color: @theme-color;
                border-color: @theme-color;
            }
        }
        .list {
            margin-top: 20px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
    }
    &-item {
        position: relative;
        width: 16.4vw;
        padding-bottom: 16px;
        background: #f9fafa;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        cursor: pointer;
        &-img {
            margin: 16px 16px 0;
            width: calc(100% - 32px);
            height: 150px;
            border-radius: 8px;
            object-fit: contain;
        }
        &-name {
            position: relative;
            padding: 15px 20px;
            font-family: Microsoft YaHei;
            font-size: 14px;
            font-weight: bold;
            line-height: 14px;
            text-align: center;
            letter-spacing: 0px;
            color: #1a1c21;
        }
        &-desc {
            padding: 5px 20px 20px 20px;
            font-family: Microsoft YaHei;
            font-size: 12px;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: 0px;
            color: #3d4265;
            text-align: justify;
        }
    }
    &-item:hover {
        box-shadow: 0px 2px 10px 5px #8f95a0;
    }
}
</style>
<style lang="less">
.appcenter-filter-input {
    width: 560px;
    height: 48px;
}
</style>
