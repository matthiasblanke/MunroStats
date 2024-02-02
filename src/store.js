// store.js
import { reactive, computed } from 'vue';
const munroURL = new URL('./assets/data/all_hills.json', import.meta.url).href;


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

export const data_dict = reactive({
    'humps': {  'name': 'humps',
                'shortName': 'Hu',
                'url': new URL('./assets/data/humps.geojson', import.meta.url).href,
                'colors': 'rgba(180, 43, 81, 0.9)',
                'store': computed(() => store.showHumps)},
    'marilyns': {   'name': 'marilyns', 
                    'shortName': 'Ma',
                    'url': new URL('./assets/data/marilyns.geojson', import.meta.url).href, 
                    'colors': 'rgba(230, 62, 109, 0.9)',
                    'store': computed(() => store.showMarilyns)},
    'grahamTops': { 'name': 'grahamTops', 
                    'shortName': 'GT',
                    'url': new URL('./assets/data/graham_top.geojson', import.meta.url).href, 
                    'colors': 'rgba(145, 150, 179, 0.9)',
                    'store': computed(() => store.showGrahamTops)},
    'grahams': {    'name': 'grahams', 
                    'shortName': 'G',
                    'url': new URL('./assets/data/grahams.geojson', import.meta.url).href, 
                    'colors': 'rgba(120, 90, 158, 0.9)',
                    'store': computed(() => store.showGrahams)},
    'corbettTops': {'name': 'corbettTops', 
                    'shortName': 'CT',
                    'url': new URL('./assets/data/corbett_top.geojson', import.meta.url).href, 
                    'colors': 'rgba(255, 120, 158, 0.9)',
                    'store': computed(() => store.showCorbettTops)},
    'corbetts': {   'name': 'corbetts', 
                    'shortName': 'C',
                    'url': new URL('./assets/data/corbetts.geojson', import.meta.url).href, 
                    'colors': 'rgba(190, 81, 127, 0.9)',
                    'store': computed(() => store.showCorbetts)},
    'munroTops': {  'name': 'munroTops',
                    'shortName': 'MT',
                    'url': new URL('./assets/data/munro_tops.geojson', import.meta.url).href, 
                    'colors': 'rgba(125, 25, 53, 0.9)',
                    'store': computed(() => store.showMunroTops)},
    'munros': { 'name': 'munros', 
                'shortName': 'M',
                'url': new URL('./assets/data/munros.geojson', import.meta.url).href,
                'colors': 'rgba(66, 5, 22, 0.9)',
                'store': computed(() => store.showMunros)},
});