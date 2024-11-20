<template>
    <div :class="['modal', { 'is-active': props.show }]" :id="modalId">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <button
                    class="delete"
                    aria-label="close"
                    @click="closeModal"
                ></button>
            </header>
            <section class="modal-card-body">
                <form id="hehe-form" @submit.prevent="handleSubmit">
                    <div
                        v-for="field in fields"
                        :key="field.key"
                        class="field mb-3"
                    >
                        <label :for="field.key" class="label">{{
                            field.label
                        }}</label>
                        <div class="control">
                            <!-- Handle text input types -->
                            <input
                                v-if="
                                    field.type === 'text' ||
                                    field.type === 'number' ||
                                    field.type === 'date'
                                "
                                :type="field.type"
                                class="input"
                                v-model="formData[field.key]"
                                :id="field.key"
                                :step="field.step || undefined"
                                :required="field.required || false"
                            />

                            <!-- Handle text area -->
                            <textarea
                                v-else-if="field.type === 'textarea'"
                                class="textarea"
                                v-model="formData[field.key]"
                                :id="field.key"
                                :required="field.required || false"
                            ></textarea>

                            <!-- Handle select dropdown -->
                            <div
                                v-else-if="field.type === 'select'"
                                class="select"
                            >
                                <select
                                    class="input"
                                    v-model="formData[field.key]"
                                    :id="field.key"
                                    :required="field.required || false"
                                >
                                    <option
                                        v-for="option in field.options"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Multi-select checkboxes -->
                            <div
                                class="checkboxes"
                                v-else-if="field.type === 'multi-select'"
                            >
                                <label
                                    v-for="option in field.options"
                                    :key="option.value"
                                    class="checkbox"
                                >
                                    <input
                                        type="checkbox"
                                        :name="field.key"
                                        :value="option.value"
                                        :checked="
                                            formData[field.key]?.includes(
                                                option.value,
                                            )
                                        "
                                        @change="
                                            updateMultiSelect(
                                                field.key,
                                                option.value,
                                                $event,
                                            )
                                        "
                                        :id="`${field.key}-${option.value}`"
                                    />
                                    {{ option.label }}
                                </label>
                            </div>

                            <!-- Fallback for unknown input types -->

                            <input
                                v-else
                                type="text"
                                class="input"
                                v-model="formData[field.key]"
                                :id="field.key"
                            />
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button
                    type="submit"
                    form="hehe-form"
                    class="button is-primary mt-3"
                >
                    {{ submitText }}
                </button>
                <!-- <button class="button" @click="closeModal">Cancel</button> -->
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits } from "vue";
import { DialogFormField } from "./form-field";

// Define props for dynamic configuration
const props = defineProps({
    show: { type: Boolean, required: false, default: false },
    title: { type: String, required: true },
    fields: { type: Array<DialogFormField>, required: true },
    initialData: { type: Object, default: () => ({}) },
    mode: { type: String, default: "add" }, // 'add' or 'edit'
    modalId: { type: String, required: true },
    submitText: { type: String, required: true },
    onClose: { type: Function, required: true },
});

// Set up event emitter
const emit = defineEmits(["submit", "update:show"]);

// Local state for form data
const formData = ref({ ...props.initialData });

// Watch for changes in initialData to reset formData
watch(
    () => props.initialData,
    newData => {
        formData.value = { ...newData };
    },
);

watch(formData, data => console.log("data", data));

// Close modal and trigger the onClose callback
const closeModal = () => {
    emit("update:show", false);
    props.onClose();
};

// Watch the show prop to control modal visibility
watch(
    () => props.show,
    show => {
        if (!show) closeModal();
    },
    { immediate: true },
);

// Update handler for multi-select checkboxes
const updateMultiSelect = (key: string, value: any, event: Event) => {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
        if (!formData.value[key].includes(value)) {
            formData.value[key].push(value);
        }
    } else {
        formData.value[key] = formData.value[key].filter(
            (item: any) => item !== value,
        );
    }
};

// Submit handler
const handleSubmit = () => {
    const submittedData = { ...formData.value };

    // Adjust multi-select fields to ensure data is an array
    props.fields.forEach(field => {
        if (
            field.type === "multi-select" &&
            !Array.isArray(formData.value[field.key])
        ) {
            submittedData[field.key] = formData.value[field.key]
                ? [formData.value[field.key]]
                : [];
        }
    });

    emit("submit", { ...submittedData, mode: props.mode });
};
</script>

<style scoped>
.modal-card {
    max-width: 600px;
    width: 100%;
}
</style>
