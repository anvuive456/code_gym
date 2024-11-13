<script setup lang="ts">
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";
import { showToast } from "../../toast";

import { ref, defineProps, onBeforeMount } from "vue";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<Package>();
// Define fields for the form
const formFields = [
    { key: "name", label: "Gói tập", type: "text", required: true },
    { key: "description", label: "Thông tin", type: "text", required: true },
];
// Importing props
//Thay vì khai báo props trong export default defineComponent(),
// chúng ta sử dụng defineProps để khai báo các props trong <script setup>.
// const props = defineProps({
//     users: {
//         type: Array as () => Package[],
//         required: true,
//     },
// });

// Declare reactive state using ref//Thay vì dùng data() để khai báo trạng thái, ta sử dụng ref
//cc được khai báo là một mảng chuỗi (ref<string[]>([])).
const data = ref<Package[]>([]);

// Method to get branches (returning sample data)
// Được khai báo trực tiếp trong phần setup như một hàm bình thường, trả về mảng các chuỗi.
interface Package {
    id: number;
    name: String;
    description: String;
}
// const getUsers = (): Package[] => {
//     return props.users;
// };
// Hàm để xử lý khi nhấn nút Xóa
const deleteUser = (index: number) => {
    data.value.splice(index, 1);
    console.log("Xóa chi nhánh ở vị trí:", index);
};

// Show the modal in "Add" mode
const showAddModal = () => {
    modalMode.value = "add";
    modalTitle.value = "Thêm Gói tập";
    currentData.value = {
        id: -1,
        name: "",
        description: "",
    };
    showModal.value = true;
};

// Show the modal in "Edit" mode

// Hàm để xử lý khi nhấn nút Sửa
const edit = (index: number) => {
    modalMode.value = "edit";
    modalTitle.value = "Chỉnh Sửa Chi Nhánh";
    currentData.value = { ...data.value[index] };
    showModal.value = true;
};

// Lifecycle hook before the component is mounted
// Dùng hook onBeforeMount thay cho beforeMount trong methods.
// Cái này được sử dụng để gọi phương thức getBranchs khi component chuẩn bị mount.

// Sử dụng onMounted để lấy dữ liệu khi component được mount
//
//
onBeforeMount(async () => {
    data.value = await fetch("/admin/packages", {
        method: "POST",
    }).then(res => res.json());
});

const handleFormSubmit = async () => {
    try {
        // Make API call to update the branch data
        const response = await fetch(
            `/admin/packages/${currentData.value?.id}`,
            {
                method: "PUT",
                body: JSON.stringify(currentData.value),
            },
        );
        const json = await response.json();

        if (!response.ok) {
            showToast("Có lỗi xảy ra khi cập nhật thông tin!", "error");
        }

        // Log response or handle successful update
        showToast("Thông tin đã được cập nhật!", "success");
        showModal.value = false;
    } catch (error) {}
};
</script>
<template>
    <AdminTable
        title="Danh sách gói tập"
        :data="data"
        :on-delete="deleteUser"
        :on-edit="edit"
        :on-add="showAddModal"
    />

    <ModalForm
        :submit-text="modalMode == 'edit' ? 'Sửa gói tập' : 'Thêm gói tập'"
        :on-close="() => (showModal = false)"
        :show="showModal"
        :title="modalTitle"
        :modalId="'branchModal'"
        :fields="formFields"
        :initialData="currentData"
        :mode="modalMode"
        @submit="handleFormSubmit"
    />
</template>
