<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

let email = ref("");
let password = ref("");
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false); // To disable button while processing

const signUp = async () => {
    if (!email.value || !password.value) {
        window.alert("Please fill in all fields.");
        return;
    }

    loading.value = true;

    let { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    });

    loading.value = false;

    if (error) {
        console.error('Error:', error.message);
        window.alert(error.message);
    } else {
        console.log('Success:', data);

        // Check if email confirmation is required
        if (data.user && !data.session) {
            window.alert("Signup successful! Please check your email to verify your account.");
        } else {
            authStore.user = data.user;
            router.push('/quiz');
        }
    }
};

// Prevent logged-in users from accessing signup page
onMounted(() => {
    if (authStore.user) {
        router.replace('/');
    }
});
</script>

<template>
    <section class="w-full">
        <form @submit.prevent="signUp" class="grid w-[30%] bg-slate-50 p-8 mx-auto gap-12 shadow-md rounded-lg">
            <div>
                <h1 class="text-center text-2xl">Create an Account</h1>
            </div>
            <div class="grid gap-4">
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-[13px] text-gray-500">Email Address</label>
                    <input id="email" type="email" placeholder="Email Address" v-model="email" autocomplete="email"
                        class="border border-gray-300 px-4 py-2 rounded-md text-sm" required />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="password" class="text-[13px] text-gray-500">Password</label>
                    <input id="password" type="password" placeholder="Password" v-model="password" autocomplete="new-password"
                        class="border border-gray-300 px-4 py-2 rounded-md text-sm" required />
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full bg-black text-white py-[9px] border-[1px] rounded-lg hover:bg-white hover:text-black border-white hover:border-black cursor-pointer transition-all duration-200 text-sm"
                    :class="{ 'opacity-50 cursor-not-allowed': loading }">
                    {{ loading ? "Creating Account..." : "Create an Account" }}
                </button>
                <div class="text-center">
                    <p class="text-sm">Already have an account?
                        <RouterLink to="/auth/signIn" class="cursor-pointer font-bold">Sign in</RouterLink>
                    </p>
                </div>
            </div>
        </form>
    </section>
</template>
