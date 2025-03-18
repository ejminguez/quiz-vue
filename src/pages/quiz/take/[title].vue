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
const choices = ref<Tables<'CHOICE'>[] | null>(null);

const scrollToTop = () => window.scrollTo(0, 0);

const clearSelection = (questionId: string) => {
  const radios = document.querySelectorAll(`input[name="${questionId}"]`);
  radios.forEach((radio) => (radio as HTMLInputElement).checked = false);
};

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

    const { data: choiceData, error: choiceError } = await supabase
      .from('CHOICE')
      .select()
      .in('question_id', questionData.map((q) => q.question_id));

    questions.value = questionData;
    choices.value = choiceData;
    console.log('Questions fetched:', questionData);
    console.log('Choices fetched:', choiceData);
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    loading.value = false;
    scrollToTop();
  }
});
</script>

<template>
  <section class="w-full">
    <!-- LOADING STATE -->
    <div v-if="loading" class="w-[50%] mx-auto">
      <div class="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <!-- Header -->
        <div class="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        <!-- Body -->
        <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div class="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
    <!-- QUESTIONS ARE FETCHED -->
    <div v-else-if="quiz" class="flex flex-col gap-8 w-[50%] mx-auto">
      <h1 class="font-bold text-3xl">{{ quiz.title.toUpperCase() }}</h1>
      <div class="grid gap-4">
        <h2 class="text-2xl">Questions:</h2>
        <ol v-if="questions && questions.length" class="grid gap-2">
          <!-- MAPPING QUESTIONS -->
          <li v-for="question in questions" :key="question.question_id" class="bg-white p-4 rounded shadow grid gap-4">
            <h3 class="font-bold text-xl">{{ question.question_text }}</h3>
            <ul class="grid gap-2">
              <!-- MAPPING ALL CHOICES FOR THAT QUESTION -->
              <li v-for="choice in choices" :key="choice.choice_id" class="cursor-pointer">
                <label>
                  <input type="radio" :name="question.question_id" :value="choice.choice_id" />
                  {{ choice.choice_text }}
                </label>
              </li>
            </ul>
            <button class="border-[1px] cursor-pointer hover:bg-slate-100 px-4 py-2 rounded w-[30%]" @click="clearSelection(question.question_id)">
              Clear Selection
            </button>
          </li>
        </ol>
        <p v-else>No questions found.</p>
      </div>
      <button class="bg-slate-500 cursor-pointer hover:bg-slate-600 px-4 py-2 rounded text-white w-[30%] mx-auto transition-all duration-200">
        Submit
      </button>
    </div>
    <p v-else>No quiz found.</p>
  </section>
</template>
