<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'
import { supabase } from '@/lib/supabaseClient'
console.log(supabase)
</script>

<template>
  <Navbar class="sticky top-[1%] lg:top-[3%]" />
  <main class="min-h-[600px] place-items-center pt-12">
    <RouterView />
  </main>
</template>