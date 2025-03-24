<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const userStore = useUserStore();
const loading = ref(true);

onMounted(async () => {
  await userStore.fetchUsers();
  await delay(100);
  loading.value = false
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<template>
  <section class="flex flex-col gap-8 text-center w-full">
    <div class="flex items-center gap-2 mx-auto">
      <span>----</span>
      <FontAwesomeIcon :icon="faStar" />
      <h1 class="font-bold text-3xl">LEADERBOARDS</h1>
      <FontAwesomeIcon :icon="faStar" />
      <span>----</span>
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
      <ul class="flex flex-col w-[30%] mx-auto gap-8">
        <li v-for="user in userStore.users" :key="user.user_id" class="border px-20 py-2 rounded-lg">
          <RouterLink :to="`/profile/${user.username}`">
            <p class="hover:font-bold transition-all duration-200">{{ user.username }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>