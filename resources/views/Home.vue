<template>
    <section class="flex flex-col gap-4 relative mt-20 mx-auto max-w-6xl">
        <img
            src="../assets/images/merchion-logo.png"
            alt="Logo"
            class="opacity-20 object-contain w-2/3 h-auto mx-auto absolute inset-0 flex items-center justify-center pointer-events-none"
            style="z-index: -1"
        />

        <h1 class="relative text-2xl font-bold">
            Bem Vindo {{ getUser?.nome }}
        </h1>

        <button
            class="bg-[#FF1808] w-full rounded-md py-2 text-white flex items-center justify-center max-w-sm self-center"
            @click="submit"
        >
            <span v-if="loading" class="flex items-center">
                <img
                    src="../assets/icons/loading.svg"
                    width="12"
                    height="12"
                    alt="carregando..."
                />
                Carregando...
            </span>
            <span v-else> Sair </span>
        </button>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { logoutApi } from "../api/authentication";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(false);

const getUser = computed(() => {
    const storage = localStorage.getItem("user");
    console.log(storage);
    if (!storage) {
        return {};
    }

    return JSON.parse(storage) ?? {};
});

async function submit() {
    loading.value = true;
    try {
        await logoutApi();

        router.replace("/login");
    } catch (exception) {
        console.log(exception);
    } finally {
        loading.value = false;
    }
}
</script>
