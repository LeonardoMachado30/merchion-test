<template>
    <div class="w-full relative">
        <slot name="prepend"></slot>
        <input
            v-model="model"
            :type="props.type"
            :id="props.id"
            :class="['rounded-md w-full bg-[#D9D9D9] px-4 py-2', props.class]"
            :placeholder="props.placeholder"
        />
        <slot name="append"></slot>
    </div>
</template>

<script setup lang="ts">
const model = defineModel();

const props = defineProps<{
    type?: string;
    class?: string;
    placeholder?: string;
    id?: string;
    label?: string;
}>();
</script>
