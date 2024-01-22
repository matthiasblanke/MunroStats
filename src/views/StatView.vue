<script setup>
import OptionsPanel from '../components/OptionsPanel.vue';
import ScatterChart from '../components/ScatterChart.vue';
import { ref, onMounted, watch } from 'vue';
import { store, data_dict } from '../store.js';

let data = null;
const selected_data = ref([]);
const yKey = ref('Metres');
const xKey = ref('Drop');
const itemKey = ref('Number');

onMounted(async () => {
    data = await store.getMunros();

    // Update the map to show a kind of mountain or not or not
    for (const hillType in data_dict) {
        updateStat(data_dict[hillType]['shortName'], data_dict[hillType]['store']);
        watch(() => data_dict[hillType]['store'],
            () => {
                updateStat(data_dict[hillType]['shortName'], data_dict[hillType]['store']);
            }
        )
    }
});

const updateStat = (hillType, addOrRemove) => {
    if (addOrRemove) {
        selected_data.value = selected_data.value.concat(data.filter((item) => {
            return item['class'].includes(hillType);
        }));
    } else {
        selected_data.value = selected_data.value.filter((item) => {
            return !item['class'].includes(hillType);
        });
    }
}

</script>
 
<template>
    <div class='stats-container'>
        <div class="graph-container">
            <ScatterChart :title='"Test Scatter"' :xKey='xKey' :yKey='yKey' :data='selected_data' 
                :itemKey='itemKey' v-if="selected_data != null"/>
            <div class='graph-options'>
                
                <select class='keySelect' id='xKeySelect' v-model='xKey'>
                    <option value='Random' selected>Random</option>
                    <option value='Drop'>Drop</option>
                </select>
                <select class='keySelect' id='yKeySelect' v-model='yKey'>
                    <option value='Metres' selected>Metres</option>
                    <option value='Feet'>Feet</option>
                </select>
            </div>
        </div>
    </div>
    <OptionsPanel :showOptions="true"/>
</template>

<style scoped>

.graph-options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-between;
    background-color: rgba(255, 255, 255, 0);
    width: 200px;
    padding: 10px;
    font-weight: lighter;
    font-size: 24;
    z-index: 10;
}

.keySelect {
    background-color: whitesmoke;
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
    font-weight: lighter;
    font-size: 16px;
    border: 1px solid rgba(10, 10, 10, 0);
    transition: 0.5s ease border;
}

.keySelect:hover {
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    border: 1px solid var(--blue-dark);
}

.graph-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 100%;
}

.stats-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: whitesmoke;
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

@media only screen and (max-width: 1800px) {
    .graph-container {
        width: 75%;
    }
}

@media only screen and (max-width: 1600px) {
    .graph-container {
        width: 70%;
    }
}

@media only screen and (max-width: 1200px) {
    .graph-container {
        width: 60%;
    }
}

@media only screen and (max-width: 800px) {
    .graph-container {
        width: 90%;
    }
}

</style>
