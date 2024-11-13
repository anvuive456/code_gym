const Types = {
    success: "is-success",
    error: "is-danger",
    warning: "is-warning",
} as const;

export function showToast(message: string, type: keyof typeof Types) {
    // Create a toast element
    const toast = document.createElement("div");
    toast.className = `notification ${Types[type]}`;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "1000";
    toast.innerHTML = `<button class="delete"></button>${message}`;

    // Append toast to body
    document.body.appendChild(toast);

    // Remove toast on close button click
    (toast.querySelector(".delete") as HTMLElement).onclick = () => {
        document.body.removeChild(toast);
    };

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 2000);
}
