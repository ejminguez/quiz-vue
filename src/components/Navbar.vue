<script setup lang="ts">
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPenNib, faCircleInfo, faUser, faRankingStar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faPenNib, faCircleInfo, faUser, faRankingStar);
const route = useRoute();
</script>

<template>
    <div>
        <nav class="px-2">
            <ul class="flex justify-between w-[95%] mx-auto items-center">
                <div class="flex gap-8">
                    <li>
                        <RouterLink :to="'/'" :class="{ 'underline': route.path === '/' }"
                            class="flex items-center gap-2 hover:underline underline-offset-8">
                            <FontAwesomeIcon :icon="faHome" />
                            Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="'/quiz'" :class="{ 'underline': route.path === '/quiz' }"
                        class="flex items-center gap-2 hover:underline underline-offset-8">
                            <FontAwesomeIcon :icon="faPenNib" />
                            Quiz
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="'/leaderboard'" :class="{ 'underline': route.path === '/leaderboard' }"
                            class="flex items-center gap-2 hover:underline underline-offset-8">
                            <FontAwesomeIcon :icon="faRankingStar" />
                            Leaderboards
                        </RouterLink>
                    </li>
                </div>
                <div class="flex gap-4 items-center">
                    <div class="flex gap-2 items-center border border-gray-300 px-4 py-1 rounded-md">
                        <FontAwesomeIcon :icon="faMagnifyingGlass" />
                        <input type="text" placeholder="Search" class="p-1 focus:outline-none" />
                    </div>
                    <li>
                        <RouterLink :to="'/profile/errol'" :class="{ 'underline': route.path === '/profile/errol' }"
                            class="flex items-center gap-2 hover:underline underline-offset-8">
                            <div class="border-[1px] w-10 h-10 rounded-full flex justify-center items-center bg-white hover:bg-slate-300 transition-all duration-200">
                                <FontAwesomeIcon :icon="faUser" />
                            </div>
                        </RouterLink>
                    </li>
                </div>
            </ul>
        </nav>
    </div>
</template>

<style>
.underline {
    text-decoration: underline;
    text-underline-offset: 10px;
}
</style>