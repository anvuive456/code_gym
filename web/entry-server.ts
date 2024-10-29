import { createSSRApp } from "vue";
import App from "./App.vue";
import { createRouterInstance } from "./router";
import { main } from "../src";

export async function createApp(url: string): Promise<any> {
    const app = createSSRApp(App);
    const router = createRouterInstance();

    await router.push(url);
    await router.isReady();
    return app;
}
