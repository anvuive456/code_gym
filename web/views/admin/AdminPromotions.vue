<script setup lang="ts">
import AdminTable from "../../components/admin/AdminTable.vue";
import ModalForm from "../../components/admin/ModalForm.vue";

import { showToast } from "../../toast";
import { ref, defineProps, Ref, onBeforeMount } from "vue";
import { DialogFormField } from "../../components/admin/form-field";

// Modal control
const showModal = ref(false);
const modalMode = ref("add");
const modalTitle = ref("");
const currentData = ref<Promotion>();
// Define fields for the form
const formFields: Ref<DialogFormField[]> = ref([
    { key: "name", label: "Tên khuyến mãi", type: "text", required: true },
    {
        key: "startDate",
        label: "Ngày bắt đầu",
        type: "date",
        required: true,
    },
    {
        key: "endDate",
        label: "Ngày kết thúc",
        type: "date",
        required: true,
    },
]);

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
        key: "startDate",
        header: "Ngày bắt đầu",
    },
    {
        key: "endDate",
        header: "Ngày kết thúc",
    },
];
// Importing props
//Thay vì khai báo props trong export default defineComponent(),
// chúng ta sử dụng defineProps để khai báo các props trong <script setup>.
// const props = defineProps({
//     promotions: {
//         type: Array as () => Promotion[],
//         required: true,
//     },
// });

// Declare reactive state using ref//Thay vì dùng data() để khai báo trạng thái, ta sử dụng ref
//cc được khai báo là một mảng chuỗi (ref<string[]>([])).
const promotions = ref<Promotion[]>([]);

// Method to get branches (returning sample data)
// Được khai báo trực tiếp trong phần setup như một hàm bình thường, trả về mảng các chuỗi.
interface Promotion {
    id: number;
    username: String;
    branches: any[];
    packages: any[];
}
// const getpromotions = (): Promotion[] => {
//     return props.promotions;
// };
// Hàm để xử lý khi nhấn nút Xóa
const deleteUser = (index: number) => {
    promotions.value.splice(index, 1);
    console.log("Xóa chi nhánh ở vị trí:", index);
};

// Show the modal in "Add" mode
const showAddModal = () => {
    modalMode.value = "add";
    modalTitle.value = "Thêm Gói tập";
    currentData.value = {
        id: -1,
        username: "",
        branches: [],
        packages: [],
    };
    showModal.value = true;
};

// Show the modal in "Edit" mode

// Hàm để xử lý khi nhấn nút Sửa
const edit = (index: number) => {
    const promo = promotions.value[index];
    console.log("will edit", promo);
    modalMode.value = "edit";
    modalTitle.value = "Chỉnh Sửa Khuyến Mãi";
    currentData.value = {
        ...promotions.value[index],
        branches: promo.branches.map(e => e.id),
        packages: promo.packages.map(e => e.id),
    };
    showModal.value = true;
};

// Lifecycle hook before the component is mounted
// Dùng hook onBeforeMount thay cho beforeMount trong methods.
// Cái này được sử dụng để gọi phương thức getBranchs khi component chuẩn bị mount.

// Sử dụng onMounted để lấy dữ liệu khi component được mount
//
//
onBeforeMount(async () => {
    promotions.value = await fetch("/admin/promotions", {
        method: "POST",
    }).then(res => res.json());
    const branches = await fetch("/admin/branches", {
        method: "POST",
    }).then(res => res.json());

    const packages = await fetch("/admin/packages", {
        method: "POST",
    }).then(res => res.json());
    formFields.value.push({
        key: "branches",
        type: "multi-select",
        label: "Chi nhánh liên kết",
        multiple: true,
        options: branches.map((e: any) => ({
            value: e.id,
            label: e.name,
        })),
    });
    formFields.value.push({
        key: "packages",
        type: "multi-select",
        label: "Gói tập liên kết",
        multiple: true,
        options: packages.map((e: any) => ({
            value: e.id,
            label: e.name,
        })),
    });
});

const handleFormSubmit = async (data: any) => {
    console.log("data before send", JSON.stringify(data));
    // return;
    // Make API call to update the branch data
    const response = await fetch(`/admin/promotions/${currentData.value?.id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
        console.error("Error updating branch:", json.message);
        showToast("Có lỗi xảy ra khi cập nhật thông tin!", "error");
        return;
    }

    // Log response or handle successful update
    showToast("Thông tin đã được cập nhật!", "success");
    showModal.value = false;
};

const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("vi-VN"); // Định dạng ngày theo chuẩn Việt Nam
};

const onClose = () => {
    showModal.value = false;
    currentData.value = undefined;
};
</script>
<template>
    <AdminTable
        :col-defs="colDefs"
        title="Danh sách khuyến mãi"
        :data="promotions"
        :on-delete="deleteUser"
        :on-edit="edit"
        :on-add="showAddModal"
    >
        <template #default="{ item }">
            <div
                class="columns is-multiline has-background-white my-1"
                style="height: 100%"
            >
                <!-- Column for Promotion Details -->
                <div class="column is-half">
                    <p class="title is-6">Thông tin khuyến mãi</p>
                    <ul>
                        <li><strong>ID:</strong> {{ item.id }}</li>
                        <li>
                            <strong>Tên khuyến mãi:</strong> {{ item.name }}
                        </li>
                        <li><strong>Mô tả:</strong> {{ item.description }}</li>
                        <li>
                            <strong>Giảm giá:</strong>
                            {{ item.discountPercentage }}%
                        </li>
                        <li>
                            <strong>Thời gian bắt đầu:</strong>
                            {{ formatDate(item.startDate) }}
                        </li>
                        <li>
                            <strong>Thời gian kết thúc:</strong>
                            {{ formatDate(item.endDate) }}
                        </li>
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

                    <!-- Chi nhánh liên kết -->
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

                    <!-- Gói Fitness liên kết -->
                    <p>
                        <strong>Gói Fitness liên kết:</strong>
                        <span
                            v-for="fitnessPackage in item.fitnesspackages"
                            :key="fitnessPackage.id"
                            class="tag is-warning"
                        >
                            {{ fitnessPackage.name }}
                        </span>
                    </p>
                </div>
            </div>
        </template>
    </AdminTable>

    <ModalForm
        :submit-text="
            modalMode == 'edit' ? 'Sửa khuyến mãi' : 'Thêm khuyến mãi'
        "
        :on-close="onClose"
        :show="showModal"
        :title="modalTitle"
        :modalId="'branchModal'"
        :fields="formFields"
        :initialData="currentData"
        :mode="modalMode"
        @submit="handleFormSubmit"
    />
</template>
