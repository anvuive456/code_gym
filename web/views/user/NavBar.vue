<script>
export default {
    name: "NavBar",
    data() {
        return {
            active: '/home', // Giá trị này sẽ được cập nhật dựa trên route hiện tại
            userFullName: null, // Đặt tên người dùng, hoặc đặt null nếu chưa đăng nhập
        };
    },
    methods: {
        isActive(route) {
           return this.active.startsWith(route);
        }
    },
    mounted() {
        // Kiểm tra thông tin đăng nhập hoặc cập nhật userFullName nếu có thể
        // this.userFullName = 'Tên Người Dùng';
    }
};
</script>
<template>
    <!-- Navbar Start -->
    <div class="container-fluid p-0 nav-bar">
        <nav class="navbar navbar-expand-lg navbar-dark py-3">
            <a href="/" class="navbar-brand">
                <h1 class="m-0 display-4 font-weight-bold text-uppercase text-white">CodeGym</h1>
            </a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div class="navbar-nav ml-auto p-4 bg-secondary">
                    <a href="/home" class="nav-item nav-link" :class="{ active: isActive('/home') }">Trang chủ</a>
                    <a href="/about" class="nav-item nav-link" :class="{ active: isActive('/about') }">Giới thiệu</a>
                    <a href="/feature" class="nav-item nav-link" :class="{ active: isActive('/feature') }">Our Features</a>
                    <a href="/branch" class="nav-item nav-link" :class="{ active: isActive('/branch') }">Chi nhánh</a>
                    <a href="/contact" class="nav-item nav-link" :class="{ active: isActive('/contact') }">Contact</a>

                    <template v-if="userFullName">
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="profileDropdown" role="button" data-toggle="dropdown">
                                Xin chào, {{ userFullName }}
                            </a>
                            <ul class="dropdown-menu text-capitalize" aria-labelledby="profileDropdown">
                                <li><a class="dropdown-item" href="/profile">Hồ sơ</a></li>
                                <li><a class="dropdown-item" href="/schedule">Lịch trình</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-primary" href="/signout">Đăng xuất</a></li>
                            </ul>
                        </div>
                    </template>
                    <template v-else>
                        <a href="/signin" class="btn btn-primary mr-4">Đăng nhập</a>
                        <a href="/signup" class="btn btn-outline-light">Đăng ký</a>
                    </template>
                </div>
            </div>
        </nav>
    </div>
    <!-- Navbar End -->
</template>
<style scoped>
</style>
