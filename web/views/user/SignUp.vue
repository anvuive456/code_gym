<script  lang="ts">

import TimeTable from "../../components/TimeTable.vue";
import NavBar from "./NavBar.vue";
import Carousel from "../../components/Carousel.vue";
import { defineComponent } from "vue";
import Header from "./Header.vue";  
import Footer from "./Footer.vue";
import { register } from "module";
export default defineComponent({
    name: "SignIn",
    data: function() {
        return {username: '',
                password: '',
                email: '',
                fullName: '',
                phone: '',
                gender: '',
                errorMessage: "",

        };
    }, 
    components: { Footer, Header, NavBar, Carousel, TimeTable },
    methods: {
        async register() {
            try {
                const response = await fetch("/user/signup", {
                    method: "POST", 
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.fullName,
                    phone: this.phone,
                    gender: this.gender,}),
                });

                // Kiểm tra xem request có thành công hay không
                const data = await response.json();
                if (!response.ok){
                    this.errorMessage = data.message || "Đăng ky thất bại";
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
    <NavBar  />
    <Header title="Đăng ký"/>

    <div class="w-50 mx-auto my-4">
        <form @submit.prevent="register"  method="POST"> 
            <div class="form-group">
                <label for="username">Tên tài khoản</label>
                <input type="text" v-model="username" class="form-control" id="username" name="username" required>
                <small class="text-muted">Dùng để đăng nhập</small>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="password" v-model="password"  class="form-control" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="email"  class="form-control" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="name">Họ và tên</label>
                <input type="text" v-model="fullName" class="form-control" id="name" name="name" required>
            </div>

            <div class="form-group">
                <label for="phone">Số điện thoại</label>
                <input type="text" v-model="phone" class="form-control" id="phone" name="phone" required>
            </div>

            <div class="form-group">
                <label for="gender">Giới tính</label>
                <div id="gender" class="form-check">
                    <input class="form-check-input" v-model="gender"  type="radio" name="gender" id="male" value="male">
                    <label class="form-check-label" for="male">
                        Nam
                    </label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" v-model="gender"  type="radio" name="gender" id="female" value="female">
                    <label class="form-check-label" for="female">
                        Nữ
                    </label>
                </div>
            </div>



            <button type="submit" class="btn btn-primary btn-block">Đăng ký</button>
        </form>
    </div>

    <Footer/>

</template>

<style scoped>

</style>
