<script setup lang="ts">
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";
import { DialogFormField } from "../../components/admin/form-field";
import { showToast } from "../../toast";

import { ref, defineProps, onBeforeMount, Ref } from "vue";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<Package>();
// Define fields for the form
const formFields: Ref<DialogFormField[]> = ref([
    { key: "name", label: "Gói tập", type: "text", required: true },
    {
        key: "description",
        label: "Thông tin",
        type: "textarea",
        required: true,
    },
]);
const colDefs = [
    {
        key: "id",
        header: "ID",
    },
    {
        key: "name",
        header: "Tên",
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
        :col-defs="colDefs"
        title="Danh sách gói tập"
        :data="data"
        :on-delete="deleteUser"
        :on-edit="edit"
        :on-add="showAddModal"
    >
        <template #default="{ item }">
            <div
                class="columns is-multiline has-background-white my-1"
                style="height: 100%"
            >
                <!-- Column for Fitness Package Details -->
                <div class="column is-half">
                    <p class="title is-6">Thông tin gói Fitness</p>
                    <ul>
                        <li><strong>ID:</strong> {{ item.id }}</li>
                        <li><strong>Tên gói:</strong> {{ item.name }}</li>
                        <li><strong>Mô tả:</strong> {{ item.description }}</li>
                    </ul>
                </div>

                <!-- Column for Related Data -->
                <div class="column is-half">
                    <p class="title is-6">Thông tin liên quan</p>

                    <!-- Trạng thái xóa -->
                    <p>
                        <strong>Trạng thái:</strong>
                        <span v-if="item.deletedAt" class="tag is-danger"
                            >Đã xóa</span
                        >
                        <span v-else class="tag is-success">Hoạt động</span>
                    </p>

                    <!-- Chi nhánh liên quan -->
                    <p>
                        <strong>Chi nhánh liên kết:</strong>
                        <span
                            v-for="branch in item.branches"
                            :key="branch.id"
                            class="tag is-link"
                        >
                            {{ branch.name }}
                        </span>
                    </p>

                    <!-- Khuyến mãi liên quan -->
                    <p>
                        <strong>Khuyến mãi liên kết:</strong>
                        <span
                            v-for="promotion in item.promotions"
                            :key="promotion.id"
                            class="tag is-warning"
                        >
                            {{ promotion.name }}
                        </span>
                    </p>
                </div>
            </div>
        </template>
    </AdminTable>

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
