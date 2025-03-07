<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter()
const authStore = useAuthStore()


let email = ref("");
let password = ref("");


const login = async () => {
    console.log(email.value, password.value);

    let { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        console.error('Error:', error.message);
        window.alert("Invalid login credentials. Try again!");
        window.location.reload();
    } else {
        console.log('Success:', data);
        router.push('/quiz');
    }
};

onMounted(() => {
    if (authStore.user) {
        router.replace('/') // Redirect immediately if logged in
    }
})

</script>

<template>
    <section class="w-full" v-if="!authStore.user">
        <form class="grid w-[30%] bg-slate-50 p-8 mx-auto gap-12 shadow-md rounded-lg">
            <div>
                <h1 class="text-center text-2xl">Sign in to your account</h1>
            </div>
            <div class="grid gap-4">
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-[13px] text-gray-500">Email Address</label>
                    <input name="email" type="text" placeholder="Email Address" v-model="email" autocomplete="email"
                        class="border border-gray-300 px-4 py-2 rounded-md text-sm" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="password" class="text-[13px] text-gray-500">Password</label>
                    <input name="password" type="password" placeholder="Password" v-model="password"
                        autocomplete="current-password" class="border border-gray-300 px-4 py-2 rounded-md text-sm"
                        @keyup.enter="login" />
                </div>
                <div class="flex justify-between">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="remember" class="cursor-pointer h-[15px] w-[15px]"
                            @keyup.enter="login" />
                        <label for="remember" class="cursor-pointer text-[13px]">Remember me</label>
                    </div>
                    <div>
                        <p class="text-[13px] cursor-pointer underline -underline-offset-4">Forgot
                            Password?</p>
                    </div>
                </div>
                <button type="button" @click="login"
                    class="w-full bg-black text-white py-[9px] border-[1px] rounded-lg hover:bg-white hover:text-black border-white hover:border-black cursor-pointer transition-all duration-200 text-sm">Sign
                    in</button>
                <div class="text-center">
                    <p class="text-sm">Don't have an account? <RouterLink to="/auth/signUp"
                            class="cursor-pointer font-bold">Sign Up</RouterLink>
                    </p>
                </div>
            </div>
        </form>
    </section>
</template>