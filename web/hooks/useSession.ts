// composables/useUserReport.ts
import { ref } from "vue";

export default function useSession() {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const sessionData = ref<{
        username: string;
        fullname: string;
        phone: string;
        email: string;
        gender: string;
        branch: string;
        fitnesspackage: string;
    }>();

    async function fetchSession() {
        loading.value = true;
        error.value = null;
        const res = await fetch(`/session`, {
            headers: { Accept: "application/json" },
        });
        if (!res.ok) {
            error.value = "Failed to fetch session";
            return;
        }
        const data = await res.json();
        console.log("fetchSession ~ data:", data);
        sessionData.value = data; // Lấy danh sách từ API

        loading.value = false;
    }
    //t bắt nồi nước cái
    return { loading, error, sessionData, fetchSession };
}
