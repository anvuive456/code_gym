import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
    RouteRecordRaw,
    RouteLocationNormalizedGeneric,
} from "vue-router";

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
        path: "/signin",
        name: "SignIn",
        component: () => import("./views/user/SignIn.vue"),
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
    {
        path: "/admin",
        name: "Admin",
        component: () => import("./views/admin/AdminDashboard.vue"),
    },
    {
        path: "/user/signin",
        name: "User",
        component: () => import("./views/user/SignIn.vue"),
    },
    // Add more routes as needed
];

// Export a function to create a new router instance for each request
export function createRouterInstance() {
    const _routes: RouteRecordRaw[] = routes.map(value => {
        return {
            ...value,
            props(to: any) {
                return window.__INITIAL_PROPS__;
            },
        } as RouteRecordRaw;
    });
    return createRouter({
        history: process.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes: _routes,
    });
}
