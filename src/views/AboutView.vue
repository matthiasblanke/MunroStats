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
                This website is a small personal project for learning VueJS. 
                It shows Scottish and British mountains by visualizing data from <a href="https://www.hills-database.co.uk" target="_blank">hills-database.co.uk</a>
                on a <a href="https://www.maptiler.com" target="_blank">maptiler.com</a>-based map using <a href="https://maplibre.org/maplibre-gl-js/docs/" target="_blank">maplibre-gl-js</a>.
                Stats visualisations are done with <a href="https://d3js.org">d3js</a>.
            </p>

            <h3> Hill types </h3>
            <p>
                The following hill types are displayed on the map:
                <ul>
                    <li> Munros </li>
                    <li> Munro Tops </li>
                    <li> Marilyns </li>
                    <li> Humps </li>
                </ul>
            </p>
            
            <h3> Data </h3>
            <p>
                All data stems from <a href="https://www.hills-database.co.uk" target="_blank">hills-database.co.uk</a>.
                Data was processed using the <a href="https://pandas.pydata.org/" target="_blank">pandas</a> library.
                All code of the site is available on <a href="https://github.com/matthiasblanke/MunroStats" target="_blank">github</a>.  
            </p>

            <h3> Contact </h3>
            <p>
                If you have any questions or feedback, please contact me <a href="mailto:munrostats@jongl.email">here</a>.
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
    padding-bottom: 40px;
    padding-top: 150px;
    font-weight: lighter;
}

.about-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
    /* Make text block */
    text-indent: 20px;
    text-align: left;
    text-justify: auto;
    /* Left align text */
    /* text-align-last: left; */
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