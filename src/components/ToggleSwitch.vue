<script setup>

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>

<template>
    <label class="switch">
        <input type="checkbox" :checked="modelValue" @click="$emit('update:modelValue', !modelValue)">
        <span class="slider round"></span>
    </label>
</template>

<style scoped>
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0px;
    height: 0px;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(19, 32, 67, 0.2);
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: rgba(19, 32, 67, 1);
}

input:hover+.slider {
    box-shadow: 0 0 3px rgba(19, 32, 67, 1);
}

input:checked+.slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 20px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>