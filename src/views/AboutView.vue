<script setup>
import OptionsPanel from '../components/OptionsPanel.vue';
import { onMounted } from 'vue';
import { store } from '../store.js';

onMounted(async () => {
    store.showOptions = false;
});


</script>

<template>
    <div class="about-container">
        <div class="about-content">
            <h3> About </h3>
            <p>
                This site is a small personal project for learning <a href="https://vuejs.org" target="_blank">vue.js</a>.
                It shows Scottish (and British) mountains by visualizing data from <a href="https://www.hills-database.co.uk" target="_blank">hills-database.co.uk</a>
                on a <a href="https://www.maptiler.com" target="_blank">maptiler.com</a>-based map using <a href="https://maplibre.org/maplibre-gl-js/docs/" target="_blank">maplibre-gl-js</a>.
                Stats visualisations are done with <a href="https://d3js.org">d3js</a>.
            </p>

            <h3> Hill types </h3>
            <p>
                The map displays six Scottish hill types (Munros, Munro Tops, Corbetts, Corbett Tops, Grahams, Graham Tops) and two British hill types (Humps, Marilyns).
                For a detailed explanation of hill types, please see <a href="https://www.hills-database.co.uk/database_notes.html#defs" target="_blank">here</a> or <a href="https://en.wikipedia.org/wiki/Lists_of_mountains_and_hills_in_the_British_Isles" target="_blank">here</a>.
                In the stats, hills that are categorized as multiple classes are only shown in the highest class.
            </p>
            
            <h3> Data </h3>
            <p>
                All data stems from <a href="https://www.hills-database.co.uk" target="_blank">hills-database.co.uk</a>.
                Data was processed using <a href="https://pandas.pydata.org/" target="_blank">pandas</a>.
                All code of the site is available on <a href="https://github.com/matthiasblanke/MunroStats" target="_blank">github</a>.  
            </p>

            <h3> Contact </h3>
            <p>
                If you have questions or feedback, please contact me via <a href="mailto:munrostats@jongl.email">mail</a>.
            </p>
        </div>
    </div>
    <OptionsPanel :showOptions="false"/>
</template>

<style scoped>
.fadein-enter-from, 
.fadein-leave-to {
    opacity: 0;
    transform: translateY(50px);
}
.fadein-enter-active,
.fadein-leave-active {
    transition: all 0.5s ease;
}

.about-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: whitesmoke;
    font-weight: lighter;
    overflow-y: scroll;
}

.about-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
    width: 80%;
    height: 100%;
    max-width: 800px;
    background-color: whitesmoke;
}

.about-container p {
    align-self: flex-start;
    font-size: 16px;
    margin-left: 20px;
    margin-right: 20px;
    text-indent: 20px;
    text-align: left;
    text-justify: auto;
}

.about-content h3 {
    margin-top: 10px;
    margin-bottom: 10px;
}

.about-content a {
    color: var(--blue-dark);
    text-decoration: unterline;
}

.about-content a:hover {
    text-decoration: none;
}

</style>