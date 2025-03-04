<script lang="ts" setup>
import { useQuizStore } from '@/stores/quizStore';
import { ref, onMounted } from 'vue';

const quizStore = useQuizStore();
const loading = ref(true);
const scrollToTop = () => window.scrollTo(0, 0);

onMounted(async () => {
    await quizStore.fetchQuiz();
    loading.value = false;
    scrollToTop();
});
</script>

<template>
    <section class="grid gap-8 text-center w-full">
        <div>
            <RouterLink to="/edit">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Create a Quiz</button>
            </RouterLink>
        </div>
        <div>
            <h1 class="font-bold text-3xl">QUIZZES</h1>
        </div>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <ul class="flex flex-col w-[30%] mx-auto">
                <li v-for="quiz in quizStore.quiz" :key="quiz.quiz_id" class="border-[1px] py-2 px-8">
                    <RouterLink :to="`/quiz/${quiz.title}`">
                        <p class="hover:font-bold transition-all duration-200">{{ quiz.title }}</p>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </section>
</template>