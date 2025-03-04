<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'
import { supabase } from '@/lib/supabaseClient'
console.log(supabase)
</script>

<template>
  <Navbar class="sticky top-0 py-5 shadow-sm bg-slate-50" />
  <main class="min-h-screen place-items-center my-12">
    <RouterView />
  </main>
</template>