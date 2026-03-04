<script setup lang="ts">
    const { app } = useRuntimeConfig()
    const landingBgImage = computed(() => "url('" + app.baseURL + "images/fondolanding.webp')")
</script>

<template>
  <div class="min-h-screen relative overflow-hidden bg-slate-950">
    <!-- Fondo global con gradiente + overlay imagen cósmica -->
    <div 
      class="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-cyan-950 opacity-80 z-0"
    ></div>
    
    <!-- Imagen de fondo sutil (portal/multiverso) -->
    <div 
      class="absolute inset-0 bg-cover bg-center opacity-20 z-0 mix-blend-screen pointer-events-none"
      :style="{ backgroundImage: landingBgImage }"
    ></div>

    <main class="relative z-10 py-20 md:py-32">
      <!-- Hero -->
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 mb-8 tracking-tight animate-pulse">
          Rick and Morty
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Wubba lubba dub dub... Explora el multiverso infinito, conoce a los personajes más dementes y guarda a tus favoritos antes de que Rick los convierta en pepinillos.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <NuxtLink 
            to="/dashboard" 
            class="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-900 font-extrabold text-xl rounded-full transition-all duration-300 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transform hover:scale-105 overflow-hidden"
          >
            <span class="relative z-10">¡Portal al Dashboard!</span>
            <span class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
          </NuxtLink>

        </div>
      </div>

      <!-- Features -->
      <section class="mt-24 md:mt-40 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <div class="group bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-900/40">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
            👽
          </div>
          <h3 class="text-3xl font-bold text-cyan-400 mb-4 text-center">Explora Personajes</h3>
          <p class="text-slate-300 text-center leading-relaxed">
            Desde Pickle Rick hasta Unity, Mr. Poopybutthole y miles de versiones alternativas. Todo el multiverso en un solo lugar.
          </p>
        </div>

        <div class="group bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-900/40">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg">
            ❤️
          </div>
          <h3 class="text-3xl font-bold text-cyan-400 mb-4 text-center">Guarda Favoritos</h3>
          <p class="text-slate-300 text-center leading-relaxed">
            Marca tus personajes favoritos y llévalos contigo en el portal de tu dashboard personal. ¡Nunca más los pierdas en otra dimensión!
          </p>
        </div>

        <div class="group bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-900/40">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl shadow-lg">
            🌌
          </div>
          <h3 class="text-3xl font-bold text-cyan-400 mb-4 text-center">Multiverso Interactivo</h3>
          <p class="text-slate-300 text-center leading-relaxed">
            Episodios, localizaciones, naves, portales... todo conectado en una experiencia caótica y adictiva.
          </p>
        </div>
      </section>

      <!-- Footer -->
      <section class="mt-32 text-center px-6">
        <p class="text-2xl md:text-3xl text-slate-200 mb-10 font-light">
          ¿Estás listo para decir "Wubba lubba dub dub" y lanzarte al caos interdimensional?
        </p>
        
        <NuxtLink 
          to="/dashboard" 
          class="inline-flex items-center px-12 py-6 bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 hover:from-cyan-500 hover:via-teal-400 hover:to-cyan-500 text-slate-900 font-black text-2xl rounded-full transition-all duration-500 shadow-2xl shadow-cyan-700/50 hover:shadow-cyan-500/70 transform hover:scale-110 animate-pulse-slow"
        >
          ¡Abre el Portal Ahora!
        </NuxtLink>
      </section>
    </main>
  </div>
</template>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>