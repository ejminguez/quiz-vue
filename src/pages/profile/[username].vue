<script setup lang="ts">
import { useIndividualUserStore } from '@/stores/individualUserStore';
import { onMounted, ref } from 'vue';
const individualUserStore = useIndividualUserStore();
const loading = ref(true);
onMounted(() => {
  individualUserStore.fetchIndividualUser();
  loading.value = false;
})
</script>

<template>
  <div class="text-center">
    <h1>WELCOME!</h1>
    <p v-if="individualUserStore.loading">Loading...</p>
    <div v-else>
      <p>Username: <strong>{{ individualUserStore.user?.username }}</strong></p>
      <p>Email Address: {{ individualUserStore.user?.email_address }}</p>
    </div>
    <div v-if="individualUserStore.quizzes.length">
      <h2>Quizzes Created:</h2>
      <ul>
        <li v-for="quiz in individualUserStore.quizzes" :key="quiz.quiz_id">
          <RouterLink :to="`/quiz/${quiz.title}`">
            <p class="underline-offset-4 hover:underline">{{ quiz.title }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No quizzes created by this user.</p>
    </div>
  </div>
</template>