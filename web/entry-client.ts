import { createApp } from 'vue';
import App from './App.vue';
import { createRouterInstance } from './router';

// Function to initialize the client-side app
function mountApp() {
    const app = createApp(App);
    const router = createRouterInstance();

    // Use the router in the app
    app.use(router);

    // Wait until the router is ready before mounting
    router.isReady().then(() => {
        app.mount('#app', true);  // Hydrate the server-rendered HTML
    });
}

// Run the client app
mountApp();
