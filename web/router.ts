import { createRouter, createMemoryHistory, createWebHistory, RouteRecordRaw } from "vue-router";

// Define your routes
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("./views/user/Home.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("./views/user/About.vue"),
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import("./views/user/Contact.vue"),
    },
    {
        path: "/feature",
        name: "Feature",
        component: () => import("./views/user/Feature.vue"),
    },
    // Add more routes as needed
];

// Export a function to create a new router instance for each request
export function createRouterInstance() {
    return createRouter({
        history: process.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    });
}
