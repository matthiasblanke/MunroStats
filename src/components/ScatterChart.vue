<script setup>
import { computed, ref, onMounted, watch, isRef } from "vue";
import { scaleLinear } from "d3-scale";
// import { axisTop, axisBottom } from "d3-axis";
import { max, min } from "d3-array";
import { selectAll } from "d3-selection";
import { store } from "../store";
import * as d3 from "d3";

const svgWidth = ref(0);
const svgHeight = ref(0);
const redrawToggle = ref(true);
const svg = ref(null);
const radius = ref(5);
const gy = ref();
const gx = ref();

const props = defineProps({
    title: String,
    xKey: String,
    yKey: String,
    itemKey: String,
    data: Array,
});

watch(() => props.data, () => {
    /* wait shortly before redrawing */
    setTimeout(() => {
        AnimateResize();
    }, 100);
}, {deep: true});

watch(() => [props.yKey, props.xKey], () => {
    AnimateKeyChange();
});

onMounted(() => {
    svgWidth.value = document.getElementById("container").offsetWidth * 0.9;
    svgHeight.value = document.getElementById("container").offsetHeight * 0.8;
    svg.value = d3.select('#container').select('svg');

    gy.value = svg.value.append("g")
        .call(d3.axisRight(yScale.value))
        .attr("class", "axis");

    gx.value = svg.value.append("g")
        .call(d3.axisTop(xScale.value))
        .attr("class", "axis")
        .attr("transform", `translate(0,${svgHeight.value})`);
        

    svg.value.append("text").attr("class", "xlabel").attr("text-anchor", "center")
        .attr("x", svgWidth.value / 2).attr("y", svgHeight.value + 20).text(props.xKey);

    svg.value.append("text").attr("class", "ylabel").attr("text-anchor", "center").attr("x", -svgHeight.value / 2).attr("y", -10)
        .attr("transform", "rotate(-90)").text(props.yKey);

    AddResizeListener();
    AnimateResize();
});

const AnimateKeyChange = () => {
    gx.value.transition()
        .duration(750)
        .call(d3.axisTop(xScale.value))
        .attr("transform", `translate(0,${svgHeight.value})`);
    
    gy.value.transition()
        .duration(750)
        .call(d3.axisRight(yScale.value))

    svg.value.selectAll(".xlabel").remove();
    svg.value.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "center")
        .attr("x", svgWidth.value / 2)
        .attr("y", svgHeight.value + 20)
        .text(props.xKey);

    svg.value.selectAll(".ylabel").remove();
    svg.value.append("text").attr("class", "ylabel").attr("text-anchor", "center").attr("x", -svgHeight.value / 2).attr("y", -10)
        .attr("transform", "rotate(-90)").text(props.yKey);
};

const AnimateResize = () => {

    svg.value = d3.select('#container').select('svg');
    svg.value.selectAll('.axis').remove();

    gy.value = svg.value.append("g")
        .call(d3.axisRight(yScale.value))
        .attr("class", "axis");
    gx.value = svg.value.append("g")
        .call(d3.axisTop(xScale.value))
        .attr("class", "axis")
        .attr("transform", `translate(0,${svgHeight.value})`);

    selectAll("circle")
        .data(props.data)
        .attr("r", 0);

    selectAll("circle")
        .data(props.data)
        .transition()
        .delay((d, i) => {
            return i * 2 / props.data.length * 1000;
        })
        .duration(200)
        .attr("r", () => {
            return radius.value;
        });
};

const AddResizeListener = () => {
    window.addEventListener("resize", () => {
    redrawToggle.value = false;
    setTimeout(() => {
        redrawToggle.value = true;
        svgWidth.value = document.getElementById("container").offsetWidth * 0.9;
        svgHeight.value = document.getElementById("container").offsetHeight * 0.8;
        AnimateResize();
    }, 600);
    });
};


const dataMaxY = computed(() => {
    return max(props.data, d => {
        return d[props.yKey];
    });
});

const dataMaxX = computed(() => {
    return max(props.data, d => {
        return d[props.xKey];
    });
});

const dataMinX = computed(() => {
    return min(props.data, d => {
        return d[props.xKey];
    });
});

const dataMinY = computed(() => {
    return min(props.data, d => {
        return d[props.yKey];
    });
});

const xScale = computed(() => {
    return scaleLinear()
        .rangeRound([0, svgWidth.value])
        .domain([dataMinX.value - 0.5, dataMaxX.value + 0.5]);
});

const yScale = computed(() => {
    return scaleLinear()
        .rangeRound([svgHeight.value, 0])
        .domain([dataMinY.value - 0.05 * dataMinY.value, dataMaxY.value + 0.05 * dataMaxY.value]);
});

const popUpInfo = (item) => {
    store.mountainInfo = {
        name: item.Name,
        height: item.Metres,
        feet: item.Feet,
        drop: item.Drop,
        hill_bagging: item['Hill-bagging'],
    }
};

</script>


<template>
    <div id="container" class="svg-container">
        <svg v-if="redrawToggle" :width="svgWidth" :height="svgHeight">
            <g>
                <circle v-for="item in data" class="scatter-points" :key="item[itemKey]" 
                    :r="0" :cx="xScale(item[xKey])" :cy="yScale(item[yKey])" @mouseover="popUpInfo(item)">
                </circle>
            </g>
        </svg>
    </div>
</template>


<style scoped>
svg {
    /* background-color: rgb(229, 226, 226); */
    /* border: 1px solid black; */
    padding: 50px;
}

.scatter-points {
    fill: var(--blue-light);
    stroke: var(--blue-dark);
    transition: cx 1.2s ease-in-out, cy 1.2s ease-in-out, r 0.3s ease-in-out;
}

.scatter-points:hover {
    fill: var(--blue-dark);
    cursor: pointer;
}

.svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    /* padding-bottom: 1%; */
    vertical-align: top;
}
</style>
