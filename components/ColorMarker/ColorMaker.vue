<template>
    <div id="colorItem" :style="{background: color,  width: width}">
        <div :style="{visibility: 'hidden'}">
            color
        </div>
    </div>
</template>

<script>
    export default {
        name: "ColorMaker",
        props: {
            color: {
                type: String,
                default: function () {
                    return "";
                }
            },
            width: {
                type: String,
                default: function () {
                    return "10px";
                }
            }
        }
    }
</script>

<style scoped>

</style>