import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
  const tokenCookie = useCookie<string | null>('auth_token', { sameSite: 'lax' })
  const userCookie = useCookie<string | null>('auth_user', { sameSite: 'lax' })

  // State
  const token = ref<string | null>(null)
  const user = ref<{ email: string; loginTime: string } | null>(null)
  const isAuthenticated = ref<boolean>(false)

  // Getters
  const getToken = computed(() => token.value)
  const getUser = computed(() => user.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)

  // Actions
  const login = (email: string, authToken?: string) => {
    // Simulate token generation
    const generatedToken = authToken || `token_${Date.now()}_${Math.random().toString()}`
    
    const userData = {
      email,
      loginTime: new Date().toISOString(),
    }

    // Save to state
    token.value = generatedToken
    user.value = userData
    isAuthenticated.value = true

    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem('auth_token', generatedToken)
      localStorage.setItem('auth_user', JSON.stringify(userData))
    }

    // Save to cookies (available on server/client)
    tokenCookie.value = generatedToken
    userCookie.value = JSON.stringify(userData)
  }

  const logout = () => {
    token.value = null
    user.value = null
    isAuthenticated.value = false

    // Clear from localStorage
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }

    // Clear cookies
    tokenCookie.value = null
    userCookie.value = null
  }

  const checkAuth = () => {
    // Verify if there's a valid token and user in localStorage (client) or cookies (server)
    let storedToken: string | null = null
    let storedUser: string | null = null

    if (import.meta.client) {
      storedToken = localStorage.getItem('auth_token') ?? tokenCookie.value ?? null
      storedUser = localStorage.getItem('auth_user') ?? userCookie.value ?? null
    } else {
      storedToken = tokenCookie.value ?? null
      storedUser = userCookie.value ?? null
    }

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true

        // Keep storage synchronized on client
        if (import.meta.client) {
          localStorage.setItem('auth_token', storedToken)
          localStorage.setItem('auth_user', storedUser)
        }

        return true
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        logout()
        return false
      }
    }

    isAuthenticated.value = false
    return false
  }

  // Method to initialize authentication state on app load
  const initializeAuth = () => {
    checkAuth()
  }

  return {
    // State
    token,
    user,
    isAuthenticated,
    // Getters
    getToken,
    getUser,
    getIsAuthenticated,
    // Actions
    login,
    logout,
    checkAuth,
    initializeAuth,
  }
})
