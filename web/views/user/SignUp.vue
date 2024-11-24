<script setup lang="ts">
import Header from "./Header.vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
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
