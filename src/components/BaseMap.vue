<script setup>
import { Map, NavigationControl } from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw, watch, ref, reactive, computed } from 'vue';
import { store, data_dict } from '../store';
import circle from '@turf/circle';

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const hoveredHill = ref(null);

const isolation = ref(null);
const data = ref(null);

onMounted(async () => {
    data.value = await store.getMunros();
    let list = data.value.sort((first, second) => {
        return first.Metres - second.Metres;
    });
});

// Update the map to show a kind of mountain or not or not
for (const hillType in data_dict) {
    watch(() => data_dict[hillType]['store'],
        () => {
            updateHills(hillType, data_dict[hillType]['store']);
        }
    )  
}

watch(() => store.showIsolation, () => {
    map.value.setLayoutProperty('isolation', 'visibility', store.showIsolation ? 'visible' : 'none');
    if (store.showIsolation) {
        // drawIsolation(e.features[0].geometry.coordinates);
    }
});

const radius = 10; // kilometer
var options = {
    steps: 64,
    units: "kilometers",
};
isolation.value = circle([-4.8171186447143555, 56.23679153954092], radius, options);

const drawIsolation = (xy) => {

    map.value.setLayoutProperty('isolation', 'visibility', 'visible');

    isolation.value = circle(xy, radius, options);
    map.value.getSource('isolation').setData(isolation.value);

}

const initializeHills = (hillType) => {
    map.value.addLayer(
        {
            'id': hillType + '-heat',
            'type': 'heatmap',
            'source': hillType,
            'maxzoom': 9,
            'layout': {
                visibility: 'visible'
            },
            'paint': {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': ['interpolate', ['linear'], ['get', 'Metres'], 0, 0, 6, 1],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(209,229,240)',
                    0.6, 'rgb(253,219,199)',
                    0.8, 'rgba(239,138,98,0.2)',
                    1, data_dict[hillType]['colors']
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 1, 9],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
            }
        }
    );
    map.value.addLayer(
        {
            'id': hillType+'-point',
            'type': 'circle',
            'source': hillType,
            'minzoom': 7,
            'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    ['interpolate', ['linear'], ['get', 'Metres'], 0, 2, 1200, 4],
                    20,
                    ['interpolate', ['linear'], ['get', 'Metres'], 0, 2, 1200, 10]
                ],
                // Color circle by earthquake magnitude
                'circle-color': data_dict[hillType]['colors'],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
            }
        }
    );
    map.value.on('mousemove', hillType+'-point', (e) => {
        if (e.features.length > 0) {
            
            hoveredHill.value = e.features[0].properties.Name;
            map.value.setFeatureState(
                { source: hillType, id: hoveredHill.value },
                { hover: true }
            );
            store.mountainInfo = {
                name: e.features[0].properties.Name,
                height: e.features[0].properties.Metres,
                feet: e.features[0].properties.Feet,
                drop: e.features[0].properties.Drop,
                hill_bagging: e.features[0].properties['Hill-bagging'],
            }
        }
    });
    map.value.on('mouseenter', hillType + '-point', () => {
        map.value.getCanvas().style.cursor = 'pointer';
    });
    map.value.on('mouseleave', hillType + '-point', () => {
        map.value.getCanvas().style.cursor = '';
    });
    map.value.on('click', hillType + '-point', (e) => {
        if (store.showIsolation) {
            drawIsolation(e.features[0].geometry.coordinates);
        }
        map.value.flyTo({
            center: e.features[0].geometry.coordinates,
            zoom: 10,
            speed: 0.2,
            curve: 3
        });
    });
}

const updateHills = (hillType, watching) => {
    map.value.setLayoutProperty(hillType + '-heat', 'visibility', watching ? 'visible' : 'none');
    map.value.setLayoutProperty(hillType + '-point', 'visibility', watching ? 'visible' : 'none');
}

onMounted(() => {
    const apiKey = import.meta.env.VITE_MAPTILER_KEY;

    const initialState = { lat: 56.9, lng: -4.64, zoom: 6.8 }; // 5

    map.value = markRaw(new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/outdoor/style.json?key=${apiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
        attributionControl: false
    }));

    map.value.dragPan.enable();
    map.value.addControl(new NavigationControl());

    map.value.on('load', () => {
        // Add a geojson point source.
        // Heatmap layers also work with a vector tile source.
        for (const hillType in data_dict) {
            map.value.addSource(hillType, {
                'type': 'geojson',
                'data': data_dict[hillType]['url']
            });
        }

        map.value.addSource('isolation', {
            'type': 'geojson',
            'data': isolation.value
        });

        map.value.addLayer({
            id: "isolation",
            type: "fill",
            source: 'isolation',
            paint: {
                "fill-color": "#8CCFFF",
                "fill-opacity": 0.3,
                "fill-outline-color": "#FFFFFF",
            },
            layout: {
                visibility: 'none'
            }
        });

        for (const hillType in data_dict) {
            initializeHills(hillType);
            updateHills(hillType, data_dict[hillType]['store']);
        }
    });
});

onUnmounted(() => {
    map.value?.remove();
})

</script>
<template>
    <link rel='stylesheet' href='https://unpkg.com/maplibre-gl@3.5.2/dist/maplibre-gl.css' />
    <div class="map-wrap">
        <a href="https://www.maptiler.com" class="watermark"><img src="https://api.maptiler.com/resources/logo.svg"
                alt="MapTiler logo" /></a>
        <div class="map" ref="mapContainer"></div>
        <div class="attribution">
            <a href="https://www.maptiler.com/copyright/" class="attribution-link">&copy; MapTiler</a>
            <a href="https://www.openstreetmap.org/copyright" class="attribution-link">&copy; OpenStreetMap contributors</a>
        </div>
    </div>
</template>


<style scoped>
.attribution {
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.attribution-link {
    font-size: 14px;
    text-decoration: none;
    color: rgba(19, 32, 67, 0.9);
    padding-left: 5px;
    padding-right: 5px;
    transition: 0.5s ease all;
}

.attribution-link:hover {
    color: rgb(31, 65, 114);
    cursor: pointer;
}

.map-wrap {
    /* position: relative; */
    display: flex;
    height: 100%;
    flex: 1;
}

.map {
    /* position: absolute; */
    width: 100%;
    height: 100%;
}

.watermark {
    position: fixed;
    left: 10px;
    bottom: 10px;
    z-index: 999;
}
</style>