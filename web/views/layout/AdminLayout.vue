<script lang="ts">
import Spinner from "../../components/admin/Spinner.vue";
import SideBar from "../../components/admin/SideBar.vue";
import AdminHeader from "../../components/admin/AdminHeader.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "AdminLayout",
    components: {
        Spinner,
        SideBar,
        AdminHeader,
    },
});
</script>
<template>
    <BackToTopButton />
    <div class="container-fluid">
        <SideBar />

        <!-- Content Start -->
        <div class="content">
            <!-- Navbar Start -->
            <AdminHeader />
            <!-- Navbar End -->

            <!-- Content Start -->

            <RouterView v-slot="{ Component }" class="px-4 vh-100">
                <template v-if="Component">
                    <Transition mode="out-in">
                        <KeepAlive>
                            <Suspense>
                                <!-- main content -->
                                <component :is="Component"></component>

                                <!-- loading state -->
                                <template #fallback>
                                    <Spinner />
                                </template>
                                <template #error="{ error }">
                                    <div class="error-message">
                                        <p>
                                            Something went wrong while loading
                                            the page.
                                        </p>
                                        <p>
                                            <strong>Error:</strong>
                                            {{ error.message }}
                                        </p>
                                    </div>
                                </template>
                            </Suspense>
                        </KeepAlive>
                    </Transition>
                </template>
            </RouterView>

            <!-- Content End -->

            <!-- Footer Start -->
            <div class="container-fluid pt-4 px-4">
                <div class="bg-light rounded-top p-4">
                    <div class="row">
                        <div class="col-12 col-sm-6 text-center text-sm-start">
                            &copy; <a href="#">Your Site Name</a>, All Right
                            Reserved.
                        </div>
                        <div class="col-12 col-sm-6 text-center text-sm-end">
                            <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                            Designed By
                            <a href="https://htmlcodex.com">HTML Codex</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer End -->
        </div>
        <!-- Content End -->
        <!-- Back to Top -->
        <!-- <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"
        ><i class="bi bi-arrow-up"></i
    ></a> -->
    </div>
</template>
