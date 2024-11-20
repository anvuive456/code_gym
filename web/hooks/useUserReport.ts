// composables/useUserReport.ts
import { ref } from "vue";

export default function useUserReport() {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const reportData = ref<
        {
            groupBy: string;
            createdCount: number;
            deletedCount: number;
            activeCount: number;
        }[]
    >([]);

    async function fetchUserReport(period: string) {
        loading.value = true;
        error.value = null;
        const res = await fetch(`/report/users?period=${period}`);
        if (!res.ok) {
            error.value = "Failed to fetch user report.";
            return;
        }
        const { data } = await res.json();
        reportData.value = data; // Lấy danh sách từ API

        loading.value = false;
    }

    return { loading, error, reportData, fetchUserReport };
}
