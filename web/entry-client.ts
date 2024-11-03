import { Component, createApp } from "vue";
import App from "./App.vue";
import { createRouterInstance } from "./router";
import Branch from "./views/user/Branch.vue";
import Home from "./views/user/Home.vue";
import Contact from "./views/user/Contact.vue";
import Blog from "./views/user/Blog.vue";
import Feature from "./views/user/Feature.vue";
import SignUp from "./views/user/SignUp.vue";

const routes: {
    [k: string]: Component
} = {
    "/branch": Branch,
    "/home": Home,
    "/contact": Contact,
    "/blog": Blog,
    "/feature": Feature,
    "/signup": SignUp,
};


// Function to initialize the client-side app
function mountApp() {
    const initialProps = window.__INITIAL_PROPS__;
    const router = createRouterInstance();

    console.log("init props", initialProps);


    const currentPath = window.location.pathname;
    console.log("current path", currentPath);

    const app = createApp(routes[currentPath], initialProps);

    // Use the router in the app
    app.use(router);

    // Wait until the router is ready before mounting
    router.isReady().then(() => {
        app.mount("#app", true);  // Hydrate the server-rendered HTML
    });
}

// Run the client app
mountApp();
