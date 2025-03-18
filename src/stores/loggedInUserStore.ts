import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import type { Tables } from "../../database/types";

export const useLoggedInUserStore = defineStore("loggedInUserStore", {
    state: () => {
        const user = ref<Tables<"USER"> | null>(null);
        const quiz = ref<Tables<"QUIZ">[] | null>(null);
        return {
            user,
            quiz,
        };
    },
    actions: {
        async fetchLoggedInUser() {
            const { data: { user } } = await supabase.auth.getUser();
            const userID = user?.id;
            if (userID) {
                const { data: userData, error: userError } = await supabase.from("USER").select().eq("user_id", userID).single();
                const { data: quizData, error: quizError } = await supabase.from("QUIZ").select().eq("created_by", userID);
                if (userError) {
                    console.error("Error fetching user:", userError);
                    console.error("Error fetching quiz:", quizError);
                } else if (userData) {
                    this.quiz = quizData;
                    this.user = userData
            }
        }
    }
}});