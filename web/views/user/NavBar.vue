<script setup lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import useSession from '../../hooks/useSession';

  
         const session =useSession();
        watchEffect(()=>{
            console.log('session data::',session.sessionData);
        })
        const toggleNavbarMethod = () => {
            if (window.innerWidth > 992) {
                const dropdowns = document.querySelectorAll('.navbar .dropdown'); 
                dropdowns.forEach((dropdown) => {
                    dropdown.addEventListener('mouseover', handleMouseOver);
                    dropdown.addEventListener('mouseout', handleMouseOut);
                });
            } else {
                removeDropdownListeners();
            }
        };

        const handleMouseOver = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const dropdownToggle = target.querySelector('.dropdown-toggle') as HTMLElement;
            dropdownToggle?.click();
        };

        const handleMouseOut = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const dropdownToggle = target.querySelector('.dropdown-toggle') as HTMLElement;
            dropdownToggle?.click();
            dropdownToggle?.blur();
        };

        const removeDropdownListeners = () => {
            const dropdowns = document.querySelectorAll('.navbar .dropdown');
            dropdowns.forEach((dropdown) => {
                dropdown.removeEventListener('mouseover', handleMouseOver);
                dropdown.removeEventListener('mouseout', handleMouseOut);
            });
        };

        onMounted(() => {
            toggleNavbarMethod();
            session.fetchSession();
            window.addEventListener('resize', toggleNavbarMethod);
        });

        onBeforeUnmount(() => {
            removeDropdownListeners();
            window.removeEventListener('resize', toggleNavbarMethod);
        });
 
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
                    <a href="/home" class="nav-item nav-link">Trang chủ</a>
                    <a href="/about" class="nav-item nav-link" >Giới thiệu</a>
                    <a href="/feature" class="nav-item nav-link" >Our
                        Features</a>
                    <a href="/branch" class="nav-item nav-link" >Chi nhánh</a>
                    <a href="/contact" class="nav-item nav-link" >Contact</a>

                    <template v-if="session.sessionData.value?.fullname" >
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="profileDropdown" role="button"
                               data-toggle="dropdown">
                                Xin chào, {{ session.sessionData.value?.fullname }}
                            </a>
                            <ul class="dropdown-menu text-capitalize" aria-labelledby="profileDropdown">
                                <li><a class="dropdown-item" href="/user/profile">Hồ sơ</a></li>
                                <li><a class="dropdown-item" href="/schedule">Lịch trình</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item text-primary" href="/signout">Đăng xuất</a></li>
                            </ul>
                        </div>
                    </template>
                    <template v-else>
                        <a  href="/signin" class="btn btn-primary mr-4">Đăng nhập</a>
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
