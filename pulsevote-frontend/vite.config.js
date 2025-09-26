import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// --- Exported

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
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
});
