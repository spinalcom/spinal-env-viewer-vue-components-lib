<template>
    <tools-bar class="sideBar"
               :buttons="buttons"
               :option="option"
    />
</template>

<script>
    import ToolsBar from "./ToolsBar.vue";
    export default {
        name: "sideBar",
        components: {ToolsBar},
        props:{
            buttons: {
                type: Array,
                required: true,
            },
            option: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .sideBar{
        border: 2px solid;
        height: 100%;
        width: 50px;
        height: 100%;
    }
</style>