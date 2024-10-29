// src/types/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string;  // Replace with your actual environment variables
    SSR: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
