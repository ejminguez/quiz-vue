import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';
import type { Tables } from '../../database/types';
import { useRoute } from 'vue-router';

export const useIndividualQuizStore = defineStore('individualUserStore', {
  state: () => {
    const quiz = ref<Tables<'QUIZ'> | null>(null);
    const questions = ref<Tables<'QUESTION'>[]>([]);
    const loading = ref(false);
    return {
      quiz,
      questions,
      loading,
    };
  },
  actions: {
    async fetchIndividualQuiz() {
      const route = useRoute();
      const quiz = (route.params as { id: string }).id;
      this.loading = true;
      const { data: quizData, error: userError } = await supabase.from('QUIZ').select().eq('quiz_id', quiz).single();
      if (userError) {
        console.error('Error fetching user:', userError);
      } else if (quizData) {
        this.quiz = quizData;
        const quizId = quizData.quiz_id;

        const { data: questionsData, error: questionsError } = await supabase.from('QUESTION').select().eq('question_id', quizId);
        if (questionsError) {
          console.error('Error fetching quizzes:', questionsError);
        } else if (questionsData) {
          this.questions = questionsData;
        }
      }
      this.loading = false;
    },
  },
});