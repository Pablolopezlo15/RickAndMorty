<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '~/stores/auth'

    definePageMeta({
        middleware: 'auth'
    })

    const router = useRouter()
    const authStore = useAuthStore()

    // Form data
    const email = ref<string>('')
    const password = ref<string>('')

    // Error messages
    const emailError = ref<string>('')
    const passwordError = ref<string>('')
    const generalError = ref<string>('')

    // Validate email format
    const isValidEmail = (emailValue: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(emailValue)
    }

    // Validate password length
    const isValidPassword = (passwordValue: string): boolean => {
        return passwordValue.length >= 6
    }

    // Handle login
    const handleLogin = async () => {
        // Reset errors
        emailError.value = ''
        passwordError.value = ''
        generalError.value = ''

        // Validation
        let isValid = true

        if (!email.value) {
            emailError.value = 'El correo es requerido'
            isValid = false
        } else if (!isValidEmail(email.value)) {
            emailError.value = 'Por favor ingresa un correo válido'
            isValid = false
        }

        if (!password.value) {
            passwordError.value = 'La contraseña es requerida'
            isValid = false
        } else if (!isValidPassword(password.value)) {
            passwordError.value = 'La contraseña debe tener al menos 6 caracteres'
            isValid = false
        }

        if (!isValid) {
            return
        }
        
        try {        
            authStore.login(email.value)
            router.push('/dashboard')

        } catch (error) {
            generalError.value = 'Hubo un error al iniciar sesión. Intenta nuevamente.'
        }
    }
</script>



<template>
    <div
        class="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style="background-image: url('/images/rick-morty-bg.webp');"
    >
        <div class="absolute inset-0 bg-slate-950/70"></div>

        <div class="relative min-h-screen flex items-center justify-center px-4 py-8">
            <div class="w-full max-w-md rounded-2xl border border-cyan-300/40 bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-cyan-900/50 p-6 sm:p-8">
                <div class="mb-6 text-center">
                    <h1 class="text-3xl sm:text-4xl font-black tracking-wide text-cyan-300">
                        Rick and Morty
                    </h1>
                    <p class="mt-2 text-sm text-slate-200/90">
                        Accede al portal interdimensional
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
                    <div class="flex flex-col gap-2">
                        <label for="email" class="text-cyan-100 font-semibold text-sm">Correo Electrónico</label>
                        <input
                            v-model="email"
                            type="email"
                            id="email"
                            placeholder="Escribe tu correo electrónico"
                            class="px-3 py-3 rounded-lg border border-cyan-300/40 bg-slate-950/70 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                            required
                        />
                        <span v-if="emailError" class="text-red-300 text-xs mt-1">{{ emailError }}</span>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="password" class="text-cyan-100 font-semibold text-sm">Contraseña</label>
                        <input
                            v-model="password"
                            type="password"
                            id="password"
                            placeholder="Escribe tu contraseña"
                            class="px-3 py-3 rounded-lg border border-cyan-300/40 bg-slate-950/70 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                            required
                        />
                        <span v-if="passwordError" class="text-red-300 text-xs mt-1">{{ passwordError }}</span>
                    </div>

                    <button
                        type="submit"
                        class="mt-1 px-4 py-3 rounded-lg bg-cyan-400 text-slate-950 font-bold tracking-wide hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p v-if="generalError" class="text-center text-sm text-red-300 mt-4">{{ generalError }}</p>
            </div>
        </div>
    </div>
</template>

