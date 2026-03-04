<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'
    import { onMounted } from 'vue'

    // Use authentication middleware for the entire app
    definePageMeta({
        middleware: 'auth'
    })

    const authStore = useAuthStore()
    const route = useRoute()
    const showScrollToTop = computed(() => route.path !== '/login')

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
    <title>Rick and Morty App</title>
    <div class="min-h-screen flex flex-col">
        <Navbar />
        <main class="flex-1">
            <NuxtPage />
        </main>
        <ScrollToTop v-if="showScrollToTop" />
        <Footer />
    </div>
</template>
