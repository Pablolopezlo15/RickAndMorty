import { defineStore } from 'pinia'

export type FavoriteCharacter = {
  id: number
  name: string
  image: string
  status?: string
}

const FAVORITES_STORAGE_KEY = 'favorite_characters'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteCharacter[]>([])
  const initialized = ref(false)

  const initializeFavorites = () => {
    if (initialized.value || import.meta.server) return

    const rawFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (!rawFavorites) {
      initialized.value = true
      return
    }

    try {
      const parsedFavorites = JSON.parse(rawFavorites) as FavoriteCharacter[]
      favorites.value = Array.isArray(parsedFavorites) ? parsedFavorites : []
    } catch (error) {
      console.warn('Error parsing favorites from localStorage:', error)
      favorites.value = []
    } finally {
      initialized.value = true
    }
  }

  const isFavorite = (id: number) => favorites.value.some((item) => item.id === id)

  const addFavorite = (character: FavoriteCharacter) => {
    if (isFavorite(character.id)) return

    favorites.value.push(character)
  }

  const removeFavorite = (characterId: number) => {
    favorites.value = favorites.value.filter((item) => item.id !== characterId)
  }

  const toggleFavorite = (character: FavoriteCharacter) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id)
      return
    }

    addFavorite(character)
  }

  watch(
    favorites,
    (value) => {
      if (import.meta.server) return
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true }
  )

  return {
    favorites,
    initializeFavorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite
  }
})
