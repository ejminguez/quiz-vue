<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const userStore = useUserStore();
const loading = ref(true);

onMounted(async () => {
  await userStore.fetchUsers();
  loading.value = false;
});
</script>

<template>
  <section class="flex flex-col gap-8 text-center w-full">
    <div class="flex items-center gap-2 mx-auto">
      <span>----</span>
      <FontAwesomeIcon :icon="faStar"/>
      <h1 class="font-bold text-3xl">LEADERBOARDS</h1>
      <FontAwesomeIcon :icon="faStar"/>
      <span>----</span>
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <ul class="flex flex-col w-[30%] mx-auto">
        <li v-for="user in userStore.users" :key="user.user_id" class="border px-20 py-2">
          <RouterLink :to="`/profile/${user.username}`">
            <p class="hover:font-bold transition-all duration-200">{{ user.username }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>