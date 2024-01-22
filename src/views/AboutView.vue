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
                This is a website for viewing mountains in the UK. It uses data from <a href="https://www.hill-bagging.co.uk/" target="_blank">hill-bagging.co.uk</a> to display mountains on a map.    
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
                All data stems from the wonderful resource <a href="https://www.hills-database.co.uk" target="_blank">hills-database.co.uk</a>.
                The data was then processed using Python and the <a href="https://pandas.pydata.org/" target="_blank">pandas</a> library.
                
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

.about h3 {
    margin-top: 10px;
    margin-bottom: 10px;
}

</style>