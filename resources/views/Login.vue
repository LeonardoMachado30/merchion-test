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

            <p v-if="loginError" class="text-[#FF1808] text-sm">
                Email ou senha incorreto.
            </p>

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

            <a
                href="/cadastrar"
                class="bg-[#D14723] w-full rounded-md py-2 text-white text-center"
            >
                Cadastrar
            </a>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "../api/authentication";
import MInput from "../components/MInput.vue";
import visibilityIcon from "../assets/icons/visibility.svg";
import visibilityOffIcon from "../assets/icons/visibilityOff.svg";

const router = useRouter();

const email = ref("");
const senha = ref("");
const mostrarSenha = ref(false);
const loading = ref(false);
const loginError = ref(false);

async function submit() {
    loading.value = true;
    try {
        const response = await loginApi({
            email: email.value,
            senha: senha.value,
        });

        router.push("/");
    } catch (exception) {
        loginError.value = true;
        console.log(exception);
    } finally {
        loading.value = false;
    }
}
</script>
