import {defineConfig} from '@playwright/test'
export default defineConfig({testDir:'tests/e2e',workers:1,use:{baseURL:'http://127.0.0.1:3100',browserName:'chromium'},webServer:{command:'KAIMAFIND_DATA_DIR=./.data/e2e NUXT_LOCAL_ADMIN=true npm run dev -- --port 3100',url:'http://127.0.0.1:3100',reuseExistingServer:!process.env.CI,timeout:120000}})
