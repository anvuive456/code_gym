<script setup lang="ts">
import BackToTopButton from "../../components/admin/BackToTopButton.vue";
import Spinner from "../../components/admin/Spinner.vue";
import SideBar from "../../web/components/admin/SideBar.vue";
import AdminTable from "../../web/components/admin/AdminTable.vue";

import { ref, defineProps, onBeforeMount } from "vue";
// Importing props
//Thay vì khai báo props trong export default defineComponent(),
// chúng ta sử dụng defineProps để khai báo các props trong <script setup>.
const props = defineProps({
    branches: {
        type: Array as () => string[],
        required: true,
    },
});

// Declare reactive state using `ref`//Thay vì dùng data() để khai báo trạng thái, ta sử dụng ref
//cc được khai báo là một mảng chuỗi (ref<string[]>([])).
const cc = ref<ChiNhanh[]>([]);

// Method to get branches (returning sample data)
// Được khai báo trực tiếp trong phần setup như một hàm bình thường, trả về mảng các chuỗi.
interface ChiNhanh {
    name: string;
    address: string;
    action: null | string;
}
const getBranchs = (): ChiNhanh[] => {
    return [
        { name: "Chi nhánh A", address: "Địa chỉ A", action: null },
        { name: "Chi nhánh B", address: "Địa chỉ B", action: null },
        { name: "Chi nhánh C", address: "Địa chỉ C", action: null },
    ];
};
// Hàm để xử lý khi nhấn nút Xóa
const deleteBranch = (index: number) => {
    cc.value.splice(index, 1);
    console.log("Xóa chi nhánh ở vị trí:", index);
};

// Hàm để xử lý khi nhấn nút Sửa
const editBranch = (index: number) => {
    const branch = cc.value[index];
    console.log("Chỉnh sửa chi nhánh:", branch);
    // Thêm logic chỉnh sửa tại đây
};
// Lifecycle hook before the component is mounted
// Dùng hook onBeforeMount thay cho beforeMount trong methods.
// Cái này được sử dụng để gọi phương thức getBranchs khi component chuẩn bị mount.

// Sử dụng `onMounted` để lấy dữ liệu khi component được mount
onBeforeMount(() => {
    cc.value = getBranchs();
});
// Logging props (just for demonstration)
// Bạn có thể thực hiện bất kỳ hành động nào với các props ngay trong setup function.?
console.log(props.branches);
</script>
<template>
    <BackToTopButton />
    <div class="container-xxl position-relative bg-white d-flex p-0">
        <Spinner />

        <SideBar />

        <!-- Content Start -->
        <div class="content">
            <!-- Navbar Start -->
            <nav
                class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0"
            >
                <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
                    <h2 class="text-primary mb-0">
                        <i class="fa fa-hashtag"></i>
                    </h2>
                </a>
                <a href="#" class="sidebar-toggler flex-shrink-0">
                    <i class="fa fa-bars"></i>
                </a>
                <form class="d-none d-md-flex ms-4">
                    <input
                        class="form-control border-0"
                        type="search"
                        placeholder="Search"
                    />
                </form>
                <div class="navbar-nav align-items-center ms-auto">
                    <div class="nav-item dropdown">
                        <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                class="rounded-circle me-lg-2"
                                src="http://localhost:3000/images/user.jpg"
                                alt=""
                                style="width: 40px; height: 40px"
                            />
                            <span class="d-none d-lg-inline-flex"
                                >John Doe</span
                            >
                        </a>
                        <div
                            class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0"
                        >
                            <a href="#" class="dropdown-item">My Profile</a>
                            <a href="#" class="dropdown-item">Settings</a>
                            <a href="#" class="dropdown-item">Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
            <!-- Navbar End -->

            <!-- 404 Start -->
            <div class="container-fluid pt-4 px-4">
                <div
                    class="row vh-100 bg-light rounded align-items-center justify-content-center mx-0"
                >
                    <AdminTable title="Danh sách chi nhánh" />
                </div>
            </div>
            <!-- 404 End -->

            <!-- Footer Start -->
            <div class="container-fluid pt-4 px-4">
                <div class="bg-light rounded-top p-4">
                    <div class="row">
                        <div class="col-12 col-sm-6 text-center text-sm-start">
                            &copy; <a href="#">Your Site Name</a>, All Right
                            Reserved.
                        </div>
                        <div class="col-12 col-sm-6 text-center text-sm-end">
                            <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                            Designed By
                            <a href="https://htmlcodex.com">HTML Codex</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer End -->
        </div>
        <!-- Content End -->
        <!-- Back to Top -->
        <!-- <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"
            ><i class="bi bi-arrow-up"></i
        ></a> -->
    </div>
</template>
<style scoped></style>
