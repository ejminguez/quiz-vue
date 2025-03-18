<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../../database/types';
import createQuestionsForm from '@/components/createQuestionsForm.vue';

const route = useRoute();
const questions = ref<Tables<'QUESTION'>[]>([]);
const quiz = ref<Tables<'QUIZ'> | null>(null);
const loading = ref(true);
const scrollToTop = () => window.scrollTo(0, 0);
const quizTitle = (route.params as { title: string }).title || '';
const hideCreateQuestion = ref(true);

// fetch quiz and corresponding questions data
onMounted(async () => {
  await nextTick();
  const { data: quizData, error: quizError } = await supabase.from('QUIZ').select('*').eq('title', quizTitle).single();
  const { data: questionsData, error: questionsError } = await supabase.from('QUESTION').select('*').eq('quiz_id', quizData?.quiz_id ?? '');

  if (quizError) {
    console.error(quizError);
    console.error('Failed to fetch quiz data');
  } else if (questionsError) {
    console.error(questionsError);
    console.error('Failed to fetch questions data');
  } else {
    quiz.value = quizData || [];
    questions.value = questionsData || [];
    console.log('quiz', quiz.value);
    console.log('questions', questions.value);
  }

  loading.value = false;
  scrollToTop();
});



</script>

<template>
  <section class="w-full">
    <!-- loading state -->
    <div v-if="loading" class="flex items-center justify-center">
      <h1>
        loading...
      </h1>
    </div>

    <div class="grid gap-4 w-[40%] mx-auto">
      <!-- fetched quiz details -->
      <div class="grid gap-4">
        <h1 class="text-2xl">{{ quiz?.title }}</h1>
        <p class="font-thin italic">{{ quiz?.description }}</p>
      </div>

      <!-- fetched questions -->
      <div v-if="questions.length > 0">
        <ul v-for="question in questions" :key="question.question_id">
          <li class="grid gap-2">
            <h3 class="text-xl">Questions</h3>
            <h2>{{ question.question_text }}</h2>
          </li>
        </ul>
      </div>

      <!-- no questions found -->
      <div v-else>
        <h4>No Questions Found T_T</h4>
      </div>

      <!-- create question -->
       <button class="border-[1px] py-2 px-4 rounded-md cursor-pointer hover:bg-blue-100" @click.prevent="hideCreateQuestion = !hideCreateQuestion">
        {{ !hideCreateQuestion ? 'Add Question' : 'Hide Form' }}
       </button>

      <!-- create question form -->
       <createQuestionsForm v-if="hideCreateQuestion" />
       
    </div>

  </section>
</template>