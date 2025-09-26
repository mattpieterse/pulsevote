import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {defineConfig, loadEnv} from "vite"
import fs from 'fs';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            react(),
            tailwindcss()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            https: {
                key: fs.readFileSync('ssl/privatekey.pem'),
                cert: fs.readFileSync('ssl/certificate.pem'),
            },
            proxy: {
                "/author": {
                    target: env.VITE_API_URI,
                    changeOrigin: true,
                    secure: false,
                },
                "/api": {
                    target: env.VITE_API_URI,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
})