<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const username = ref("");
const email = ref(""); 
const user = useAuthStore();

const createUser = async () => {
    
    if (!username.value || !email.value) {
        window.alert('Username and email are required');
        return;
    }

    const { data, error } = await supabase
        .from('USER')
        .insert([
            { user_id: user.user?.id, username: username.value, email_address: email.value },
        ])
        .select();

    if (error) {
        console.error(error);
        return;
    } else {
        console.log(data);
        router.push('/user');
    }
}

onMounted(() => {
    if (user.user?.email) {
        email.value = user.user.email;
    }
});

</script>

<template>
    <section class="grid gap-16">
        <h1 class="text-3xl">You need to create a username</h1>
        <form>
            <div class="grid gap-4">
                <div class="flex flex-col gap-2">
                    <label for="username" class="text-[13px] text-gray-500">Username</label>
                    <input name="username" type="text" placeholder="Username" v-model="username" autocomplete="email"
                        class="border border-gray-300 px-4 py-2 rounded-md text-sm" @keyup.enter="createUser" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-[13px] text-gray-500">Email</label>
                    <input name="email" type="email" v-model="email"
                        autocomplete="email" class="border border-gray-300 px-4 py-2 rounded-md text-sm"
                        @keyup.enter="createUser" />
                </div>
                <div>
                    <button type="button" @click="createUser"
                        class="w-full bg-black text-white py-[9px] border-[1px] rounded-lg hover:bg-white hover:text-black border-white hover:border-black cursor-pointer transition-all duration-200 text-sm">Create
                        User</button>
                </div>
            </div>
        </form>
    </section>
</template>