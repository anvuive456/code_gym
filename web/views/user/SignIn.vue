<script lang="ts">

import TimeTable from "../../components/TimeTable.vue";
import NavBar from "./NavBar.vue";
import Carousel from "../../components/Carousel.vue";
import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";


export default defineComponent({
    name: "SignIn",
    data: function() {
        return {
            username: '',
            role: 'user',   
            password: '',
            errorMessage: "",

        };
    },
    props: {
        userFullName: String,
    },
    components: { Footer, Header, NavBar, Carousel, TimeTable },
    methods: {
        async login() {
            try {
                const response = await fetch("/user/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: this.username, password: this.password }),
                });

                // Kiểm tra xem request có thành công hay không
                const data = await response.json();
                if (!response.ok){
                    this.errorMessage = data.message || "Đăng nhập thất bại";
                }else{ 
                    this.$router.push("/home"); // Điều hướng đến trang  
                }
            } catch (error: any) {
                this.errorMessage = error.message || "Lỗi kết nối!";
            }
        },
    },
});


</script>

<template>
    <NavBar :user-full-name="userFullName || ''" />
    <Header title="Đăng nhập" />
    <div class="w-50 mx-auto my-4">
        <form @submit.prevent="login" method="POST">
            <div class="form-group">
                <label for="username">Tên tài khoản</label>
                <input v-model="username" type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input v-model="password" type="password" class="form-control" id="password" name="password" required>
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>

            <button type="submit" class="btn btn-primary btn-block">Đăng ký</button>
        </form>
    </div>

    <Footer />


</template>

<style scoped>

</style>
