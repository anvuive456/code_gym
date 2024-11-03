<script setup lang="ts">

import Header from "./Header.vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
</script>

<template>
    <NavBar />
    <Header title="Đăng ký"/>

    <div class="w-50 mx-auto my-4">
        <form action="/signup" method="POST">
            <div class="form-group">
                <label for="username">Tên tài khoản</label>
                <input type="text" class="form-control" id="username" name="username" required>
                <small class="text-muted">Dùng để đăng nhập</small>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="name">Họ và tên</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>

            <div class="form-group">
                <label for="phone">Số điện thoại</label>
                <input type="text" class="form-control" id="phone" name="phone" required>
            </div>

            <div class="form-group">
                <label for="gender">Giới tính</label>
                <div id="gender" class="form-check">
                    <input class="form-check-input" type="radio" name="gender" id="male" value="male">
                    <label class="form-check-label" for="male">
                        Nam
                    </label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="gender" id="female" value="female">
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
