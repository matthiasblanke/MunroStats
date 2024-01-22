// store.js
import { reactive } from 'vue';
const munroURL = new URL('./assets/data/munros.json', import.meta.url).href;


async function getMunros() {
    let munro_data = await fetch(munroURL);
    let obj = await munro_data.json();
    return obj;
}

export const store = reactive({
    showAbout: false,
    showMunros: true,
    showMunroTops: false,
    showCorbetts: false,
    showCorbettTops: false,
    showGrahams: false,
    showGrahamTops: false,
    showHumps: false,
    showMarilyns: false,
    showInfo: true,
    showIsolation: false,
    mountainInfo: {},
    getMunros
})
