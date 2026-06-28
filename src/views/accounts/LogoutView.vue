<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()
  router.replace({ name: 'login' })
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <p class="text-muted-foreground">Saindo...</p>
  </div>
</template>
