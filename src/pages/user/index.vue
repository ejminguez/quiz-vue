<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'vue-router';
import { useLoggedInUserStore } from '@/stores/loggedInUserStore';
import { onMounted, ref } from 'vue';

const router = useRouter();
const loggedInUserStore = useLoggedInUserStore();
const loading = ref(true);

const signOut = async () => {
    console.log('Signing out');
    let { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error signing out:', error.message);
        return;
    }
    router.push('/auth/signIn');
}

onMounted(async () => {
    await loggedInUserStore.fetchLoggedInUser();
    await delay(500)
    if (!loggedInUserStore.user) {
        router.push('/user/create');
    }
    loading.value = false;
})


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<template>
    <section class="w-full">

        <div v-if="loading" class="w-[30%] mx-auto">
            <div class="bg-white rounded-lg shadow-md p-8 animate-pulse grid gap-4">
                <!-- Header -->
                <div class="flex gap-4 items-center">
                    <div class="w-[10%] h-10 bg-gray-300 rounded mb-2 rounded-full"></div>
                    <div class="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                </div>
                <!-- Body -->
                <div>
                    <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
                    <div class="w-full h-8 bg-gray-300 rounded mb-2"></div>
                    <div class="w-1/2 h-8 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>

        <div v-if="!loading" class="grid gap-6 w-[25%] mx-auto text-center">
            <h1 class="text-2xl">Welcome, <strong>{{ loggedInUserStore.user?.username }}</strong></h1>
            <button type="button" @click="signOut"
                class="w-[50%] bg-black text-white py-[9px] border-[1px] rounded-lg hover:bg-white hover:text-black border-white hover:border-black cursor-pointer transition-all duration-200 text-sm mx-auto">Log
                out</button>
        </div>
    </section>
</template>