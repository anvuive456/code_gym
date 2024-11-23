<!-- <script setup lang="ts"> 
defineProps<{
  userFullName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userGender: string;
}>();
</script>

<template>
  <div class="account-info">
    <h2>Thông tin tài khoản</h2>
    <div class="info-card">
      <div class="info-grid">
        <div class="info-item">
          <i class="icon fas fa-user-circle"></i>
          <div>
            <strong>Tên đầy đủ:</strong>
            <p>{{ userFullName }}</p>
          </div>
        </div>
        <div class="info-item">
          <i class="icon fas fa-user"></i>
          <div>
            <strong>Tên đăng nhập:</strong>
            <p>{{ userName }}</p>
          </div>
        </div>
        <div class="info-item">
          <i class="icon fas fa-envelope"></i>
          <div>
            <strong>Email:</strong>
            <p>{{ userEmail }}</p>
          </div>
        </div>
        <div class="info-item">
          <i class="icon fas fa-phone"></i>
          <div>
            <strong>Số điện thoại:</strong>
            <p>{{ userPhone }}</p>
          </div>
        </div>
        <div class="info-item">
          <i class="icon fas fa-venus-mars"></i>
          <div>
            <strong>Giới tính:</strong>
            <p>{{ userGender === 'male' ? 'Nam' : 'Nữ' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="btn btn-secondary">Chỉnh sửa thông tin</button>
    </div>
  </div>
</template>

<style scoped>
.account-info {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.info-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f1f5f9;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-item i.icon {
  font-size: 24px;
  color: #007bff;
  margin-right: 15px;
}

.info-item strong {
  font-weight: bold;
  color: #555;
}

.info-item p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.action-buttons {
  text-align: center;
  margin-top: 30px;
}

button {
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style> -->

<script setup lang="ts">
import { ref } from "vue";


const props = defineProps<{
  userFullName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userGender: string;
}>();

// Trạng thái chỉnh sửa và giá trị
const isEditing = ref(false); 
const email = ref(props.userEmail);
const phone = ref(props.userPhone); // Trực tiếp sử dụng userPhone

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
        <div class="table-cell value">{{ userFullName }}</div>
      </div>
      <div class="table-row">
        <div class="table-cell label">Tên đăng nhập:</div>
        <div class="table-cell value">{{ userName }}</div>
      </div>
      <div class="table-row">
        <div class="table-cell label">Email:</div>
        <div class="table-cell value">
          <div v-if="isEditing">
            <input v-model="email" type="email" class="edit-input" />
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
          {{ userGender === "male" ? "Nam" : "Nữ" }}
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button v-if="isEditing" class="btn btn-primary" @click="saveChanges">
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
