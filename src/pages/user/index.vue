<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'vue-router';
import { useLoggedInUserStore } from '@/stores/loggedInUserStore';
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faPencil);


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
                    <div class="w-[10%] h-10 bg-gray-300 mb-2 rounded-full"></div>
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

        <div v-if="!loading" class="grid gap-8 w-[25%] mx-auto text-center">
            <!-- user -->
            <h1 class="text-2xl">Welcome, <strong>{{ loggedInUserStore.user?.username }}</strong></h1>
            <!-- created quizzes -->
            <div v-if="loggedInUserStore.quiz?.length" class="grid gap-4">
                <h2 class="text-xl">Quizzes Created:</h2>
                <ul class="text-left grid gap-4">
                    <li v-for="quiz in loggedInUserStore.quiz" :key="quiz.quiz_id"
                        class="flex border-[1px] py-2 justify-between items-center px-6 rounded-lg">
                        <RouterLink :to="`/quiz/${quiz.title}`">{{ quiz.title }}</RouterLink>
                        <RouterLink :to="`/quiz/edit/${quiz.title}`">
                            <FontAwesomeIcon :icon="faPencil" class="cursor-pointer hover:scale-[115%]" />
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <!-- no quizzes created -->
            <div v-else class="grid gap-4">
                <h2 class="text-xl">Quizzes Created:</h2>
                <p>No quizzes created yet</p>
            </div>


            <div class="grid gap-4">
                <!-- create a quiz -->
                <RouterLink to="/quiz/create"
                    class="w-[50%] hover:bg-green-200 py-[9px] border-[1px] rounded-lg cursor-pointer transition-all duration-200 text-sm mx-auto">
                    Create a quiz</RouterLink>

                <!-- sign out -->
                <button type="button" @click="signOut"
                    class="w-[50%] bg-black text-white py-[9px] border-[1px] rounded-lg hover:bg-white hover:text-black border-white hover:border-black cursor-pointer transition-all duration-200 text-sm mx-auto">Sign
                    out
                </button>
            </div>


        </div>
    </section>
</template>