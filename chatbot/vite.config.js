import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        bot: resolve(__dirname, "src/bot.js"),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "bot" ? "bot.js" : "assets/[name]-[hash].js",
      },
    },
  },
});
