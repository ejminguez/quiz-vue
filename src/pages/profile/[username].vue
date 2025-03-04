<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';

const route = useRoute();
const username = (route.params as { username: string }).username;

const user = ref<Tables<'USER'> | null>(null);
const quizzes = ref<Tables<'QUIZ'>[]>([]);
const loading = ref(true);

onMounted(async () => {
  const { data: userData, error: userError } = await supabase.from('USER').select().eq('username', username).single();
  if (userError) console.log('error', userError);
  if (userData) {
    user.value = userData;
    const userId = userData.user_id;

    const { data: quizzesData, error: quizzesError } = await supabase.from('QUIZ').select().eq('created_by', userId);
    if (quizzesError) console.log('error', quizzesError);
    if (quizzesData) quizzes.value = quizzesData;
    console.log(userData);
    console.log(quizzesData);
  }

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
    <div v-if="quizzes.length">
      <h2>Quizzes Created:</h2>
      <ul>
        <li v-for="quiz in quizzes" :key="quiz.quiz_id">
          <RouterLink :to="`/quiz/${quiz.title}`">
            <p class="underline-offset-4 hover:underline">{{ quiz.title }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No quizzes created by this user.</p>
    </div>
  </div>
</template>