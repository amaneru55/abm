import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

const BASE_HOST = '10.11.0.213:9090'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@components": path.resolve(__dirname, "src/components"),
        "@redux": path.resolve(__dirname, "src/redux"),
        "@stores": path.resolve(__dirname, 'src/stores'),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@apis": path.resolve(__dirname, "src/apis"),
        "@dAssets": path.resolve(__dirname, `src/${env.VITE_ASSETS_PATH}`),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@icons": path.resolve(__dirname, "src/icons"),
        "@data": path.resolve(__dirname, "src/data"),
        "@layout": path.resolve(__dirname, "src/layout"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@router": path.resolve(__dirname, "src/index"),
        "@themes": path.resolve(__dirname, "src/themes"),
        "@wasm": path.resolve(__dirname, "src/wasm"),
      },
    },
    server: {
      open: true,
      host: true,
      port: 9090,
      proxy: {
        '/api/inflet': {
          target: 'http://' + BASE_HOST,
          changeOrigin: true,
        },
      }
    },
  }
})
