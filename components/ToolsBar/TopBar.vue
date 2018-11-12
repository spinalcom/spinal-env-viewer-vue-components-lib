<template>
    <tools-bar class="top-bar"
            :buttons="buttons"
            :classes="classes"
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
        },
        data: function () {
            return {
                classes: {
                    a: {
                        size: "500px"
                    }
                }
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