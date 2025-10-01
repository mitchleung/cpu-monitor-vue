import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
