<script setup>
import OptionsPanel from '../components/OptionsPanel.vue';
import ScatterChart from '../components/ScatterChart.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { store } from '../store.js';

const data = ref(null);
const yKey = ref('Metres');
const xKey = ref('Drop');
const itemKey = ref('Number');

onMounted(async () => {
    data.value = await store.getMunros();
});

</script>

<template>
    <div class='stats-container'>
        <div class='graph-options'>
            <select class='keySelect' id='xKeySelect' v-model='xKey'>
                <option value='y' selected>No Key</option>
                <option value='Drop'>Drop</option>
            </select>
            {{ xKey }}
            <select class='keySelect' id='yKeySelect' v-model='yKey'>
                <option value='Metres' selected>Metres</option>
                <option value='Feet'>Feet</option>
            </select>
            {{ yKey }}
        </div>

        <ScatterChart :title='"Test Scatter"' :xKey='xKey' :yKey='yKey' :data='data' 
            :itemKey='itemKey' v-if="data != null"/>

    </div>
    <OptionsPanel :showOptions="true"/>
</template>

<style scoped>

.graph-options {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0);
    width: 200px;
    padding: 10px;
    font-weight: lighter;
    font-size: 24;
    right: 5%;
    z-index: 10;
}

.keySelect {
    background-color: whitesmoke;
    padding: 10px;
    font-weight: lighter;
    font-size: 16;
}

.stats-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: whitesmoke;
    padding-bottom: 40px;
    padding-top: 80px;
}

.line {
    stroke: black;
    stroke-width: 0.08px;
    fill: none;
    /* fill: none; */
}

g {
    transform: translate(0,0) scale(50);
}

line:hover {
    stroke: red;
    stroke-width: 0.1px;
}
</style>
