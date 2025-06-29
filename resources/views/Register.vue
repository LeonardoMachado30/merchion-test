<template>
    <section class="mx-auto max-w-sm">
        <form
            method="POST"
            @submit.prevent="submit"
            class="flex flex-col items-center justify-center gap-4 relative mt-[20%]"
        >
            <img
                src="../assets/images/merchion-logo.png"
                width="200"
                height="200"
                alt="logo"
            />

            <MInput
                v-model="nome"
                type="text"
                class="rounded-md w-full bg-[#D9D9D9] px-4 py-2"
                placeholder="Nome completo:"
            />

            <MInput
                v-model="email"
                type="email"
                class="rounded-md w-full bg-[#D9D9D9] px-4 py-2"
                placeholder="Email:"
            />

            <div class="w-full relative">
                <MInput
                    v-model="senha"
                    :type="mostrarSenha ? 'text' : 'password'"
                    class="rounded-md w-full bg-[#D9D9D9] px-4 py-2"
                    placeholder="Senha:"
                >
                    <template #append>
                        <button
                            type="button"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2"
                            @click="mostrarSenha = !mostrarSenha"
                            tabindex="-1"
                        >
                            <img
                                :src="
                                    mostrarSenha
                                        ? visibilityIcon
                                        : visibilityOffIcon
                                "
                                width="20"
                                height="20"
                                alt="Visualizar senha"
                            />
                        </button>
                    </template>
                </MInput>
            </div>

            <p v-if="registerError" class="text-[#FF1808] text-sm">
                {{ errorMessage }}
            </p>

            <button
                class="bg-[#FF1808] w-full rounded-md py-2 text-white flex items-center justify-center"
                :class="[
                    !nome || !email || !senha || loading ? 'opacity-75' : '',
                ]"
                type="submit"
                :disabled="!nome || !email || !senha || loading"
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
                <span v-else> Cadastrar </span>
            </button>

            <a
                href="/login"
                class="bg-[#D14723] w-full rounded-md py-2 text-white text-center"
            >
                Já tenho conta
            </a>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerApi } from "../api/authentication";
import type { UserRegister } from "../models/User";
import MInput from "../components/MInput.vue";
import visibilityIcon from "../assets/icons/visibility.svg";
import visibilityOffIcon from "../assets/icons/visibilityOff.svg";

const router = useRouter();

const nome = ref("");
const email = ref("");
const senha = ref("");
const mostrarSenha = ref(false);
const loading = ref(false);
const registerError = ref(false);
const errorMessage = ref("");

async function submit() {
    loading.value = true;
    registerError.value = false;

    try {
        const userData: UserRegister = {
            nome: nome.value,
            email: email.value,
            senha: senha.value,
        };

        const response = await registerApi(userData);

        // Após cadastro bem-sucedido, redireciona para login
        router.push("/login");
    } catch (exception: any) {
        registerError.value = true;
        errorMessage.value =
            exception.response?.data?.message || "Erro ao cadastrar usuário.";
        console.log(exception);
    } finally {
        loading.value = false;
    }
}
</script>
