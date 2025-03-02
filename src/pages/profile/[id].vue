<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
    <h1>Welcome, {{ route.params?.id }}</h1>
</template>