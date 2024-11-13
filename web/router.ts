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
        component: () => import("./views/layout/AdminLayout.vue"),
        children: [
            {
                path: "/admin/branches",
                name: "AdminBranches",
                component: () => import("./views/admin/AdminBranch.vue"),
            },
            {
                path: "/admin/users",
                name: "AdminUsers",
                component: () => import("./views/admin/AdminUsers.vue"),
            },
            {
                path: "/admin/packages",
                name: "AdminPackages",
                component: () => import("./views/admin/AdminPackages.vue"),
            },
            {
                path: "/admin/promotions",
                name: "AdminPromotions",
                component: () => import("./views/admin/AdminPromotions.vue"),
            },
        ],
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
            children: value.children?.map(e => {
                return {
                    ...e,
                    props(to: any) {
                        return window.__INITIAL_PROPS__;
                    },
                };
            }),
        } as RouteRecordRaw;
    });
    return createRouter({
        history: process.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes: _routes,
    });
}
