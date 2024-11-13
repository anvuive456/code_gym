<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AdminLogin",
    data: function () {
        return {
            username: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch("/admin/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });

                if (!response.ok) throw new Error("Đăng nhập thất bại");
                this.$router.push("/admin/branches"); // Điều hướng đến trang yêu cầu đăng nhập
            } catch (error: any) {
                this.errorMessage = error.message;
            }
        },
    },
});
</script>

<template>
    <article class="container">
        <header class="has-text-centered mb-5">
            <h3 class="title is-3">Admin Login</h3>
        </header>
        <form @submit.prevent="login">
            <div class="field">
                <label class="label" for="username">Username</label>
                <div class="control">
                    <input
                        v-model="username"
                        type="text"
                        class="input"
                        id="username"
                        name="username"
                        required
                    />
                </div>
            </div>
            <div class="field">
                <label class="label" for="password">Password</label>
                <div class="control">
                    <input
                        v-model="password"
                        type="password"
                        class="input"
                        id="password"
                        name="password"
                        required
                    />
                </div>
            </div>
            <p v-if="errorMessage" class="has-text-danger">
                {{ errorMessage }}
            </p>
            <footer class="mt-5">
                <button type="submit" class="button is-primary is-fullwidth">
                    Đăng nhập
                </button>
            </footer>
        </form>
    </article>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
}
</style>
