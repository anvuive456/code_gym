<script setup lang="ts">
import { ref, toRef } from "vue";

const props = defineProps<{
    fullname: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
}>();

// Trạng thái chỉnh sửa và giá trị
const isEditing = ref(false);
const email = toRef(props, "email");
const phone = toRef(props, "phone"); // Trực tiếp sử dụng userPhone

// Bật tắt chế độ chỉnh sửa
const toggleEdit = () => {
    isEditing.value = !isEditing.value;
};

// Lưu thay đổi
const saveChanges = () => {
    isEditing.value = false;
    console.log("Email mới:", email.value);
    console.log("Số điện thoại mới:", phone.value);
};
</script>

<template>
    <div class="account-info">
        <h2>Thông tin tài khoản</h2>

        <div class="info-table">
            <div class="table-row">
                <div class="table-cell label">Tên đầy đủ:</div>
                <div class="table-cell value">{{ fullname }}</div>
            </div>
            <div class="table-row">
                <div class="table-cell label">Tên đăng nhập:</div>
                <div class="table-cell value">{{ username }}</div>
            </div>
            <div class="table-row">
                <div class="table-cell label">Email:</div>
                <div class="table-cell value">
                    <div v-if="isEditing">
                        <input
                            v-model="email"
                            type="email"
                            class="edit-input"
                        />
                    </div>
                    <span v-else>{{ email }}</span>
                </div>
                <div class="table-cell action">
                    <i
                        class="fas fa-pen edit-icon"
                        @click="toggleEdit"
                        title="Chỉnh sửa"
                    ></i>
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell label">Số điện thoại:</div>
                <div class="table-cell value">
                    <div v-if="isEditing">
                        <input v-model="phone" type="text" class="edit-input" />
                    </div>
                    <span v-else>{{ phone }}</span>
                </div>
                <div class="table-cell action">
                    <i
                        class="fas fa-pen edit-icon"
                        @click="toggleEdit"
                        title="Chỉnh sửa"
                    ></i>
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell label">Giới tính:</div>
                <div class="table-cell value">
                    {{ gender === "male" ? "Nam" : "Nữ" }}
                </div>
            </div>
        </div>

        <div class="action-buttons">
            <button
                v-if="isEditing"
                class="btn btn-primary"
                @click="saveChanges"
            >
                Lưu thay đổi
            </button>
            <button class="btn btn-secondary" @click="toggleEdit">
                {{ isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin" }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.account-info {
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 22px;
    color: #333;
}

.info-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
}

.table-row {
    display: table-row;
    border-bottom: 1px solid #ddd;
}

.table-cell {
    display: table-cell;
    padding: 15px;
    vertical-align: middle;
}

.label {
    font-weight: bold;
    width: 25%;
    color: #555;
}

.value {
    width: 65%;
    color: #333;
}

.action {
    width: 10%;
    text-align: center;
}

.edit-icon {
    font-size: 16px;
    color: #007bff;
    cursor: pointer;
}

.edit-icon:hover {
    color: #0056b3;
}

.edit-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.action-buttons {
    text-align: center;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>
-->
