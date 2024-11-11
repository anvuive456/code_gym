<script lang="ts">
import { onMounted } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "AdminUsers",

    data: () => {
        return {
            users: [] as Array<{ username: string }>,
        };
    },
    beforeMount: async function () {
        const users = await fetch("/users", {
            method: "POST",
        }).then(res => res.json());
        this.setUsers(users);
    },

    methods: {
        setUsers: function (users: Array<{ username: string }>): void {
            this.users = users;
        },
    },
});
</script>
<template>
    <div>Hello world</div>
</template>
