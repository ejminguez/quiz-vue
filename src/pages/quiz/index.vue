<script lang="ts" setup>
import { useQuizStore } from '@/stores/quizStore';
import { ref, onMounted } from 'vue';

const quizStore = useQuizStore();
const loading = ref(true);
const scrollToTop = () => window.scrollTo(0, 0);

onMounted(async () => {
    await quizStore.fetchQuiz();
    await delay(500)
    loading.value = false;
    scrollToTop();

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
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
        <div v-if="loading" class="w-[30%] mx-auto">
                <div class="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <!-- Header -->
                    <div class="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                    <!-- Body -->
                    <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
                    <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
                    <div class="w-1/2 h-8 bg-gray-300 rounded"></div>
                </div>
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
