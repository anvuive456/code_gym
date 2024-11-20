<script setup lang="ts">
import { DialogFormField } from "../../components/admin/form-field";
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";
import { showToast } from "../../toast";

import { ref, onBeforeMount, Ref, onMounted } from "vue";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<{
    id: number;
    email: string;
    phone: string;
    photo: string;
    gender: string;
}>();
// Define fields for the form
const formFields: Ref<DialogFormField[]> = ref([
    { key: "name", label: "Tên người dùng", type: "text", required: true },
    { key: "email", label: "Email người dùng", type: "text", required: true },
    {
        key: "phone",
        label: "Số điện thoại người dùng",
        type: "text",
        required: true,
    },
    { key: "photo", label: "Hình người dùng", type: "text", required: true },
    {
        key: "gender",
        label: "Giới tính",
        type: "select",
        required: true,
        options: [
            {
                value: "male",
                label: "Nam",
            },
            {
                value: "female",
                label: "Nữ",
            },
        ],
    },
]);

const colDefs = [
    {
        key: "id",
        header: "#",
    },
    {
        key: "username",
        header: "Tên đăng nhập",
    },
    {
        key: "role",
        header: "Vai trò",
    },
    {
        key: "deletedAt",
        header: "Ngày xoá",
    },
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
    username: string;
    profile: any;
}
// const getUsers = (): User[] => {
//     return props.users;
// };
// Hàm để xử lý khi nhấn nút Xóa
const deleteUser = async (index: number) => {
    const { id } = users.value[index];

    const res = await fetch(`/admin/users/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        showToast("Không thể vô hiệu hoá user", "error");
        fetchUsers();
        return;
    }

    showToast("Vô hiệu hoá thành công", "success");
};

// Show the modal in "Add" mode
const showAddModal = () => {
    modalMode.value = "add";
    modalTitle.value = "Thêm Người dùng";
    currentData.value = {
        id: -1,
        email: "",
        gender: "",
        phone: "",
        photo: "",
    };
    showModal.value = true;
};

// Show the modal in "Edit" mode

// Hàm để xử lý khi nhấn nút Sửa
const editUser = (index: number) => {
    modalMode.value = "edit";
    modalTitle.value = "Chỉnh Sửa Người Dùng";
    currentData.value = { ...users.value[index].profile };
    showModal.value = true;
};

const fetchUsers = async () => {
    users.value = await fetch("/admin/users", {
        method: "POST",
    })
        .then(res => res.json())
        .catch(e => showToast(`${e}`, "error"));
};

// Lifecycle hook before the component is mounted
// Dùng hook onBeforeMount thay cho beforeMount trong methods.
// Cái này được sử dụng để gọi phương thức getBranchs khi component chuẩn bị mount.

// Sử dụng onMounted để lấy dữ liệu khi component được mount
//
//
onBeforeMount(fetchUsers);

const handleFormSubmit = async (data: any) => {
    const response = await fetch(`/admin/users/${currentData.value?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
        showToast(
            `Có lỗi xảy ra khi cập nhật thông tin!:${json.message}`,
            "error",
        );
        return;
    }

    showToast("Thông tin đã được cập nhật!", "success");
    showModal.value = false;
};

function formatRole(role: "admin" | "user" | "manager" | "personal_trainer") {
    switch (role) {
        case "admin":
            return "Quản trị viên";
        case "user":
            return "Người dùng";
        case "manager":
            return "Quản lý";
        case "personal_trainer":
            return "HLV";
        default:
            return role;
    }
}
</script>
<template>
    <AdminTable
        :col-defs="colDefs"
        title="Danh sách người dùng"
        :data="users"
        :on-delete="deleteUser"
        :on-edit="editUser"
        :on-add="showAddModal"
    >
        <template #default="{ item }">
            <div
                class="columns is-multiline has-background-white my-1"
                style="height: 100%"
            >
                <!-- Column for User Details -->
                <div class="column is-half">
                    <p class="title is-6">Thông tin người dùng</p>
                    <ul>
                        <li><strong>ID:</strong> {{ item.id }}</li>
                        <li>
                            <strong>Tên người dùng:</strong>
                            {{ item.username }}
                        </li>
                        <li>
                            <strong>Vai trò:</strong>
                            <span
                                class="tag"
                                :class="{
                                    'is-info': item.role === 'user',
                                    'is-warning': item.role === 'admin',
                                    'is-primary': item.role === 'manager',
                                    'is-success':
                                        item.role === 'personal_trainer',
                                }"
                            >
                                {{ formatRole(item.role) }}
                            </span>
                        </li>
                    </ul>
                </div>

                <!-- Column for Status and Related Data -->
                <div class="column is-half">
                    <p class="title is-6">Thông tin bổ sung</p>
                    <p>
                        <strong>Trạng thái:</strong>
                        <span v-if="item.deletedAt" class="tag is-danger"
                            >Đã xóa</span
                        >
                        <span v-else class="tag is-success">Hoạt động</span>
                    </p>

                    <p v-if="item.branch">
                        <strong>Chi nhánh:</strong>
                        <span class="tag is-link">{{ item.branch.name }}</span>
                    </p>

                    <p>
                        <strong>Hồ sơ:</strong>

                        <span v-if="!item.profile" class="tag is-light"
                            >Chưa tạo</span
                        >
                    </p>

                    <!-- Detailed Profile Information -->
                    <div v-if="item.profile" class="mt-3">
                        <p><strong>Họ tên:</strong> {{ item.profile.name }}</p>
                        <p>
                            <strong>Giới tính:</strong>
                            {{ item.profile.gender }}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong>
                            {{ item.profile.phone }}
                        </p>
                        <p><strong>Email:</strong> {{ item.profile.email }}</p>
                        <p v-if="item.profile.photo">
                            <strong>Ảnh đại diện:</strong>
                            <img
                                :src="item.profile.photo"
                                alt="Profile Photo"
                                class="image is-64x64"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </AdminTable>

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
