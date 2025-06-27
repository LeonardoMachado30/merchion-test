import api from ".";
import type { UserResume } from "@/models/User";

export async function loginApi({ email, senha }: UserResume) {
    try {
        const response = await api.post("/login", { email, senha });

        if (response.data.code === 200) {
            const token = response.data.data.token;
            const token_type = response.data.data.token_type;
            console.log(response.data.data.user);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            );
            localStorage.setItem("token", `${token_type} ${token}`);

            return response.data;
        }
    } catch (exception) {
        console.error(exception);
        throw exception;
    }
}

export async function logoutApi() {
    try {
        const getToken = localStorage.getItem("token");
        const response = await api.post("/logout", null, {
            headers: {
                Authorization: `Bearer ${getToken}`,
            },
        });

        if (response.data.code === 200 || response.data.code === 400) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            return true;
        }
    } catch (exception) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.error(exception);
        throw exception;
    }
}
