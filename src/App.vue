<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'
import {supabase} from '@/lib/supabaseClient'
console.log(supabase)
</script>

<template>
  <Navbar class="sticky top-5 pl-8"/>
  <main class="min-h-[600px] place-items-center pt-8">
    <RouterView />
  </main>
</template>