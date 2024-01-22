<script setup>
import ToggleSwitch from '../components/ToggleSwitch.vue';
import { RouterLink } from 'vue-router';
import { store } from '../store'
import MountainInfoPanel from './MountainInfoPanel.vue';
import { ref, onMounted } from 'vue';


defineProps(['showOptions'])

const smallScreen = ref(false);

// Add event listener to check width of screen
onMounted(() => {
    window.addEventListener('resize', checkWidth);
    checkWidth();
});

const checkWidth = () => {
    if (window.innerWidth < 800) {
        smallScreen.value = true;
    } else {
        smallScreen.value = false;
        // showOptions.value = true;
    }
}

</script>

<template>
    <div class="header">

        <Transition name="fade-menu">
            <div class="menu-row">
                <RouterLink to="/">
                    <button class="header-button">Map</button>
                </RouterLink>
                <RouterLink to="/stats">
                    <button class="header-button">Stats</button>
                </RouterLink>
                <RouterLink to="/about">
                    <button class="header-button">About</button>
                </RouterLink>
                <button class="header-button" @click="showOptions = !showOptions" v-if="smallScreen">Menu</button>
            </div>
        </Transition>

        <Transition name="fadein">
            <div class="options-container" v-show="showOptions">
                <h2> Scottish Mountains </h2>

                <div class="side-by-side">
                    <div class="single-option">
                        <ToggleSwitch v-model="store.showMunros"></ToggleSwitch>
                        &nbsp;&nbsp;Munros
                    </div>

                    <div class="single-option">
                        <ToggleSwitch v-model="store.showMunroTops"></ToggleSwitch>
                        &nbsp;&nbsp;Munro Tops
                    </div>
                </div>

                <div class="side-by-side">
                    <div class="single-option">
                        <ToggleSwitch v-model="store.showCorbetts"></ToggleSwitch>
                        &nbsp;&nbsp;Corbetts
                    </div>

                    <div class="single-option">
                        <ToggleSwitch v-model="store.showCorbettTops"></ToggleSwitch>
                        &nbsp;&nbsp;Corbett Tops
                    </div>
                </div>

                <div class="side-by-side">
                    <div class="single-option">
                        <ToggleSwitch v-model="store.showGrahams"></ToggleSwitch>
                        &nbsp;&nbsp;Grahams
                    </div>

                    <div class="single-option">
                        <ToggleSwitch v-model="store.showGrahamTops"></ToggleSwitch>
                        &nbsp;&nbsp;Graham Tops
                    </div>
                </div>

                <hr>
                <h2> English Mountains </h2>

                <div class="single-option">
                    <ToggleSwitch v-model="store.showHumps"></ToggleSwitch>
                    &nbsp;&nbsp;Humps
                </div>

                <div class="single-option">
                    <ToggleSwitch v-model="store.showMarilyns"></ToggleSwitch>
                    &nbsp;&nbsp;Marilyns
                </div>

                <hr>
                <h2> Further Settings</h2>

                <div class="side-by-side">
                    <div class="single-option">
                        <ToggleSwitch v-model="store.showInfo"></ToggleSwitch>
                        &nbsp;&nbsp;Show Info
                    </div>

                    <div class="single-option">
                        <ToggleSwitch v-model="store.showIsolation"></ToggleSwitch>
                        &nbsp;&nbsp;Show Isolation
                    </div>
                </div>
            </div> 
        </Transition>       
        <MountainInfoPanel v-show="showOptions"/>

    </div>


</template>


<style scoped>

.side-by-side {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.single-option {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex: 1;
    align-items: center;
    font-weight: lighter;
    font-size: 14px;
}

.menu-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.header-button {
    background-color: var(--box-bg-color);
    border-radius: var(--box-border-radius);
    border-top-left-radius: var(--box-border-radius-top-left);
    box-shadow: 0px 5px 8px -5px var(--blue-light);
    border: 1px solid rgba(10, 10, 10, 0);
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 8px;
    padding-top: 8px;
    color: rgb(19, 32, 67);
    font-size: 20px;
    transition: border 0.3s ease;
    font-weight: lighter;
}

/* Add css for hovering over header-button */
.header-button:hover {
    cursor: pointer;
    border: 1px solid var(--blue-dark);
}

.header {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    left: 2%;
    top: 2%;
    width: 15%;
}

.options-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    box-shadow: 0px 5px 8px -5px var(--blue-light);
    border: 1px solid rgba(10, 10, 10, 0);
    background-color: var(--box-bg-color);
    border-radius: var(--box-border-radius);
    border-top-left-radius: var(--box-border-radius-top-left);
    margin-top: 10px;
    margin-bottom: 10px;
    transition: border 0.3s ease;
}

.options-container hr {
    width: 100%;
    border: 1px solid var(--blue-dark);
    color: var(--blue-dark);
    border-top: 0;
    border-left: 0;
    border-right: 0;
    box-sizing: border-box;
    height: 1px;
    margin: 0;
}

.options-container h2 {
    font-size: 20px;
    font-weight: lighter;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.options-container:hover {
    border: 1px solid var(--blue-dark);
}

.menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    left: 2%;
    top: 2%;
    width: 15%;
}

.fade-menu-move {
    transition: all 0.5s ease;
}

.fadein-enter-from,
.fadein-leave-to {
    opacity: 0;
    transform: translateY(50px);
}

.fadein-enter-active,
.fadein-leave-active {
    transition: all 0.5s ease;
}

/* Add media queries for smaller screen sizes */
@media only screen and (max-width: 1800px) {
    .header {
        width: 20%;
    }
}

@media only screen and (max-width: 1600px) {
    .header {
        width: 25%;
    }
}

@media only screen and (max-width: 1200px) {
    .header {
        width: 30%;
    }
    .single-option {
        font-size: 12px;
    }
}

@media only screen and (max-width: 1000px) {
    .header {
        width: 35%;
    }

    .header-button {
        font-size: 16px;
    }
}

@media only screen and (max-width: 800px) {
    .header {
        width: 80%;
        left: 10%;
    }

    .header-button {
        font-size: 20px;
    }

    .single-option {
        font-size: 16px;
    }
}

</style>