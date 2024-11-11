<script setup lang="ts">
import BackToTopButton from "../../components/admin/BackToTopButton.vue";
import Spinner from "../../components/admin/Spinner.vue";
import SideBar from "../../components/admin/SideBar.vue";
import AdminTable from "../../components/admin/AdminTable.vue";

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
//
//
const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
onBeforeMount(async () => {
    cc.value = getBranchs();
});
// Logging props (just for demonstration)
// Bạn có thể thực hiện bất kỳ hành động nào với các props ngay trong setup function.?
console.log(props.branches);
</script>
<template>
    <AdminTable
        title="Danh sách chi nhánh"
        :data="cc"
        :on-delete="deleteBranch"
        :on-edit="editBranch"
    />
</template>
<style scoped></style>
