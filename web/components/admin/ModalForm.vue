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
                <form @submit.prevent="handleSubmit">
                    <div
                        v-for="field in fields"
                        :key="field.key"
                        class="field mb-3"
                    >
                        <label :for="field.key" class="label">{{
                            field.label
                        }}</label>
                        <div class="control">
                            <input
                                :type="field.type"
                                class="input"
                                v-model="formData[field.key]"
                                :id="field.key"
                                :step="field.step || undefined"
                                :required="field.required || false"
                            />
                        </div>
                    </div>
                    <button type="submit" class="button is-primary mt-3">
                        {{ submitText }}
                    </button>
                </form>
            </section>
            <footer class="modal-card-foot">
                <!-- <button class="button" @click="closeModal">Cancel</button> -->
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits } from "vue";

// Define props for dynamic configuration
const props = defineProps({
    show: { type: Boolean, required: false, default: false },
    title: { type: String, required: true },
    fields: { type: Array<any>, required: true },
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

// Submit handler
const handleSubmit = () => {
    emit("submit", { ...formData.value, mode: props.mode });
};
</script>

<style scoped>
.modal-card {
    max-width: 600px;
    width: 100%;
}
</style>
