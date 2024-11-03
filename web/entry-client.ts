import { Component, createApp } from "vue";
import App from "./App.vue";
import { createRouterInstance } from "./router";
import Branch from "./views/user/Branch.vue";
import Home from "./views/user/Home.vue";
import Contact from "./views/user/Contact.vue";
import Blog from "./views/user/Blog.vue";
import Feature from "./views/user/Feature.vue";
import SignUp from "./views/user/SignUp.vue";



// Function to initialize the client-side app
function mountApp() {
    const initialProps = window.__INITIAL_PROPS__;
    const router = createRouterInstance();


    const app = createApp(App, initialProps);

    // Use the router in the app
    app.use(router);

    // Wait until the router is ready before mounting
    router.isReady().then(() => {
        app.mount("#app", true);  // Hydrate the server-rendered HTML
    });
}

// Run the client app
mountApp();
