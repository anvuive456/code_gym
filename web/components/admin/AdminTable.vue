<template>
    <div>
        <h3 class="title is-4 mb-4">{{ title }}</h3>
        <button class="button is-primary is-small" @click="onAdd()">
            Thêm mới
        </button>
        <div class="table-container mt-4">
            <table
                class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
                <thead>
                    <tr>
                        <th
                            v-for="(key, index) in columnKeys"
                            :key="index"
                            class="has-text-weight-semibold sticky-header"
                        >
                            {{ key }}
                        </th>
                        <th class="sticky-header"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                        <td v-for="(value, key) in row" :key="key">
                            {{ value }}
                        </td>
                        <td class="is-actions-cell">
                            <!-- Edit Button -->
                            <button
                                class="button is-small is-info mr-2"
                                @click="onEdit(rowIndex)"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <!-- Delete Button -->
                            <button
                                class="button is-small is-danger"
                                @click="onDelete(rowIndex)"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

// Define props for the component
const props = defineProps({
    title: { type: String, required: true },
    data: { type: Array<any>, required: true },
    onAdd: { type: Function, required: true },
    onEdit: { type: Function, required: true },
    onDelete: { type: Function, required: true },
});

const columnKeys = ref<string[]>([]);

watch(
    () => props.data,
    data => {
        columnKeys.value = data.length > 0 ? Object.keys(data[0]) : [];
    },
);
</script>

<style scoped>
.table {
    width: 100%;
}
.is-actions-cell {
    white-space: nowrap;
    text-align: center;
}

.table-container {
    max-height: 500px;
    overflow-y: auto;
    position: relative;
}

/* Make the header sticky */
.sticky-header {
    border: none;
    position: sticky;
    top: 0;
    background-color: white; /* Set background color to match the table */
    z-index: 1;
}
</style>
