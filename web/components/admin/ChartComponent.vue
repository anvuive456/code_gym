<template>
    <canvas id="worldwide-sales"></canvas>
</template>


<script>
import { defineComponent } from "vue";
import { Chart } from "chart.js";

export default defineComponent({
    mounted() {
        const ctx = document.getElementById("worldwide-sales").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                datasets: [
                    { label: "USA", data: [15, 30, 55, 65, 60, 80, 95], backgroundColor: "rgba(0, 156, 255, .7)" },
                    { label: "UK", data: [8, 35, 40, 60, 70, 55, 75], backgroundColor: "rgba(0, 156, 255, .5)" },
                    { label: "AU", data: [12, 25, 45, 55, 65, 70, 60], backgroundColor: "rgba(0, 156, 255, .3)" },
                ],
            },
            options: { responsive: true },
        });
    },
});
</script>
