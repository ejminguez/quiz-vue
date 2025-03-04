import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';
import type { Tables } from '../../database/types';
import { useRoute } from 'vue-router';

export const useIndividualUserStore = defineStore('individualUserStore', {
  state: () => {
    const user = ref<Tables<'USER'> | null>(null);
    const quizzes = ref<Tables<'QUIZ'>[]>([]);
    const loading = ref(false);
    return {
      user,
      quizzes,
      loading,
    };
  },
  actions: {
    async fetchIndividualUser() {
      const route = useRoute();
      const username = (route.params as { username: string }).username;
      this.loading = true;
      const { data: userData, error: userError } = await supabase.from('USER').select().eq('username', username).single();
      if (userError) {
        console.error('Error fetching user:', userError);
      } else if (userData) {
        this.user = userData;
        const userId = userData.user_id;

        const { data: quizzesData, error: quizzesError } = await supabase.from('QUIZ').select().eq('created_by', userId);
        if (quizzesError) {
          console.error('Error fetching quizzes:', quizzesError);
        } else {
          this.quizzes = quizzesData;
        }
      }
      this.loading = false;
    },
  },
});