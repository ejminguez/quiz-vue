<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue'
import type { Tables } from '../../../database/types';

const users = ref<Tables<'USER'>[]>([]);
const loading = ref(true);

// Self-invoking function to fetch data wowzers
(async () => {
    const { data, error } = await supabase.from('USER').select();
    if (error) console.log("error", error);
    if (data) users.value = data;
    loading.value = false;
    console.log("data", data);
})()

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
                <li v-for="user in users" :key="user.user_id">
                    <RouterLink :to="`/profile/${user.username}`">
                        <p>{{ user.username }}</p>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </section>
</template>