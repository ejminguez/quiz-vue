<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue'
import type { Tables } from '../../../database/types';

const quiz = ref<Tables<'QUIZ'>[]>([]);
const loading = ref(true);

// Self-invoking function to fetch data wowzers
(async () => {
    const { data, error } = await supabase.from('QUIZ').select();
    if (error) console.log("error", error);
    if (data) quiz.value = data;
    loading.value = false;
    console.log("data", data);
})()

</script>

<template>
    <section class="grid gap-4 text-center">
        <div>
            <h1 class="font-bold">QUIZZES</h1>
        </div>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <ol class="grid gap-4" type="1">
                <li v-for="quiz in quiz" :key="quiz.quiz_id">
                    <RouterLink :to="`/quiz/${quiz.title}`">
                        <p class="underline-offset-2 hover:underline">{{ quiz.title }}</p>
                    </RouterLink>
                </li>
            </ol>
        </div>
    </section>
</template>