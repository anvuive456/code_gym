<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"BackToTopButton",
    data() {
        return {
            showButton: false // Trạng thái hiển thị của nút "Back to Top"
        };
    },
    methods: {
        // Hàm di chuyển lên đầu trang
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Thay thế cho 'easeInOutExpo'
            });
        },
        // Hàm kiểm tra vị trí cuộn trang
        checkScroll() {
            this.showButton = window.scrollY > 300;
        }
    },
    mounted() {
        // Gán sự kiện scroll để kiểm tra vị trí cuộn trang
        window.addEventListener("scroll", this.checkScroll);
    },
    beforeUnmount() {
        // Xóa sự kiện scroll khi component bị huỷ
        window.removeEventListener("scroll", this.checkScroll);
    }
});
</script>

<template>
    <a href="#" v-show="showButton" class="btn btn-outline-primary back-to-top" @click="scrollToTop">
        <i class="fa fa-angle-double-up">
        </i>
    </a>

</template>

<style scoped>
.back-to-top {
    position: fixed;
    display: none;
    right: 45px;
    bottom: 45px;
    z-index: 99;
}

</style>
