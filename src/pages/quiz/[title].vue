<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';
import Username from '../profile/[username].vue';

const route = useRoute();
const title = (route.params as { title: string }).title;

const quiz = ref<Tables<'QUIZ'> | null>(null);
const loading = ref(true);

onMounted(async () => {
  const { data, error } = await supabase.from('QUIZ').select().eq('title', title).single();
  if (error) console.log('error', error);
  if (data) quiz.value = data;
  loading.value = false;
});
</script>

<template>
  <div class="text-center grid gap-8">
    <h1>Ready to take <span class="font-bold">{{ quiz?.title }}</span> ?</h1>
    <p v-if="loading">Loading...</p>
    <div v-else class="grid gap-4 bg-yellow-200 p-8">
        <p>Quiz: <strong>{{ quiz?.title }}</strong></p>
        <p>Description: {{ quiz?.description }}</p>
        <p>Time Limit: {{ quiz?.time_limit }}</p>
        <button class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Take Quiz
        </button>
    </div>
  </div>
</template>