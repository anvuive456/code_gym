<script setup lang="ts">
import useUserReport from "../../hooks/useUserReport";
import { ref, onMounted, watch } from "vue";
import {
    Bar as BarChart,
    Pie as PieChart,
    Doughnut as DoughnutChart,
    Line as LineChart,
} from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const { loading, error, reportData, fetchUserReport } = useUserReport();

const userData = ref({
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
    datasets: [
        {
            label: "Số lượng người dùng",
            backgroundColor: "#48C774",
            data: [50, 100, 150, 200],
        },
    ],
});

watch(reportData, data => {
    userData.value = {
        labels: data.map(e => e.groupBy),
        datasets: [
            {
                label: "Người dùng hiện có",
                backgroundColor: "#FF6384",
                data: data.map(e => e.activeCount),
            },
            {
                label: "Người dùng đã bị xoá",
                backgroundColor: "#36A2EB",
                data: data.map(e => e.deletedCount),
            },
            {
                label: "Người dùng được tạo",
                backgroundColor: "#FFCE56",
                data: data.map(e => e.createdCount),
            },
        ],
    };
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
});

onMounted(() => {
    fetchUserReport("week");
});
</script>
<template>
    <!-- Bộ lọc thời gian -->
    <div class="buttons has-addons">
        <button
            class="button"
            :class="{ 'is-loading': loading }"
            @click="fetchUserReport('week')"
        >
            Theo tuần
        </button>
        <button
            class="button"
            :class="{ 'is-loading': loading }"
            @click="fetchUserReport('month')"
        >
            Theo tháng
        </button>
        <button
            class="button"
            :class="{ 'is-loading': loading }"
            @click="fetchUserReport('year')"
        >
            Theo năm
        </button>
    </div>
    <div class="container is-fullhd">
        <BarChart :data="userData" :options="chartOptions" />
    </div>
</template>
