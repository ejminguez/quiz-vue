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
const scrollToTop = () => window.scrollTo(0, 0);

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
  scrollToTop();
});
</script>

<template>
  <section class="w-full">
    <div class="text-center grid gap-8 w-[30%] mx-auto">
      <p v-if="loading">Loading...</p>
      <div v-else class="grid gap-4 p-8 shadow-md bg-white rounded-lg">
        <p><strong>Quiz: </strong> {{ quiz?.title }}</p>
        <p><strong>Description:</strong> <span class="italic"> {{ quiz?.description }}</span></p>
        <p><strong>Created by: </strong>
          <RouterLink :to="`/profile/${user?.username}`">
            <span class="hover:font-bold transition-all duration-200">{{ user?.username }}</span>
          </RouterLink>
        </p>
        <p><strong>Time Limit: </strong> {{ quiz?.time_limit }} mins</p>
        <RouterLink :to="`/quiz/take/${quiz?.title}`"
          class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Take Quiz
        </RouterLink>
      </div>
    </div>
  </section>
</template>