import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';
import type { Tables } from '../../database/types';

export const useQuizStore = defineStore('quizStore', {
  state: () => {
    const quiz = ref<Tables<'QUIZ'>[]>([]);
    return {
      quiz,
      loading: false,
    };
  },
  actions: {
    async fetchQuiz() {
      this.loading = true;
      const { data, error } = await supabase.from('QUIZ').select();
      if (error) {
        console.error('Error fetching quiz:', error);
      } else {
        this.quiz = data;
        this.loading = false;
      }
    },
  },
});