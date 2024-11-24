import { ref } from "vue";

export default function useBranches() {
    const branches = ref<
        {
            id: number;
            name: string;
            address: string;
        }[]
    >([]);
    const loading = ref(false);
    const error = ref<string>();

    const fetchBranches = async () => {
        loading.value = true;

        const res = await fetch("/admin/branches", {
            method: "POST",
        });
        if (!res.ok) {
            error.value = "Không thể load chi nhánh";
            return;
        }

        branches.value = await res.json();

        loading.value = false;
    };

    return {
        branches,
        loading,
        error,
        fetchBranches,
    };
}
