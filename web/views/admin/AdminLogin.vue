<!-- option api -->
<script  lang="ts">
import { defineComponent, ref } from "vue";

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
                this.$router.push("/admin"); // Điều hướng đến trang yêu cầu đăng nhập
            } catch (error: any) {
                this.errorMessage = error.message;
            }
        },
    },
});
 
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <h3 class="text-center">Admin Login</h3>
            <!--            <div class="alert alert-danger"><%= error %></div>-->
            <form @submit.prevent="login" method="POST">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        v-model="username"
                        type="text"
                        class="form-control"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <p v-if="errorMessage">{{ errorMessage }}</p>

                <button type="submit" class="btn btn-primary btn-block">
                    Đăng nhập
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
