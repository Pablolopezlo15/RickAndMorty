import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  try {
    const nuxtApp = useNuxtApp()
    const authStore = useAuthStore(nuxtApp.$pinia)

    authStore.initializeAuth()

    // Route Guard: Define routes that don't require authentication
    const publicRoutes = ['/login']

    // If the route is not public and user is not authenticated, redirect to login
    if (!publicRoutes.includes(to.path)) {
      // If user is not authenticated, redirect to login
      if (!authStore.isAuthenticated) {
        return navigateTo('/login')
      }
    }

    // If user is authenticated and tries to access login page, redirect to dashboard
    if (to.path === '/login' && authStore.isAuthenticated) {
      return navigateTo('/dashboard')
    }
  } catch (error) {
    console.warn('Auth middleware error:', error)
  }
})
