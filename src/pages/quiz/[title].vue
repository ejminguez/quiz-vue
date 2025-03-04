<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';

const route = useRoute();
const title = (route.params as { title: string }).title;
const quiz = ref<Tables<'QUIZ'> | null>(null);
const user = ref<Tables<'USER'> | null>(null);
const loading = ref(true);

onMounted(async () => {
  const { data: quizData, error: quizError } = await supabase.from('QUIZ').select().eq('title', title).single();
  if (quizError) console.log('error', quizError);
  if (quizData) {
    quiz.value = quizData;
    const created_by = quizData.created_by;
    console.log(quizData)

    const { data: userData, error: userError } = await supabase.from('USER').select().eq('user_id', created_by).single();
    if (userError) console.log('error', userError);
    if (userData) user.value = userData;
  }

  loading.value = false;
});
</script>

<template>
  <div class="text-center grid gap-8">
    <h1>Ready to take <span class="font-bold">{{ quiz?.title }}</span> ?</h1>
    <p v-if="loading">Loading...</p>
    <div v-else class="grid gap-4 bg-yellow-50 p-8 shadow-md">
      <p>Quiz: <strong>{{ quiz?.title }}</strong></p>
      <p>Description: {{ quiz?.description }}</p>
      <p>Created by: 
        <RouterLink :to="`/profile/${user?.username}`">
          <span class="underline-offset-4 hover:underline">{{ user?.username }}</span>
        </RouterLink>
      </p>
      <p>Time Limit: {{ quiz?.time_limit }} mins</p>
      <button class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Take Quiz
      </button>
    </div>
  </div>
</template>