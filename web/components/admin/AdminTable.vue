<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        onDelete: {
            type: Function,
            required: true,
        },
        onEdit: {
            type: Function,
            required: true,
        },
    },
});
</script>
<template>
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4">{{ title }}</h6>
        <button type="submit" class="btn btn-primary btn-sm rounded">
            Thêm mới
        </button>
        <table class="table" style="margin-top: 20px">
            <thead>
                <th
                    v-for="(key, index) in Object.keys(data[0] || {})"
                    :key="index"
                >
                    {{ key }}
                </th>
            </thead>
            <tbody>
                <tr v-for="(d, index) in data" :key="index">
                    <!-- <th scope="row">{{ index + 1 }}</th> -->
                    <td v-for="(value, key) in d" :key="key">{{ value }}</td>

                    <td>
                        <!-- Nút Sửa -->
                        <button
                            class="btn btn-sm btn-warning mr-2 btn-sm rounded"
                            @click="onEdit(index)"
                        >
                            Sửa
                        </button>
                        <!-- Nút Xóa -->
                        <button
                            class="btn btn-sm btn-danger btn-sm rounded"
                            @click="onDelete(index)"
                        >
                            Xóa
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped></style>
