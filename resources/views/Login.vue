<template>
    <section class="mx-auto max-w-sm">
        <form
            method="POST"
            @submit.prevent="submit"
            class="flex flex-col items-center justify-center gap-4 relative mt-[40%]"
        >
            <img
                src="../assets/images/merchion-logo.png"
                width="200"
                height="200"
                alt="logo"
            />
            <input
                v-model="email"
                type="email"
                class="rounded-md w-full bg-[#D9D9D9] px-4 py-2"
                placeholder="Email:"
            />

            <div class="w-full relative">
                <input
                    v-model="senha"
                    :type="mostrarSenha ? 'text' : 'password'"
                    class="rounded-md w-full bg-[#D9D9D9] px-4 py-2"
                    placeholder="Senha:"
                />

                <!-- INSERT_YOUR_CODE -->
                <button
                    type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                    @click="mostrarSenha = !mostrarSenha"
                    tabindex="-1"
                >
                    <Transition name="fade">
                        <span v-if="mostrarSenha">
                            <!-- Ícone de ocultar senha (olho cortado) -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575M6.22 6.22A9.956 9.956 0 0112 5c5 0 9 4.03 9 9 0 1.657-.403 3.22-1.125 4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.78 9.78l18-18"
                                />
                            </svg>
                        </span>
                        <span v-else>
                            <!-- Ícone de ver senha (olho aberto) -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0c-1.74 4.5-6.26 7.5-10.5 7.5S2.24 16.5.5 12C2.24 7.5 6.74 4.5 12 4.5s9.26 3 10.5 7.5z"
                                />
                            </svg>
                        </span>
                    </Transition>
                </button>
            </div>

            <p class="text-[#FF1808] text-sm">Email ou senha incorreto.</p>

            <button
                class="bg-[#FF1808] w-full rounded-md py-2 text-white flex items-center justify-center"
                :class="[!email || !senha || loading ? 'opacity-75' : '']"
                type="submit"
                :disabled="!email || !senha || loading"
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
                <span v-else> Entrar </span>
            </button>

            <button class="bg-[#D14723] w-full rounded-md py-2 text-white">
                Cadastrar
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { loginApi } from "../api/authentication";
import { ref } from "vue";

const router = useRouter();

const email = ref("");
const senha = ref("");
const mostrarSenha = ref(false);
const loading = ref(false);

async function submit() {
    loading.value = true;
    try {
        const response = await loginApi({
            email: email.value,
            senha: senha.value,
        });

        router.push("/");
    } catch (exception) {
        console.log(exception);
    } finally {
        loading.value = false;
    }
}
</script>
