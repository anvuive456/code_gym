import { ref } from "vue";

export default function usePackages() {
    const packages = ref<
        {
            id: number;
            name: string;
        }[]
    >([]);
    const loading = ref(false);
    const error = ref<string>();

    const fetchPackages = async (options?: { branchId?: number }) => {
        loading.value = true;

        const res = await fetch("/admin/packages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                branchId: options?.branchId,
            }),
        });
        if (!res.ok) {
            error.value = "Không thể load gói tập";
            return;
        }

        packages.value = await res.json();

        loading.value = false;
    };

    return {
        packages,
        loading,
        error,
        fetchPackages,
    };
}
