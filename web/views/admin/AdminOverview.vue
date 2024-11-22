<script setup lang="ts">
import { ref, onBeforeMount, defineAsyncComponent } from "vue";
import Spinner from "../../components/admin/Spinner.vue";

import { showToast } from "../../../web/toast";
import { shallowRef } from "vue";

const branchData = ref({
    labels: ["Chi nhánh A", "Chi nhánh B", "Chi nhánh C"],
    datasets: [
        {
            label: "Số lượng chi nhánh",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            data: [5, 10, 3],
        },
    ],
});

const promotionData = ref({
    labels: ["Khuyến mãi A", "Khuyến mãi B", "Khuyến mãi C"],
    datasets: [
        {
            label: "Số lượng promotions",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            data: [20, 15, 10],
        },
    ],
});

const fitnessPackageData = ref({
    labels: ["Gói 1 tháng", "Gói 3 tháng", "Gói 6 tháng", "Gói 12 tháng"],
    datasets: [
        {
            label: "Số lượng gói tập",
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            data: [30, 60, 90, 120],
            fill: false,
        },
    ],
});

const counts = ref({
    branch: 0,
    promotion: 0,
    package: 0,
    user: 0,
});

const tabs = ref([
    {
        label: "Người dùng",
        key: "user",
        component: shallowRef(
            defineAsyncComponent({
                loader: () =>
                    import("../../components/admin/AdminUserReport.vue"),
                loadingComponent: Spinner,
            }),
        ),
    },
    {
        label: "Chi nhánh",
        key: "branch",
        component: shallowRef(
            defineAsyncComponent({
                loader: () =>
                    import("../../components/admin/AdminUserReport.vue"),
                loadingComponent: Spinner,
            }),
        ),
    },
    {
        label: "Khuyến mãi",
        key: "promotion",
        component: shallowRef(
            defineAsyncComponent({
                loader: () =>
                    import("../../components/admin/AdminUserReport.vue"),
                loadingComponent: Spinner,
            }),
        ),
    },
    {
        label: "Gói tập",
        key: "package",
        component: shallowRef(
            defineAsyncComponent({
                loader: () =>
                    import("../../components/admin/AdminUserReport.vue"),
                loadingComponent: Spinner,
            }),
        ),
    },
]);

const currTab = ref(tabs.value[0]);

type PeriodType = "week" | "month" | "year";
const period = ref<PeriodType>("week");

onBeforeMount(async () => {
    const res = await fetch("/admin/overview", {
        method: "POST",
    });
    if (!res.ok) {
        showToast("Không thể lấy dữ liệu", "error");
        return;
    }

    const overview = await res.json();

    counts.value = overview.counts;
});
</script>
<template>
    <section class="container">
        <h1 class="title">Tổng quan</h1>
        <p class="subtitle">
            Thông tin tổng quan về người dùng, chi nhánh, promotions, và gói tập
        </p>
        <div class="columns">
            <div class="column is-one-quarter">
                <div class="box has-background-primary">
                    <h3 class="title is-4 has-text-white-ter">Người dùng</h3>
                    <p class="subtitle has-text-white-ter">
                        {{ counts.user }}
                    </p>
                </div>
            </div>
            <div class="column is-one-quarter">
                <div class="box has-background-link">
                    <h3 class="title is-4 has-text-white-ter">Chi nhánh</h3>
                    <p class="subtitle has-text-white-ter">
                        {{ counts.branch }}
                    </p>
                </div>
            </div>
            <div class="column is-one-quarter">
                <div class="box has-background-info">
                    <h3 class="title is-4 has-text-white-ter">Gói tập</h3>
                    <p class="subtitle has-text-white-ter">
                        {{ counts.package }}
                    </p>
                </div>
            </div>
            <div class="column is-one-quarter">
                <div class="box has-background-success">
                    <h3 class="title is-4 has-text-white-ter">Khuyến mãi</h3>
                    <p class="subtitle has-text-white-ter">
                        {{ counts.promotion }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs is-medium is-boxed">
            <ul>
                <li
                    v-for="item in tabs"
                    :key="item.key"
                    :class="{ 'is-active': currTab.key == item.key }"
                >
                    <a @click="() => (currTab = item)">{{ item.label }}</a>
                </li>
            </ul>
        </div>

        <!-- Dynamic Component -->
        <div>
            <component
                :is="{ ...currTab.component }"
                v-if="currTab.component"
            />
        </div>
    </section>
</template>

<style scoped></style>
