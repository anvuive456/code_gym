<script setup lang="ts">

import NavBar from "./NavBar.vue";
import Header from "./Header.vue";
import BackToTopButton from '../../components/admin/BackToTopButton.vue';
import Spinner from '../../components/admin/Spinner.vue';

import { ref, defineProps, defineEmits, onBeforeMount } from "vue";
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
    { name: "Chi nhánh C", address: "Địa chỉ C", action: null },];
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
    <BackToTopButton/> 
  <div class="container-xxl position-relative bg-white d-flex p-0">
    <Spinner/>
    <!-- Spinner Start -->
    <!-- <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div> -->
    <!-- Spinner End -->

    <!-- <div v-for="b in br">
        {{(b as any).name }}
    </div> -->
    <!-- Sidebar Start -->
    <div class="sidebar pe-4 pb-3">
        <nav class="navbar bg-light navbar-light">
            <a href="index.html" class="navbar-brand mx-4 mb-3">
                <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>ADMIN</h3>
            </a>
            
            <div class="d-flex align-items-center ms-4 mb-4">
                <div class="position-relative">
                    <img class="rounded-circle" src="http://localhost:3000/images/user.jpg" alt="" style="width: 40px; height: 40px;">
                    <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                </div>
                <div class="ms-3">
                    <h6 class="mb-0">Hoang Han</h6>
                    <span>Admin</span>
                </div>
            </div>
            <div class="navbar-nav w-100">
                <a href="http://localhost:3000//admin/signin" class="nav-item nav-link"><i class="fa fa-tachometer-alt me-2"></i>Chi nhánh</a>
               
                <a href="/admin/signin" class="nav-item nav-link"><i class="fa fa-th me-2"></i>Học viên</a>
                <a href="widget.html" class="nav-item nav-link"><i class="fa fa-keyboard me-2"></i>Báo cáo</a>
                <a href="widget.html" class="nav-item nav-link"><i class="fa fa-keyboard me-2"></i>Gói tập</a>
                
            </div>
        </nav>
    </div>
    <!-- Sidebar End -->


    <!-- Content Start -->
    <div class="content">
        <!-- Navbar Start -->
        <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
            <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
                <h2 class="text-primary mb-0"><i class="fa fa-hashtag"></i></h2>
            </a>
            <a href="#" class="sidebar-toggler flex-shrink-0">
                <i class="fa fa-bars"></i>
            </a>
            <form class="d-none d-md-flex ms-4">
                <input class="form-control border-0" type="search" placeholder="Search">
            </form>
            <div class="navbar-nav align-items-center ms-auto">
          <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img class="rounded-circle me-lg-2" src="http://localhost:3000/images/user.jpg" alt="" style="width: 40px; height: 40px;">
                        <span class="d-none d-lg-inline-flex">John Doe</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <a href="#" class="dropdown-item">My Profile</a>
                        <a href="#" class="dropdown-item">Settings</a>
                        <a href="#" class="dropdown-item">Log Out</a>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Navbar End -->


        <!-- 404 Start -->
        <div class="container-fluid pt-4 px-4 ">
            <div class="row vh-100 bg-light rounded align-items-center justify-content-center mx-0">
                         <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Danh sách chi nhánh</h6>
                            <button type="submit" class="btn btn-primary btn-sm rounded">Thêm mới</button>
                            <table class="table" style="margin-top: 20px;">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tên chi nhánh</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Action</th> 
                                    </tr>
                                </thead> <tbody>
                            <tr v-for="(branch, index) in cc" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ branch.name }}</td>
                                <td>{{ branch.address }}</td>
                                
                                <td>
            <!-- Nút Sửa -->
            <button class="btn btn-sm btn-warning mr-2 btn-sm rounded" @click="editBranch(index)">Sửa</button>
            <!-- Nút Xóa -->
            <button class="btn btn-sm btn-danger btn-sm rounded" @click="deleteBranch(index)">Xóa</button>
          </td>
                            </tr>
        </tbody> 
                            </table>
                        </div>
                <!-- <div class="col-md-6 text-center p-4">
                    <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
                    <h1 class="display-1 fw-bold">404</h1>
                    <h1 class="mb-4">Page Not Found</h1>
                    <p class="mb-4">We’re sorry, the page you have looked for does not exist in our website!
                        Maybe go to our home page or try to use a search?</p>
                    <a class="btn btn-primary rounded-pill py-3 px-5" href="">Go Back To Home</a>
                </div> -->
            </div>
        </div>
        <!-- 404 End -->


        <!-- Footer Start -->
        <div class="container-fluid pt-4 px-4">
            <div class="bg-light rounded-top p-4">
                <div class="row">
                    <div class="col-12 col-sm-6 text-center text-sm-start">
                        &copy; <a href="#">Your Site Name</a>, All Right Reserved.
                    </div>
                    <div class="col-12 col-sm-6 text-center text-sm-end">
                        <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                        Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->
    </div>
    <!-- Content End -->
    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
</div>
</template>
<style scoped>
</style>
