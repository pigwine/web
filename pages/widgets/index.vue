<template>
  <WidgetLayout>
    <div class="widgets-grid">
      <WeatherWidget />
      <ClockWidget />
      <CalendarWidget />
    </div>
  </WidgetLayout>
</template>

<script setup>
import WidgetLayout from '~/components/notion/layout/WidgetLayout.vue'
import WeatherWidget from '~/components/notion/widgets/WeatherWidget.vue'

</script>

<style scoped>
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style> 