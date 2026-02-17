// vite.config.ts
import { defineConfig } from "file:///C:/Users/USER/OneDrive/Documenten/HolyGhost%20Annointed/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/USER/OneDrive/Documenten/HolyGhost%20Annointed/node_modules/@vitejs/plugin-react/dist/index.js";
import svgr from "file:///C:/Users/USER/OneDrive/Documenten/HolyGhost%20Annointed/node_modules/vite-plugin-svgr/dist/index.js";
import path from "path";
import { miaodaDevPlugin } from "file:///C:/Users/USER/OneDrive/Documenten/HolyGhost%20Annointed/node_modules/miaoda-sc-plugin/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\USER\\OneDrive\\Documenten\\HolyGhost Annointed";
var vite_config_default = defineConfig({
  base: "/HGPACI-Website/",
  // 👈 REQUIRED for GitHub Pages
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent"
      }
    }),
    miaodaDevPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXE9uZURyaXZlXFxcXERvY3VtZW50ZW5cXFxcSG9seUdob3N0IEFubm9pbnRlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudGVuXFxcXEhvbHlHaG9zdCBBbm5vaW50ZWRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VTRVIvT25lRHJpdmUvRG9jdW1lbnRlbi9Ib2x5R2hvc3QlMjBBbm5vaW50ZWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBtaWFvZGFEZXZQbHVnaW4gfSBmcm9tICdtaWFvZGEtc2MtcGx1Z2luJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogJy9IR1BBQ0ktV2Vic2l0ZS8nLCAvLyBcdUQ4M0RcdURDNDggUkVRVUlSRUQgZm9yIEdpdEh1YiBQYWdlc1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBzdmdyKHtcclxuICAgICAgc3Znck9wdGlvbnM6IHtcclxuICAgICAgICBpY29uOiB0cnVlLFxyXG4gICAgICAgIGV4cG9ydFR5cGU6ICduYW1lZCcsXHJcbiAgICAgICAgbmFtZWRFeHBvcnQ6ICdSZWFjdENvbXBvbmVudCcsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIG1pYW9kYURldlBsdWdpbigpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1YsU0FBUyxvQkFBb0I7QUFDNVgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFKaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxhQUFhO0FBQUEsUUFDWCxNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
