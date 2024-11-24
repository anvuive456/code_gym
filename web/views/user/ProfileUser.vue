<script setup lang="ts">
import NavBar from "../../views/user/NavBar.vue";
import Header from "../../views/user/Header.vue";
import Footer from "../../views/user/Footer.vue";
import Profile from "../../components/user/Profile.vue";
import { ref, watchEffect, onMounted } from "vue";
import useSession from "../../hooks/useSession";

const session = useSession();

watchEffect(() => {
    console.log("session data::", session.sessionData);
});
onMounted(() => {
    session.fetchSession();
});
</script>

<template>
    <NavBar />
    <Header title="Thông tin người dùng" />
    <Profile
        :username="session.sessionData.value?.username || ''"
        :fullname="session.sessionData.value?.fullname || ''"
        :email="session.sessionData.value?.email || ''"
        :phone="session.sessionData.value?.phone || ''"
        :gender="session.sessionData.value?.gender || ''"
        :branch="session.sessionData.value?.branch||''" 
        :fitnessPackage="session.sessionData.value?.fitnessPackage||''" 
    />

    <Footer />
</template>
