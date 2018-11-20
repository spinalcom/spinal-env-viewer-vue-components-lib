<template>
    <tools-bar class="top-bar"
            :buttons="buttons"
            :option="option"
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
            option:{
                type: Object
            }
        }
    }
</script>

<style scoped>
    .top-bar {

        min-width: 100%;
        min-height: 30px;
    }
</style>