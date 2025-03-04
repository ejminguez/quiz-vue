<script lang="ts" setup>
import { useQuizStore } from '@/stores/quizStore';
import { ref, onMounted } from 'vue';

const quizStore = useQuizStore();
const loading = ref(true);

onMounted(async () => {
    await quizStore.fetchQuiz();
    loading.value = false;
});
</script>

<template>
    <section class="grid gap-4 text-center">
        <div>
            <RouterLink to="/edit">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Create a Quiz</button>
            </RouterLink>
        </div>
        <div>
            <h1 class="font-bold">QUIZZES</h1>
        </div>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <ol class="grid gap-4" type="1">
                <li v-for="quiz in quizStore.quiz" :key="quiz.quiz_id">
                    <RouterLink :to="`/quiz/${quiz.title}`">
                        <p class="underline-offset-8 hover:underline">{{ quiz.title }}</p>
                    </RouterLink>
                </li>
            </ol>
        </div>
    </section>
</template>