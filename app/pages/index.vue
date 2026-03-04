<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'
    import { useRouter } from 'vue-router'
    import { useCharacters } from '~/composables/useCharacters'

    definePageMeta({
        middleware: 'auth'
    })

    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogout = () => {
    authStore.logout()
    router.push('/login')
    }

    const {
        data,
        pending,
        error,
        search,
        nextPage,
        prevPage
    } = useCharacters()

    const errorMessage = computed(() => {
        const statusCode = error.value?.statusCode
        const message = error.value?.message?.toLowerCase?.() ?? ''

        if (statusCode === 404 || message.includes('404')) {
            return 'No se ha encontrado ningún personaje.'
        }

        if (statusCode === 429 || message.includes('429')) {
            return 'Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.'
        }

        return 'Ha ocurrido un error al cargar los personajes.'
    })

</script>



<template>
    <button @click="handleLogout" class="px-4 py-2 bg-red-500">
        Cerrar Sesión
    </button>
    
    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Search input -->
        <div class="mb-6">
            <input
                type="text"
                v-model="search"
                placeholder="Busca personajes por nombre..."
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            />
        </div>

        <!-- Loading state -->
        <div v-if="pending" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p class="ml-4 text-gray-600">Cargando personajes...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{{ errorMessage }}</p>
        </div>

        <!-- Characters grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CharacterCard
                v-for="character in data.results"
                :key="character.id"
                :character="character"
            />
        </div>

        <!-- Pagination -->
        <div v-if="!pending && !error" class="flex justify-center gap-4 mt-8">
            <button
            @click="prevPage"
            :disabled="!data.info.prev"
            class="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
            ← Anterior
            </button>
            <button
            @click="nextPage"
            :disabled="!data.info.next"
            class="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
            Siguiente →
            </button>
        </div>
    </div>

</template>
