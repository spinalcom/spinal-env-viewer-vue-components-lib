<template>
    <tools-bar class="top-bar"
            :buttons="buttons"
            :option="graph"
    />
</template>

<script>
    import ToolsBar from "./ToolsBar.vue";

    export default {
        name: "topBar",
        components: {ToolsBar},
        props: {
            buttons: {
                type: Array,
                required: true,
            },
            graph:{
                type: Object
            }
        }
    }
</script>

<style scoped>
    .top-bar {
        border: 2px solid;
        min-width: 100%;
        min-height: 30px;
    }
</style>