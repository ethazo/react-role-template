import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        // 本地开发统一走代理：把 baseURL 前缀转发到真实后端，规避浏览器 CORS
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_API_PROXY_TARGET,
          changeOrigin: true,
        },
      },
    },
  }
})
