// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
var __vite_injected_original_dirname = "/home/project";
var copyPublicPlugin = () => ({
  name: "copy-public-safe",
  closeBundle() {
    const publicDir = "public";
    const outDir = "dist";
    const copyRecursive = (src, dest) => {
      try {
        const entries = readdirSync(src);
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true });
        }
        for (const entry of entries) {
          if (entry.includes(" copy")) continue;
          const srcPath = join(src, entry);
          const destPath = join(dest, entry);
          try {
            const stat = statSync(srcPath);
            if (stat.isDirectory()) {
              copyRecursive(srcPath, destPath);
            } else {
              copyFileSync(srcPath, destPath);
            }
          } catch (err) {
            console.warn(`Skipping ${entry}: ${err}`);
          }
        }
      } catch (err) {
        console.error("Error copying public files:", err);
      }
    };
    copyRecursive(publicDir, outDir);
  }
});
var vite_config_default = defineConfig({
  plugins: [react(), copyPublicPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    copyPublicDir: false
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNvcHlGaWxlU3luYywgcmVhZGRpclN5bmMsIHN0YXRTeW5jLCBta2RpclN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5cbmNvbnN0IGNvcHlQdWJsaWNQbHVnaW4gPSAoKSA9PiAoe1xuICBuYW1lOiAnY29weS1wdWJsaWMtc2FmZScsXG4gIGNsb3NlQnVuZGxlKCkge1xuICAgIGNvbnN0IHB1YmxpY0RpciA9ICdwdWJsaWMnO1xuICAgIGNvbnN0IG91dERpciA9ICdkaXN0JztcblxuICAgIGNvbnN0IGNvcHlSZWN1cnNpdmUgPSAoc3JjOiBzdHJpbmcsIGRlc3Q6IHN0cmluZykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKHNyYyk7XG5cbiAgICAgICAgaWYgKCFleGlzdHNTeW5jKGRlc3QpKSB7XG4gICAgICAgICAgbWtkaXJTeW5jKGRlc3QsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgaWYgKGVudHJ5LmluY2x1ZGVzKCcgY29weScpKSBjb250aW51ZTtcblxuICAgICAgICAgIGNvbnN0IHNyY1BhdGggPSBqb2luKHNyYywgZW50cnkpO1xuICAgICAgICAgIGNvbnN0IGRlc3RQYXRoID0gam9pbihkZXN0LCBlbnRyeSk7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IHN0YXRTeW5jKHNyY1BhdGgpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICBjb3B5UmVjdXJzaXZlKHNyY1BhdGgsIGRlc3RQYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvcHlGaWxlU3luYyhzcmNQYXRoLCBkZXN0UGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFNraXBwaW5nICR7ZW50cnl9OiAke2Vycn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb3B5aW5nIHB1YmxpYyBmaWxlczonLCBlcnIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb3B5UmVjdXJzaXZlKHB1YmxpY0Rpciwgb3V0RGlyKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgY29weVB1YmxpY1BsdWdpbigpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY29weVB1YmxpY0RpcjogZmFsc2VcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIHBvcnQ6IDUxNzMsXG4gICAgc3RyaWN0UG9ydDogZmFsc2VcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxjQUFjLGFBQWEsVUFBVSxXQUFXLGtCQUFrQjtBQUMzRSxTQUFTLFlBQVk7QUFKckIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxtQkFBbUIsT0FBTztBQUFBLEVBQzlCLE1BQU07QUFBQSxFQUNOLGNBQWM7QUFDWixVQUFNLFlBQVk7QUFDbEIsVUFBTSxTQUFTO0FBRWYsVUFBTSxnQkFBZ0IsQ0FBQyxLQUFhLFNBQWlCO0FBQ25ELFVBQUk7QUFDRixjQUFNLFVBQVUsWUFBWSxHQUFHO0FBRS9CLFlBQUksQ0FBQyxXQUFXLElBQUksR0FBRztBQUNyQixvQkFBVSxNQUFNLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxRQUNyQztBQUVBLG1CQUFXLFNBQVMsU0FBUztBQUMzQixjQUFJLE1BQU0sU0FBUyxPQUFPLEVBQUc7QUFFN0IsZ0JBQU0sVUFBVSxLQUFLLEtBQUssS0FBSztBQUMvQixnQkFBTSxXQUFXLEtBQUssTUFBTSxLQUFLO0FBRWpDLGNBQUk7QUFDRixrQkFBTSxPQUFPLFNBQVMsT0FBTztBQUM3QixnQkFBSSxLQUFLLFlBQVksR0FBRztBQUN0Qiw0QkFBYyxTQUFTLFFBQVE7QUFBQSxZQUNqQyxPQUFPO0FBQ0wsMkJBQWEsU0FBUyxRQUFRO0FBQUEsWUFDaEM7QUFBQSxVQUNGLFNBQVMsS0FBSztBQUNaLG9CQUFRLEtBQUssWUFBWSxLQUFLLEtBQUssR0FBRyxFQUFFO0FBQUEsVUFDMUM7QUFBQSxRQUNGO0FBQUEsTUFDRixTQUFTLEtBQUs7QUFDWixnQkFBUSxNQUFNLCtCQUErQixHQUFHO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBRUEsa0JBQWMsV0FBVyxNQUFNO0FBQUEsRUFDakM7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUM7QUFBQSxFQUNyQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsRUFDakI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
