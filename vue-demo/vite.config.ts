import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: any) => defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        viteCompression(),
    ],
    base: "/",
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${resolve(
                        'src/styles/index.less'
                    )}";`,
                },
                javascriptEnabled: true,
            },
        },
    },
    // 服务配置
    server: {
        host: '0.0.0.0',
        port: 5010,
        open: true,
        proxy: {
            '/api': {
                target: loadEnv(mode, process.cwd()).VITE_APP_BASE_DOMIAN,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
    // 生产环境
    build: {
        minify: 'terser', // 打包结果是否minify
        target: 'es2015',
        // 指定输出路径
        assetsDir: './',
        // 指定输出文件路径
        outDir: "build",
        // 代码压缩配置
        terserOptions: {
            sourceMap: true,
            // 生产环境移除console
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        chunkSizeWarningLimit: 1500
    },
})
