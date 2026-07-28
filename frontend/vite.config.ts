import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "robots.txt"],
            manifest: {
                name: "UniforMarktplace",
                short_name: "UniforMarktplace",
                description: "Compre, venda e doe materiais acadêmicos na sua universidade.",
                theme_color: "#0A1F44",
                background_color: "#0A1F44",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
            },
        }),
    ],
});