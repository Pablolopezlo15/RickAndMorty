<script setup lang="ts">
    import { useFavoritesStore } from '~/stores/favorites'

    definePageMeta({
        middleware: 'auth'
    })

    const favoritesStore = useFavoritesStore()

    onMounted(() => {
        favoritesStore.initializeFavorites()
    })

    const favoritesCount = computed(() => favoritesStore.favorites.length)

</script>

<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mis Favoritos</h1>
            <NuxtLink
                to="/"
                class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
                Volver
            </NuxtLink>
        </div>

        <p class="text-sm text-gray-600 mb-6">
            Total de favoritos: {{ favoritesCount }}
        </p>

        <div
            v-if="favoritesStore.favorites.length"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <CharacterCard
                v-for="character in favoritesStore.favorites"
                :key="character.id"
                :character="character"
            />
        </div>

        <div v-else class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p class="text-gray-700 font-medium">No has añadido personajes a favoritos.</p>
            <p class="text-gray-500 mt-1">Vuelve al listado y usa el botón de corazón.</p>
        </div>
    </div>
</template>
