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
        updateStat(hillType);
        watch(() => data_dict[hillType]['store'],
            () => {
                updateStat(hillType);
            }
        )
    }
});

const updateStat = (hillType) => {
    let sn = data_dict[hillType]['shortName']
    let addOrRemove = data_dict[hillType]['store'];
    if (addOrRemove) {
        selected_data.value = selected_data.value.concat(data.filter((item) => {
            return item['class'] == sn;
        }));
    } else {
        selected_data.value = selected_data.value.filter((item) => {
            return String(item['class']) != sn;
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
                y-Axis
                <select class='keySelect' id='yKeySelect' v-model='yKey'>
                    <option value='Metres' selected>Metres</option>
                    <option value='Feet'>Feet</option>
                </select>
                <div style='width: 50px;'></div>

                <select class='keySelect' id='xKeySelect' v-model='xKey'>
                    <option value='Random' selected>Random</option>
                    <option value='Drop'>Drop</option>
                </select>
                x-Axis

            </div>
        </div>
    </div>
    <OptionsPanel :showOptions="true"/>
</template>

<style scoped>

.graph-options {
    display: flex;
    flex-direction: row;
    justify-content: baseline;
    align-items: space-between;
    background-color: rgba(255, 255, 255, 0);
    padding: 10px;
    height: 20px;
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
    border: 1px solid var(--blue-light);
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
    height: 80%;
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
