<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { useAuthStore } from '~/stores/auth'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const isMenuOpen = ref(false)
    const isLoggedIn = computed(() => authStore.isAuthenticated)
    const userEmail = computed(() => authStore.user?.email ?? '')

    const isActiveRoute = (path: string) => route.path === path

    const navLinkClass = (path: string) =>
        isActiveRoute(path)
            ? 'px-3 py-2 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-300 shadow-sm shadow-cyan-900/20'
            : 'px-3 py-2 rounded-lg text-sm font-semibold text-cyan-100 hover:bg-slate-800 hover:text-cyan-200 transition-all duration-200 hover:-translate-y-0.5'

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
        isMenuOpen.value = false
    }

    const handleAuthAction = () => {
        if (isLoggedIn.value) {
            authStore.logout()
        }
        closeMenu()
        router.push('/login')
    }
</script>

<template>
    <nav class="sticky top-0 z-50 border-b border-cyan-300/30 bg-slate-950/85 backdrop-blur-md text-slate-100">
        <div class="max-w-7xl mx-auto px-4 py-3">
            <div class="flex items-center justify-between">
                <NuxtLink to="/" class="text-lg sm:text-xl font-black tracking-wide text-cyan-300" @click="closeMenu">
                    Rick and Morty
                </NuxtLink>

                <button
                    type="button"
                    class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-cyan-200 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-colors"
                    :aria-expanded="isMenuOpen"
                    aria-controls="mobile-menu"
                    aria-label="Abrir menú principal"
                    @click="toggleMenu"
                >
                    <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="hidden md:flex items-center gap-2">
                    <p v-if="isLoggedIn" class="mr-2 text-xs text-cyan-200/90 font-medium">
                        {{ userEmail }}
                    </p>
                    <NuxtLink
                        v-if="isLoggedIn"
                        to="/dashboard"
                        :class="navLinkClass('/dashboard')"
                    >
                        Dashboard
                    </NuxtLink>
                    <NuxtLink
                        v-if="isLoggedIn"
                        to="/favorites"
                        :class="navLinkClass('/favorites')"
                    >
                        Favoritos
                    </NuxtLink>
                    <button
                        @click="handleAuthAction"
                        :class="isLoggedIn
                            ? 'ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-red-500 text-white hover:bg-red-400 transition-all duration-200 hover:-translate-y-0.5'
                            : 'ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all duration-200 hover:-translate-y-0.5'"
                    >
                        <svg v-if="isLoggedIn" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        
                        {{ isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión' }}
                    </button>
                </div>
            </div>

            <div
                id="mobile-menu"
                class="md:hidden overflow-hidden transition-all duration-200"
                :class="isMenuOpen ? 'max-h-64 mt-3' : 'max-h-0'"
            >
                <div class="rounded-xl border border-cyan-300/25 bg-slate-900/85 p-2 flex flex-col gap-1">
                    <p v-if="isLoggedIn" class="px-3 pt-2 pb-1 text-xs text-cyan-200/90 font-medium">
                        {{ userEmail }}
                    </p>
                    <NuxtLink
                        v-if="isLoggedIn"
                        to="/dashboard"
                        :class="navLinkClass('/dashboard')"
                        @click="closeMenu"
                    >
                        Dashboard
                    </NuxtLink>
                    <NuxtLink
                        v-if="isLoggedIn"
                        to="/favorites"
                        :class="navLinkClass('/favorites')"
                        @click="closeMenu"
                    >
                        Favoritos
                    </NuxtLink>

                    <button
                        @click="handleAuthAction"
                        :class="isLoggedIn
                            ? 'mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-red-500 text-white hover:bg-red-400 transition-all duration-200 text-left'
                            : 'mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all duration-200 text-left'"
                    >
                        <svg v-if="isLoggedIn" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        {{ isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión' }}
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
