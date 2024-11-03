import { createRouter, createMemoryHistory, createWebHistory, RouteRecordRaw } from "vue-router";

// Define your routes
export const routes: RouteRecordRaw[] = [
    {
        path: "/home",
        name: "Home",
        component: () => import("./views/user/Home.vue"),
    },
    {
        path: "/signup",
        name: "SignUp",
        component: () => import("./views/user/SignUp.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("./views/user/About.vue"),
    },
    {
        path: "/branch",
        name: "Branch",
        component: () => import("./views/user/Branch.vue"),
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
    {
        path: "/admin/signin",
        name: "AdminLogin",
        component: () => import("./views/admin/AdminLogin.vue"),
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
