<template>
  <div class="max-w-4xl mx-auto">
    <div class="space-y-4">
      <!-- 效率工具 - Notion风格卡片 -->
      <NuxtLink :to="localePath('/usefultool')" class="group block">
        <div class="notion-card">
          <div class="flex items-start space-x-4">
            <div class="notion-icon">
              🛠️
            </div>
            <div class="flex-1">
              <h2 class="notion-title">
                {{ t('home.tools.title') }}
              </h2>
              <p class="notion-description">
                {{ t('home.tools.description') }}
              </p>
            </div>
            <div class="notion-arrow">
              →
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- 投资理财 - Notion风格卡片 -->
      <NuxtLink :to="localePath('/investment')" class="group block">
        <div class="notion-card">
          <div class="flex items-start space-x-4">
            <div class="notion-icon">
              💰
            </div>
            <div class="flex-1">
              <h2 class="notion-title">
                {{ t('home.investment.title') }}
              </h2>
              <p class="notion-description">
                {{ t('home.investment.description') }}
              </p>
            </div>
            <div class="notion-arrow">
              →
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- 实用小组件 - Notion风格卡片 -->
      <NuxtLink :to="localePath('/widgets')" class="group block">
        <div class="notion-card">
          <div class="flex items-start space-x-4">
            <div class="notion-icon">
              🧩
            </div>
            <div class="flex-1">
              <h2 class="notion-title">
                {{ t('home.widgets.title') }}
              </h2>
              <p class="notion-description">
                {{ t('home.widgets.description') }}
              </p>
            </div>
            <div class="notion-arrow">
              →
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- 底部信息 - Notion风格 -->
    <div class="mt-12 text-center space-y-2">
      <p class="notion-footer-text">{{ t('home.footer.updating') }}</p>
      <p class="notion-footer-text">{{ t('home.footer.learning') }}</p>
    </div>
  </div>
</template>

<script setup>
// 国际化和路由
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
/* Notion风格样式 */
.notion-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.notion-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.notion-icon {
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #f9fafb;
}

.notion-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
  line-height: 1.3;
}

.notion-description {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}

.notion-arrow {
  color: #9ca3af;
  font-size: 18px;
  font-weight: 300;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.group:hover .notion-arrow {
  opacity: 1;
}

.notion-footer-text {
  font-size: 13px;
  color: #6b7280;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .notion-card {
    padding: 16px;
  }

  .notion-title {
    font-size: 16px;
  }

  .notion-description {
    font-size: 12px;
  }
}
</style>