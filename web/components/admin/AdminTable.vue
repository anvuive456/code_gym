<template>
    <div>
        <h3 class="title is-4 mb-4">{{ title }}</h3>
        <button class="button is-primary is-small" @click="onAdd()">
            Thêm mới
        </button>
        <div class="table-container mt-4">
            <table
                class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                style="height: 1px"
            >
                <thead>
                    <tr>
                        <th
                            v-for="(key, index) in colDefs"
                            :key="index"
                            class="has-text-weight-semibold sticky-header"
                        >
                            {{ key.header }}
                        </th>
                        <th class="sticky-header"></th>
                    </tr>
                </thead>
                <tbody v-for="(row, rowIndex) in data" :key="rowIndex">
                    <tr
                        @click="
                            () =>
                                (currIndex =
                                    currIndex == rowIndex ? null : rowIndex)
                        "
                        :class="{ 'is-selected': rowIndex == currIndex }"
                    >
                        <td v-for="col in colDefs" :key="col.key">
                            {{ row[col.key] }}
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
                    <tr
                        class="child-row"
                        :class="{ 'child-show': currIndex == rowIndex }"
                    >
                        <td
                            v-show="currIndex == rowIndex"
                            :colspan="colDefs.length + 1"
                        >
                            <!-- Slot for child content -->
                            <slot :item="row" />
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
    colDefs: {
        type: Array<{
            key: string;
            header: string;
        }>,
        required: true,
    },
    title: { type: String, required: true },
    data: { type: Array<any>, required: true },
    onAdd: { type: Function, required: true },
    onEdit: { type: Function, required: true },
    onDelete: { type: Function, required: true },
});

const currIndex = ref<number | null>(null);

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

.child-row {
    overflow: hidden;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    height: 0;
    transition: all 0.3s ease;
}
.child-row.child-show {
    height: 350px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
</style>
