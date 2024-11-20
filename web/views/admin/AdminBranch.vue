<script setup lang="ts">
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";

import { ref, defineProps, onBeforeMount } from "vue";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<ChiNhanh>();
// Define fields for the form
const formFields = [
    { key: "name", label: "Tên Chi Nhánh", type: "text", required: true },
    { key: "address", label: "Địa Chỉ", type: "text", required: true },
    {
        key: "lat",
        label: "Latitude",
        type: "number",
        step: "any",
        required: true,
    },
    {
        key: "lng",
        label: "Longitude",
        type: "number",
        step: "any",
        required: true,
    },
];

const colDefs = [
    {
        key: "id",
        header: "#",
    },
    {
        key: "name",
        header: "Tên",
    },
    {
        key: "address",
        header: "Địa chỉ",
    },
];
// Importing props
//Thay vì khai báo props trong export default defineComponent(),
// chúng ta sử dụng defineProps để khai báo các props trong <script setup>.
// const props = defineProps({
//     branches: {
//         type: Array as () => ChiNhanh[],
//         required: true,
//     },
// });

// Declare reactive state using ref//Thay vì dùng data() để khai báo trạng thái, ta sử dụng ref
//cc được khai báo là một mảng chuỗi (ref<string[]>([])).
const branches = ref<ChiNhanh[]>([]);

// Method to get branches (returning sample data)
// Được khai báo trực tiếp trong phần setup như một hàm bình thường, trả về mảng các chuỗi.
interface ChiNhanh {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
}
// const getBranchs = (): ChiNhanh[] => {
//     return props.branches;
// };
// Hàm để xử lý khi nhấn nút Xóa
const deleteBranch = (index: number) => {
    branches.value.splice(index, 1);
    console.log("Xóa chi nhánh ở vị trí:", index);
};

// Show the modal in "Add" mode
const showAddModal = () => {
    modalMode.value = "add";
    modalTitle.value = "Thêm Chi Nhánh";
    currentData.value = {
        id: -1,
        address: "",
        lat: 0,
        lng: 0,
        name: "",
    };
    showModal.value = true;
};

// Show the modal in "Edit" mode

// Hàm để xử lý khi nhấn nút Sửa
const editBranch = (index: number) => {
    modalMode.value = "edit";
    modalTitle.value = "Chỉnh Sửa Chi Nhánh";
    currentData.value = { ...branches.value[index] };
    showModal.value = true;
};

// Lifecycle hook before the component is mounted
// Dùng hook onBeforeMount thay cho beforeMount trong methods.
// Cái này được sử dụng để gọi phương thức getBranchs khi component chuẩn bị mount.

// Sử dụng onMounted để lấy dữ liệu khi component được mount
//
//
onBeforeMount(async () => {
    branches.value = await fetch("/admin/branches", {
        method: "POST",
    }).then(res => res.json());
});

const handleFormSubmit = async () => {
    try {
        // Make API call to update the branch data
        const response = await fetch(
            `/admin/branches/${currentData.value?.id}`,
            {
                method: "PUT",
                body: JSON.stringify(currentData.value),
            },
        );
        const json = await response.json();

        if (!response.ok) {
            console.error("Error updating branch:", json.message);
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }

        // Log response or handle successful update
        console.log("Branch updated successfully:", json);
        alert("Thông tin chi nhánh đã được cập nhật!");
        showModal.value = false;
    } catch (error) {}
};
</script>
<template>
    <div>
        <AdminTable
            :col-defs="colDefs"
            title="Danh sách chi nhánh"
            :data="branches"
            :on-delete="deleteBranch"
            :on-edit="editBranch"
            :on-add="showAddModal"
        >
            <template #default="{ item }">
                <div
                    class="columns is-multiline has-background-white my-1"
                    style="height: 100%"
                >
                    <!-- Column for Basic Details -->
                    <div class="column is-half">
                        <p class="title is-5">Thông tin chi nhánh</p>
                        <ul>
                            <li><strong>ID:</strong> {{ item.id }}</li>
                            <li><strong>Tên:</strong> {{ item.name }}</li>
                            <li>
                                <strong>Địa chỉ:</strong> {{ item.address }}
                            </li>
                            <li><strong>Vĩ độ:</strong> {{ item.lat }}</li>
                            <li><strong>Kinh độ:</strong> {{ item.lng }}</li>
                        </ul>
                    </div>

                    <!-- Column for Related Data -->
                    <div class="column is-half">
                        <p class="title is-5">Thông tin bổ sung</p>

                        <p>
                            <strong>Trạng thái: </strong>
                            <span v-if="item.deletedAt" class="tag is-danger"
                                >Đã xóa</span
                            >
                            <span v-else class="tag is-success">Hoạt động</span>
                        </p>

                        <p>
                            <strong>Người dùng:</strong>
                            {{ item.users.length }} người
                        </p>
                        <p>
                            <strong>Gói tập:</strong>
                            {{ item.fitnesspackages.length || 0 }} gói
                        </p>
                        <p>
                            <strong>Khuyến mãi:</strong>
                            {{ item.promotions.length || 0 }} chương trình
                        </p>

                        <!-- Tags for Fitness Packages and Promotions -->
                        <div
                            v-if="item.fitnesspackages || item.promotions"
                            class="tags"
                        >
                            <span
                                v-for="p in item.fitnesspackages"
                                :key="p.id"
                                class="tag is-info"
                                >{{ p.name }}</span
                            >
                            <span
                                v-for="promotion in item.promotions"
                                :key="promotion.id"
                                class="tag is-primary"
                                >{{ promotion.name }}</span
                            >
                        </div>
                    </div>
                </div>
            </template>
        </AdminTable>

        <ModalForm
            :submit-text="
                modalMode == 'edit' ? 'Sửa chi nhánh' : 'Thêm chi nhánh'
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
    </div>
</template>
<style scoped></style>
