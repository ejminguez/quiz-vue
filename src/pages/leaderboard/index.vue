<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const loading = ref(true);

onMounted(async () => {
  await userStore.fetchUsers();
  loading.value = false;
});
</script>

<template>
  <section class="grid gap-4 text-center">
    <div>
      <h1 class="font-bold">LEADERBOARDS</h1>
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <ul class="grid">
        <li v-for="user in userStore.users" :key="user.user_id">
          <RouterLink :to="`/profile/${user.username}`">
            <p>{{ user.username }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>