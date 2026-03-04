export const useCharacters = () => {
  const search = ref('')
  const page = ref(1)

  const {
    data,
    pending,
    error,
    refresh
  } = useAsyncData(
    () =>
      $fetch('https://rickandmortyapi.com/api/character', {
        params: {
          name: search.value,
          page: page.value
        }
      }),
    {
      watch: [search, page]
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