import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// --- Exported

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/author": {
                    target: env.VITE_API_URI,
                    changeOrigin: true,
                },
                "/api": {
                    target: env.VITE_API_URI,
                    changeOrigin: true,
                },
            },
        },
    };
});
