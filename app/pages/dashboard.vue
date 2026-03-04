<script setup lang="ts">
    import { useFavoritesStore } from '~/stores/favorites'
    import { useCharacters } from '~/composables/useCharacters'

    definePageMeta({
        middleware: 'auth'
    })


    const favoritesStore = useFavoritesStore()

    onMounted(() => {
        favoritesStore.initializeFavorites()
    })

    const {
        data,
        pending,
        error,
        search,
        page,
        nextPage,
        prevPage
    } = useCharacters()

    const pageDirection = ref<'next' | 'prev'>('next')
    const pageTransitionName = computed(() =>
        pageDirection.value === 'next' ? 'page-slide-left' : 'page-slide-right'
    )

    const goToNextPage = () => {
        if (!data.value?.info?.next) return
        pageDirection.value = 'next'
        nextPage()
    }

    const goToPrevPage = () => {
        if (!data.value?.info?.prev) return
        pageDirection.value = 'prev'
        prevPage()
    }

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

    const totalCharactersFound = computed(() => data.value?.info?.count ?? 0)
    const currentPageCharacters = computed(() => data.value?.results?.length ?? 0)

</script>



<template>    
    <!-- Main content -->
    
    <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Personajes de Rick and Morty</h1>
        <!-- Search input -->
        <div class="mb-6">
            <input
                type="text"
                v-model="search"
                placeholder="Busca personajes por nombre..."
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none"
            />
        </div>
        <p v-if="!pending && !error" class="mb-6 text-sm text-gray-600">
            Personajes encontrados: <span class="font-semibold text-gray-900">{{ totalCharactersFound }}</span>
            (mostrando {{ currentPageCharacters }} en esta página)
        </p>

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
        <div v-if="!pending && !error" class="flex items-center justify-center gap-4 mt-8">
            <button
            @click="goToPrevPage"
            :disabled="!data.info.prev"
            class="px-6 py-2 bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-300 text-slate-950 font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
                ← Anterior
            </button>

            <div class="min-w-28 text-center">
                <p class="text-xs uppercase tracking-wide text-gray-500">Página</p>
                <Transition :name="pageTransitionName" mode="out-in">
                    <p :key="page" class="text-lg font-bold text-slate-900">
                        {{ page }}
                    </p>
                </Transition>
            </div>

            <button
            @click="goToNextPage"
            :disabled="!data.info.next"
            class="px-6 py-2 bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-300 text-slate-950 font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
                Siguiente →
            </button>
        </div>
    </div>
</template>

