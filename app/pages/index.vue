<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'
    import { useRouter } from 'vue-router'

    definePageMeta({
        middleware: 'auth'
    })

    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogout = () => {
    authStore.logout()
    router.push('/login')
    }
</script>



<template>
    <button @click="handleLogout" class="px-4 py-2 bg-red-500">
        Logout
    </button>
</template>