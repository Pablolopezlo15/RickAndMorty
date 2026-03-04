<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'
    import { onMounted } from 'vue'

    // Use authentication middleware for the entire app
    definePageMeta({
        middleware: 'auth'
    })

    const authStore = useAuthStore()

    // Initialize authentication state when the app loads
    onMounted(() => {
        try {
            authStore.initializeAuth()
        } catch (error) {
            console.warn('Error initializing auth:', error)
        }
    })
</script>


<template>
    <div>
        <NuxtPage />
    </div>
</template>
