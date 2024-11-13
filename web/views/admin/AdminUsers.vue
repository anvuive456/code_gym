<script setup lang="ts">
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";
import { showToast } from "../../toast";

import { ref, defineProps, onBeforeMount, onMounted } from "vue";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<User>();
// Define fields for the form
const formFields = [
    { key: "id", label: "ID người dùng", type: "text", required: true },
    { key: "name", label: "Tên người dùng", type: "text", required: true },
];
// Importing props
//Thay vì khai báo props trong export default defineComponent(),
// chúng ta sử dụng defineProps để khai báo các props trong <script setup>.
// const props = defineProps({
//     users: {
//         type: Array as () => User[],
//         required: true,
//     },
// });

// Declare reactive state using ref//Thay vì dùng data() để khai báo trạng thái, ta sử dụng ref
//cc được khai báo là một mảng chuỗi (ref<string[]>([])).
const users = ref<User[]>([]);

// Method to get branches (returning sample data)
// Được khai báo trực tiếp trong phần setup như một hàm bình thường, trả về mảng các chuỗi.
interface User {
    id: number;
    username: String;
}
// const getUsers = (): User[] => {
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
    modalTitle.value = "Thêm Chi Nhánh";
    currentData.value = {
        id: -1,
        username: "",
    };
    showModal.value = true;
};

// Show the modal in "Edit" mode

// Hàm để xử lý khi nhấn nút Sửa
const editUser = (index: number) => {
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
    users.value = await fetch("/admin/users", {
        method: "POST",
    })
        .then(res => res.json())
        .catch(e => showToast(`${e}`, "error"));
});

const handleFormSubmit = async () => {
    try {
        // Make API call to update the branch data
        const response = await fetch(`/admin/users/${currentData.value?.id}`, {
            method: "PUT",
            body: JSON.stringify(currentData.value),
        });
        const json = await response.json();

        if (!response.ok) {
            console.error("Error updating branch:", json.message);
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
            return;
        }

        // Log response or handle successful update
        console.log("Branch updated successfully:", json);
        alert("Thông tin chi nhánh đã được cập nhật!");
        showModal.value = false;
    } catch (error) {}
};
</script>
<template>
    <AdminTable
        title="Danh sách người dùng"
        :data="users"
        :on-delete="deleteUser"
        :on-edit="editUser"
        :on-add="showAddModal"
    />

    <ModalForm
        :submit-text="
            modalMode == 'edit' ? 'Sửa người dùng' : 'Thêm người dùng'
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
