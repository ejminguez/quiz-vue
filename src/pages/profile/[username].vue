<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';

const route = useRoute();
const username = (route.params as { username: string }).username;

const user = ref<Tables<'USER'> | null>(null);
const loading = ref(true);

onMounted(async () => {
  const { data, error } = await supabase.from('USER').select().eq('username', username).single();
  if (error) console.log('error', error);
  if (data) user.value = data;
  loading.value = false;
});
</script>

<template>
  <div class="text-center">
    <h1>WELCOME!</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <p>Username: <strong>{{ user?.username }}</strong></p>
      <p>Email Address: {{ user?.email_address }}</p>
    </div>
  </div>
</template>