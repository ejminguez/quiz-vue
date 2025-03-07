import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import type { Tables } from "../../database/types";

export const useLoggedInUserStore = defineStore("loggedInUserStore", {
    state: () => {
        const user = ref<Tables<"USER"> | null>(null);
        return {
            user,
        };
    },
    actions: {
        async fetchLoggedInUser() {
            const { data: { user } } = await supabase.auth.getUser();
            const userID = user?.id;
            if (userID) {
                const { data: userData, error: userError } = await supabase.from("USER").select().eq("user_id", userID).single();
                if (userError) {
                    console.error("Error fetching user:", userError);
                } else if (userData) {
                    this.user = userData
            }
        }
    }
}});