<script setup lang="ts">
import NavBar from "../../views/user/NavBar.vue";
import Header from "../../views/user/Header.vue";
import ProfileUser from "../../components/user/Profile.vue";
import { ref,  watchEffect,onMounted } from "vue";
import useSession from "../../hooks/useSession";

// const userName = ref("");
 
const session = useSession();

watchEffect(()=>{
            console.log('session data::',session.sessionData);
        })
console.log('sessionsession ',session); 
onMounted(() => { 
            session.fetchSession(); 
        });
</script>

<template>
  <NavBar />
  <Header title="Thông tin người dùng" />
  <ProfileUser :userFullName="session.sessionData.value?.username||'khong user name'" 
  :user-name="session.sessionData.value?.fullname|| 'Không có tên'" 
  :user-email="session.sessionData.value?.email||'khong email'" 
  :user-phone="session.sessionData.value?.phone||'khong email'"
  :user-gender="session.sessionData.value?.gender||'khong gender'"  />
</template>