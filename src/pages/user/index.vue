<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'vue-router';
import { useLoggedInUserStore } from '@/stores/loggedInUserStore';
import { onMounted} from 'vue';

const router = useRouter();
const loggedInUserStore = useLoggedInUserStore();

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
})

</script>

<template>
    <section>
        <div class="grid gap-4">
            <h1>Welcome, {{ loggedInUserStore.user?.username }}</h1>
            <button type="button" @click="signOut"
                class="w-full bg-black text-white py-[9px] border-[1px] rounded-lg hover:bg-white hover:text-black border-white hover:border-black cursor-pointer transition-all duration-200 text-sm">Log
                out</button>
        </div>
    </section>
</template>