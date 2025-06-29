import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/cadastrar", component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    // Rotas públicas que não precisam de autenticação
    const publicRoutes = ["/login", "/cadastrar"];

    // Se o usuário não está autenticado e não está indo para uma rota pública, redireciona para /login
    if (!token && !publicRoutes.includes(to.path)) {
        next({ path: "/login" });
    }
    // Se o usuário está autenticado e tenta acessar uma rota pública, redireciona para a home
    else if (token && publicRoutes.includes(to.path)) {
        next({ path: "/" });
    }
    // Caso contrário, permite a navegação normalmente
    else {
        next();
    }
});

export default router;
