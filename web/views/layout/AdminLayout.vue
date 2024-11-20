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
    <!-- Main Admin Layout -->
    <div class="columns is-gapless">
        <!-- Sidebar Column -->
        <div class="column is-narrow" style="position: fixed; overflow-y: auto">
            <SideBar />
        </div>

        <!-- Content Column -->
        <div class="column" style="margin-left: 250px; overflow-y: auto">
            <div class="section p-4">
                <RouterView v-slot="{ Component, route }">
                    <template v-if="Component">
                        <Transition mode="out-in">
                            <!-- <KeepAlive> -->
                            <Suspense>
                                <!-- Main Content -->
                                <div :key="route.name">
                                    <component :is="Component" />
                                </div>

                                <!-- Loading State -->
                                <template #fallback>
                                    <Spinner />
                                </template>

                                <!-- Error State -->
                                <template #error="{ error }">
                                    <div class="notification is-danger">
                                        <p>
                                            <strong>Error:</strong>
                                            {{ error.message }}
                                        </p>
                                        <p>
                                            Something went wrong while loading
                                            the page.
                                        </p>
                                    </div>
                                </template>
                            </Suspense>
                            <!-- </KeepAlive> -->
                        </Transition>
                    </template>
                </RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section {
    padding: 1.5rem; /* Optional: Customize spacing if needed */
}
</style>
