<script setup lang="ts">
const route = useRoute()
await navigateTo({ path: `/${route.params.locale === 'en' ? 'en' : 'zh'}`, query: route.query }, { redirectCode: 301, replace: true })
</script>
