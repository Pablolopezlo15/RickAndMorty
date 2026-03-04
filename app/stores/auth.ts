import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
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
    localStorage.setItem('auth_token', generatedToken)
    localStorage.setItem('auth_user', JSON.stringify(userData))
  }

  const logout = () => {
    token.value = null
    user.value = null
    isAuthenticated.value = false

    // Clear from localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const checkAuth = () => {
    // Verify if there's a valid token and user in localStorage
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
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