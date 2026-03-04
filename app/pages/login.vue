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
            router.push('/')

        } catch (error) {
            generalError.value = 'Hubo un error al iniciar sesión. Intenta nuevamente.'
        }
    }
</script>



<template>
    <div class="min-h-screen flex items-center justify-center">
        <div>
            <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-gray-800 font-semibold text-sm">Correo Electrónico</label>
                    <input 
                        v-model="email" 
                        type="email" 
                        id="email" 
                        placeholder="Escribe tu correo electrónico"
                        class="px-3 py-3 border-2 border-gray-200"
                        required
                    />
                    <span v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</span>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="password" class="text-gray-800 font-semibold text-sm">Contraseña</label>
                    <input 
                        v-model="password" 
                        type="password" 
                        id="password" 
                        placeholder="Escribe tu contraseña"
                        class="px-3 py-3 border-2 border-gray-200"
                        required
                    />
                    <span v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</span>
                </div>

                <button 
                    type="submit" 
                    class="px-3 py-3  bg-green-500 text-white"
                >
                    Iniciar Sesión
                </button>
            </form>
            <p v-if="generalError" class="text-center text-sm text-red-700">{{ generalError }}</p>

        </div>
    </div>
</template>

