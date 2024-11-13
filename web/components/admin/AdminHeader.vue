<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AdminHeader",
});
</script>

<template>
    <nav
        class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0"
    >
        <a href="/" class="navbar-brand d-flex d-lg-none me-4">
            <h2 class="text-primary mb-0">
                <i class="fa fa-hashtag"></i>
            </h2>
        </a>
        <button class="sidebar-toggler flex-shrink-0 border-0 bg-transparent">
            <i class="fa fa-bars"></i>
        </button>
        <form class="d-none d-md-flex ms-4" @submit.prevent>
            <input
                class="form-control border-0 shadow-sm"
                type="search"
                placeholder="Search"
            />
        </form>
        <div class="navbar-nav align-items-center ms-auto">
            <div class="nav-item dropdown">
                <a
                    href="#"
                    class="nav-link dropdown-toggle d-flex align-items-center"
                    data-bs-toggle="dropdown"
                >
                    <img
                        class="rounded-circle me-2"
                        src="http://localhost:3000/images/user.jpg"
                        alt="User Avatar"
                        style="width: 40px; height: 40px"
                    />
                    <span class="d-none d-lg-inline-flex">John Doe</span>
                </a>
                <ul
                    class="dropdown-menu dropdown-menu-end bg-light border-0 shadow-sm m-0"
                >
                    <li><a href="#" class="dropdown-item">My Profile</a></li>
                    <li><a href="#" class="dropdown-item">Settings</a></li>
                    <li><a href="#" class="dropdown-item">Log Out</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>
