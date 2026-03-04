<script setup lang="ts">
import { getStatusClasses, getStatusLabel } from '~/helpers/getStatus.ts'
import { useFavoritesStore } from '~/stores/favorites'

type Character = {
  id: number
  name: string
  image: string
  status?: string
}

defineProps<{
  character: Character
}>()

const favoritesStore = useFavoritesStore()

onMounted(() => {
  favoritesStore.initializeFavorites()
})

const isCharacterFavorite = (characterId: number) => favoritesStore.isFavorite(characterId)
</script>

<template>
  <div class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 flex flex-col h-full">
    <div class="relative">
      <img
        :src="character.image"
        :alt="character.name"
        class="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />

      <button
        type="button"
        class="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm border border-gray-200/80 hover:bg-white hover:border-gray-300 transition-colors duration-150 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        :title="isCharacterFavorite(character.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'"
        @click="favoritesStore.toggleFavorite(character)"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="isCharacterFavorite(character.id) ? 'text-red-600' : 'text-gray-500 hover:text-red-600'"
          :fill="isCharacterFavorite(character.id) ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-700 transition-colors">
        {{ character.name }}
      </h3>

      <dl class="space-y-2 text-sm text-gray-600 flex-grow">
        <div class="flex justify-between items-center">
          <dt class="font-medium text-gray-700">Estado</dt>
          <dd>
            <span
              class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getStatusClasses(character.status)"
            >
              {{ getStatusLabel(character.status) }}
            </span>
          </dd>
        </div>
      </dl>

    </div>
  </div>
</template>
