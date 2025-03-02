<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue'

const users = ref<any[]>([]);
const loading = ref(true);

// Self-invoking function to fetch data wowzers
(async () => {
    const { data, error } = await supabase.from("USER").select();
    if (error) console.log("error", error);
    if (data) users.value = data;
    loading.value = false;
    console.log("data", data);
})()

</script>

<template>
    <section class="grid gap-4">
        <div>
            <h1 class="font-bold">LEADERBOARDS</h1>
        </div>
        <div v-if="loading" class="text-center">
            <p>Loading...</p>
        </div>
        <div v-else>
            <ul class="grid text-center">
                <li v-for="user in users" :key="user.user_id">
                    <p>{{ user.username }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>