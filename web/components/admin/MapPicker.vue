<template>
    <div>
        <!-- Map Container -->
        <div id="map" style="height: 300px"></div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";

const props = defineProps({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    onLocationChange: {
        type: Function,
        required: true,
    },
});

const map = ref(null);
const marker = ref(null);

// Initialize map and marker
watch(
    [props.lat, props.lng],
    ([newLat, newLng]) => {
        if (map.value) {
            map.value.setView([newLat, newLng], 13);
            marker.value.setLatLng([newLat, newLng]);
        }
    },
    { immediate: true },
);

// Set up the Leaflet map
onMounted(() => {
    map.value = L.map("map").setView([props.lat, props.lng], 13);

    // Adding tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map.value,
    );

    // Adding a draggable marker at the initial location
    marker.value = L.marker([props.lat, props.lng], { draggable: true }).addTo(
        map.value,
    );

    // Update coordinates when marker is dragged
    marker.value.on("dragend", event => {
        const { lat, lng } = event.target.getLatLng();
        props.onLocationChange(lat, lng);
    });
});
</script>

<style scoped>
#map {
    width: 300px;
    height: 300px;
}
</style>
