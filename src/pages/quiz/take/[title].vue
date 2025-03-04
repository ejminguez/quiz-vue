<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../../database/types';

const route = useRoute();
const title = (route.params as { title: string }).title;
const quiz = ref<Tables<'QUIZ'> | null>(null);
const questions = ref<Tables<'QUESTION'>[] | null>(null);
const loading = ref(true);

const scrollToTop = () => window.scrollTo(0, 0);

onMounted(async () => {
  try {
    loading.value = true;
    console.log('Fetching quiz for title:', title);

    // Fetch the quiz details
    const { data: quizData, error: quizError } = await supabase
      .from('QUIZ')
      .select()
      .eq('title', title)
      .single();

    if (quizError || !quizData) {
      console.error('Quiz fetch error:', quizError || 'No quiz found');
      return;
    }

    quiz.value = quizData;
    console.log('Quiz fetched:', quizData);

    // Fetch all questions related to this quiz
    const { data: questionData, error: questionError } = await supabase
      .from('QUESTION')
      .select()
      .eq('quiz_id', quizData.quiz_id); // Fetch all questions for the quiz

    if (questionError) {
      console.error('Questions fetch error:', questionError);
      return;
    }

    questions.value = questionData;
    console.log('Questions fetched:', questionData);
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    loading.value = false;
    scrollToTop();
  }
});
</script>

<template>
  <section>
    <h1 v-if="loading">Loading...</h1>
    <div v-else-if="quiz" class="flex flex-col gap-8">
      <h1 class="font-bold text-3xl">{{ quiz.title.toUpperCase() }}</h1>
      <div class="grid gap-4">
        <h2 class="text-2xl">Questions:</h2>
        <ol type="1" v-if="questions && questions.length" class="grid gap-2">
          <li v-for="question in questions" :key="question.question_id">
            {{ question.question_text }}
          </li>
        </ol>
        <p v-else>No questions found.</p>
      </div>
    </div>
    <p v-else>No quiz found.</p>
  </section>
</template>


<style scoped>
ol {
  list-style-type: decimal;
  padding-left: 20px;
}
</style>