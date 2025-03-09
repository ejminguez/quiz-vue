<script setup lang="ts">
import { useIndividualUserStore } from '@/stores/individualUserStore';
import { onMounted, ref } from 'vue';
const individualUserStore = useIndividualUserStore();
const loading = ref(true);
onMounted(async () => {
  individualUserStore.fetchIndividualUser();
  await delay(700)
  loading.value = false;
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})
</script>

<template>
  <div class="text-center grid gap-8 w-full">
    <h1 class="text-3xl">WELCOME!</h1>
    <div v-if="individualUserStore.loading" class="w-[30%] mx-auto">
                <div class="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <!-- Header -->
                    <div class="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                    <!-- Body -->
                    <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
                    <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
                    <div class="w-1/2 h-8 bg-gray-300 rounded"></div>
                </div>
        </div>
    <div v-else class="w-[30%] mx-auto">
      <p>Username: <strong>{{ individualUserStore.user?.username }}</strong></p>
      <p>Email Address: {{ individualUserStore.user?.email_address }}</p>
    </div>
    <div v-if="individualUserStore.quizzes.length" class="grid gap-2 w-[30%] mx-auto">
      <h2>Quizzes Created:</h2>
      <ul>
        <li v-for="quiz in individualUserStore.quizzes" :key="quiz.quiz_id" class="border py-2 px-8">
          <RouterLink :to="`/quiz/${quiz.title}`">
            <p class="hover:font-bold transition-all duration-200">{{ quiz.title }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No quizzes created by this user.</p>
    </div>
  </div>
</template>