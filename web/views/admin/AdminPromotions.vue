<script setup lang="ts">
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";

import { showToast } from "../../toast";
import { ref, defineProps, onBeforeMount } from "vue";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<Promotion>();
// Define fields for the form
const formFields = [
    { key: "id", label: "ID", type: "text", required: true },
    { key: "name", label: "Gói tập", type: "text", required: true },
];
// Importing props
//Thay vì khai báo props trong export default defineComponent(),
// chúng ta sử dụng defineProps để khai báo các props trong <script setup>.
// const props = defineProps({
//     users: {
//         type: Array as () => Promotion[],
//         required: true,
//     },
// });

// Declare reactive state using ref//Thay vì dùng data() để khai báo trạng thái, ta sử dụng ref
//cc được khai báo là một mảng chuỗi (ref<string[]>([])).
const users = ref<Promotion[]>([]);

// Method to get branches (returning sample data)
// Được khai báo trực tiếp trong phần setup như một hàm bình thường, trả về mảng các chuỗi.
interface Promotion {
    id: number;
    username: String;
}
// const getUsers = (): Promotion[] => {
//     return props.users;
// };
// Hàm để xử lý khi nhấn nút Xóa
const deleteUser = (index: number) => {
    users.value.splice(index, 1);
    console.log("Xóa chi nhánh ở vị trí:", index);
};

// Show the modal in "Add" mode
const showAddModal = () => {
    modalMode.value = "add";
    modalTitle.value = "Thêm Gói tập";
    currentData.value = {
        id: -1,
        username: "",
    };
    showModal.value = true;
};

// Show the modal in "Edit" mode

// Hàm để xử lý khi nhấn nút Sửa
const edit = (index: number) => {
    modalMode.value = "edit";
    modalTitle.value = "Chỉnh Sửa Chi Nhánh";
    currentData.value = { ...users.value[index] };
    showModal.value = true;
};

// Lifecycle hook before the component is mounted
// Dùng hook onBeforeMount thay cho beforeMount trong methods.
// Cái này được sử dụng để gọi phương thức getBranchs khi component chuẩn bị mount.

// Sử dụng onMounted để lấy dữ liệu khi component được mount
//
//
onBeforeMount(async () => {
    users.value = await fetch("/admin/promotions", {
        method: "POST",
    }).then(res => res.json());
});

const handleFormSubmit = async () => {
    try {
        // Make API call to update the branch data
        const response = await fetch(
            `/admin/promotions/${currentData.value?.id}`,
            {
                method: "PUT",
                body: JSON.stringify(currentData.value),
            },
        );
        const json = await response.json();

        if (!response.ok) {
            console.error("Error updating branch:", json.message);
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
        title="Danh sách khuyến mãi"
        :data="users"
        :on-delete="deleteUser"
        :on-edit="edit"
        :on-add="showAddModal"
    />

    <ModalForm
        :submit-text="
            modalMode == 'edit' ? 'Sửa khuyến mãi' : 'Thêm khuyến mãi'
        "
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
