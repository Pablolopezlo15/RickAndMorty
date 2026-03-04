export const useCharacters = () => {
  const search = ref('')
  const page = ref(1)

  watch(
    search,
    () => {
      page.value = 1
    },
    { immediate: true }
  )

  const {
    data,
    pending,
    error,
    refresh
  } = useAsyncData(
    () => {
      const params: { page: number; name?: string } = { page: page.value }

      const trimmedSearch = search.value.trim()
      if (trimmedSearch) {
        params.name = trimmedSearch
      }

      return $fetch('https://rickandmortyapi.com/api/character', { params })
    },
    {
      watch: [search, page],
      dedupe: 'defer'
    }
  )

  const nextPage = () => page.value++
  const prevPage = () => {
    if (page.value > 1) page.value--
  }


  return {
    data,
    pending,
    error,
    search,
    page,
    nextPage,
    prevPage,
    refresh
  }
}
