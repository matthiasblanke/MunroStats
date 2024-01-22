<script setup>
import { store } from '../store';
import "d3";

</script>

<template>
    <Transition name="mountain-info-trans">
        <div class="mountain-info" v-if="store.showInfo">
            <div class="mountain-selected" v-if="store.mountainInfo.name">
                <p>
                    <b>{{ store.mountainInfo.name }}</b>
                </p>
                <p>
                    {{ store.mountainInfo.height }} metres (<i>{{ store.mountainInfo.feet }} feet</i>)
                </p>
                <p>

                </p>
                <p>
                    Drop: {{ store.mountainInfo.drop }}
                </p>
                <p>
                    <a :href="store.mountainInfo.hill_bagging">
                        See on hill-bagging
                    </a>
                </p>
            </div>
            <div class="nothing-selected" v-else>
                Please select a mountain.
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.mountain-info-trans-enter-from,
.mountain-info-trans-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.mountain-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: left;
    padding: 10px;
    left: 2%;
    bottom: 10%;
    height: 40%;
    max-width: 100%;
    border-radius: var(--box-border-radius);
    border-top-left-radius: var(--box-border-radius-top-left);
    font-weight: lighter;
    color: black;
    margin-top: 10px;
    font-size: 16px;
    border: 1px solid rgba(10, 10, 10, 0);
    background-color: var(--box-bg-color);
    box-shadow: 0px 5px 8px -5px var(--blue-light);
    transition: transform 0.3s, opacity 0.3s, border 0.3s ease;
}

.mountain-info:hover {
    border: 1px solid var(--blue-dark);
}

a {
    color: black
}
a:hover, a:active {
    color: var(--blue-dark);
}

a:visited {
    color: black;
}
</style>
