<script setup lang="ts">
const { app } = useAppConfig()
const FEATURES = app.features;
</script>

<template>
    <div class="grid grid-cols-4 gap-4 mt-6 content-center align-center">
        <div
            v-for="(item, index) in FEATURES"
            :key="index"
            class="flex flex-col justify-center items-center bg-white/20 shadow-lg ring-1 ring-black/5 h-[100px] rounded-2xl transition duration-600 opacity-50 cursor-pointer hover:opacity-100 hover:shadow-white-100/10 hover:shadow-2xl"
        >
        <UIcon :name="item.icon" size="32" />
        <div>{{ item.label }}</div>
        </div>
    </div>
</template>