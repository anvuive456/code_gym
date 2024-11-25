<script setup lang="ts">
import TimeTable from "../../components/TimeTable.vue";
import NavBar from "./NavBar.vue";
import Carousel from "../../components/Carousel.vue";
import { onMounted, ref } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { useRouter } from "vue-router";
import useBranches from "../../hooks/useBranches";
import usePackages from "../../hooks/usePackages";

const { branches, fetchBranches, loading: loadingBranches } = useBranches();
const { packages, fetchPackages, loading: loadingPackages } = usePackages();
// Các bước
const steps = ref([
    { label: "Thông tin" },
    { label: "Chọn chi nhánh" },
    { label: "Chọn gói tập" },
]);

const currentStep = ref(0);

const username = ref("");
const password = ref("");
const email = ref("");
const fullName = ref("");
const phone = ref("");
const gender = ref("");
const branch = ref();
const fitnessPackage = ref();

const errorMessage = ref("");

const router = useRouter();

// Điều hướng giữa các bước
const goToStep = (index: number) => {
    if (index >= 0 && index < steps.value.length) {
        currentStep.value = index;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value -= 1;
    }
};

const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
        currentStep.value += 1;
    } else {
        register();
    }
};

onMounted(async () => {
    await fetchBranches();
    await fetchPackages();
});

const register = async () => {
    try {
        const response = await fetch("/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                email: email.value,
                name: fullName.value,
                phone: phone.value,
                gender: gender.value,
                branch: branch.value,
                package: fitnessPackage.value,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            errorMessage.value = data.message || "Đăng ký thất bại";
        } else {
            router.push("/home");
        }
    } catch (error: any) {
        errorMessage.value = error.message || "Lỗi kết nối!";
    }
};
</script>

<template>
    <NavBar />
    <Header title="Đăng ký" />

    <div class="w-50 mx-auto my-4">
        <div class="stepper">
            <!-- Step Indicators -->
            <nav>
                <div class="nav nav-pills justify-content-center">
                    <button
                        v-for="(step, index) in steps"
                        :key="index"
                        :class="['nav-link', { active: currentStep === index }]"
                        @click="goToStep(index)"
                    >
                        {{ step.label }}
                    </button>
                </div>
            </nav>
        </div>

        <!-- Step Content -->
        <div class="tab-content mt-4">
            <div
                v-for="(step, index) in steps"
                :key="index"
                v-show="currentStep === index"
            >
                <!-- Step 1: Thông tin -->
                <template v-if="index === 0">
                    <form @submit.prevent="register" method="POST">
                        <div class="form-group">
                            <label for="username">Tên tài khoản</label>
                            <input
                                type="text"
                                pattern="\S+"
                                v-model="username"
                                class="form-control"
                                id="username"
                                name="username"
                                required
                            />
                            <small class="text-muted">Dùng để đăng nhập</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Mật khẩu</label>
                            <input
                                type="password"
                                v-model="password"
                                class="form-control"
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                                v-model="email"
                                class="form-control"
                                id="email"
                                name="email"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="name">Họ và tên</label>
                            <input
                                type="text"
                                v-model="fullName"
                                class="form-control"
                                id="name"
                                name="name"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                maxlength="10"
                                v-model="phone"
                                class="form-control"
                                id="phone"
                                name="phone"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="gender">Giới tính</label>
                            <div id="gender" class="form-check">
                                <input
                                    class="form-check-input"
                                    v-model="gender"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                />
                                <label class="form-check-label" for="male">
                                    Nam
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    v-model="gender"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                />
                                <label class="form-check-label" for="female">
                                    Nữ
                                </label>
                            </div>
                        </div>
                    </form>
                </template>

                <!-- Step 2: Chọn chi nhánh -->
                <template v-if="index === 1">
                    <form>
                        <div class="mb-3">
                            <label for="branch" class="form-label"
                                >Chi nhánh</label
                            >
                            <select
                                v-if="!loadingBranches"
                                class="form-select"
                                id="branch"
                                v-model="branch"
                                required
                            >
                                <option value="null" disabled>
                                    Chọn chi nhánh
                                </option>
                                <option
                                    v-for="item in branches"
                                    :value="item.id"
                                >
                                    {{ item.name }} - {{ item.address }}
                                </option>
                            </select>
                            <div
                                v-else
                                class="spinner-border text-primary"
                                role="status"
                            >
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </form>
                </template>

                <!-- Step 3: Chọn gói tập -->
                <template v-if="index === 2">
                    <form>
                        <div class="mb-3">
                            <label for="package" class="form-label"
                                >Gói tập</label
                            >
                            <select
                                v-if="!loadingPackages"
                                class="form-select"
                                id="package"
                                v-model="fitnessPackage"
                            >
                                <option value="null" disabled>
                                    Chọn gói tập
                                </option>
                                <option
                                    v-for="item in packages"
                                    :value="item.id"
                                >
                                    {{ item.name }}
                                </option>
                            </select>
                            <div
                                v-else
                                class="spinner-border text-primary"
                                role="status"
                            >
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </form>
                </template>
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="d-flex justify-content-between mt-4">
            <button
                class="btn btn-secondary"
                :disabled="currentStep === 0"
                @click="prevStep"
            >
                Trở lại
            </button>
            <button class="btn btn-primary" @click="nextStep">
                {{
                    currentStep === steps.length - 1 ? "Hoàn tất" : "Tiếp theo"
                }}
            </button>
        </div>
    </div>

    <Footer />
</template>

<style scoped></style>
