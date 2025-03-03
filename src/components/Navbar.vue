<script setup lang="ts">
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPenNib, faCircleInfo, faUser, faRankingStar } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faPenNib, faCircleInfo, faUser, faRankingStar);
const route = useRoute();
</script>

<template>
    <div>
        <nav class="px-2">
            <ul class="flex justify-between lg:justify-center lg:gap-10">
                <li>
                    <RouterLink :to="'/'" :class="{ 'underline': route.path === '/' }" class="flex items-center gap-2">
                        <FontAwesomeIcon :icon="faHome" />
                        Home
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/quiz'" :class="{ 'underline': route.path === '/quiz' }" class="flex items-center gap-2">
                        <FontAwesomeIcon :icon="faPenNib" />
                        Quizzes
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/leaderboard'" :class="{ 'underline': route.path === '/leaderboard' }" class="flex items-center gap-2">
                        <FontAwesomeIcon :icon="faRankingStar" />
                        Leaderboard
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/profile/errol'" :class="{ 'underline': route.path === '/profile/errol' }" class="flex items-center gap-2">
                        <FontAwesomeIcon :icon="faUser" />
                        Profile
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/about'" :class="{ 'underline': route.path === '/about' }" class="flex items-center gap-2">
                        <FontAwesomeIcon :icon="faCircleInfo" />
                        About
                    </RouterLink>
                </li>
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