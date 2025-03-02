<script setup>
</script>

<template>
    <div>
        <nav class="px-2">
            <ul class="flex justify-between lg:justify-center lg:gap-4">
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/quiz">Quizzes</RouterLink>
                </li> 
                <li>
                    <RouterLink to="/about">About</RouterLink>
                </li>
                <li>
                    <RouterLink to="/profile/errol">Profile</RouterLink>
                </li>
                <li>
                    <RouterLink to="/leaderboard">Leaderboard</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>