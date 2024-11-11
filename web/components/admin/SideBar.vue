<script lang="ts">
import { defineComponent } from "vue"; 
export default defineComponent({
    name: "SideBar",
});
</script>
<template>
    <div class="sidebar pe-4 pb-3">
        <nav class="navbar bg-light navbar-light">
            <a href="index.html" class="navbar-brand mx-4 mb-3">
                <h3 class="text-primary">
                    <i class="fa fa-hashtag me-2"></i>ADMIN
                </h3>
            </a>

            <div class="d-flex align-items-center ms-4 mb-4">
                <div class="position-relative">
                    <img
                        class="rounded-circle"
                        src="http://localhost:3000/images/user.jpg"
                        alt=""
                        style="width: 40px; height: 40px"
                    />
                    <div
                        class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"
                    ></div>
                </div>
                <div class="ms-3">
                    <h6 class="mb-0">Hoang Han</h6>
                    <span>Admin</span>
                </div>
            </div>
            <div class="navbar-nav w-100">
                <a
                    href="http://localhost:3000//admin/signin"
                    class="nav-item nav-link"
                    ><i class="fa fa-tachometer-alt me-2"></i>Chi nhánh</a
                >

                <a href="/admin/signin" class="nav-item nav-link"
                    ><i class="fa fa-th me-2"></i>Học viên</a
                >
                <a href="widget.html" class="nav-item nav-link"
                    ><i class="fa fa-keyboard me-2"></i>Báo cáo</a
                >
                <a href="widget.html" class="nav-item nav-link"
                    ><i class="fa fa-keyboard me-2"></i>Gói tập</a
                >
            </div>
        </nav>
    </div>
</template>
<style scoped></style>
