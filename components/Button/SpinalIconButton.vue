<template>
    <base-icon-button-in
            @click="$emit('click')"
            v-if="icon_type === 'in'"
            :icon="icon"
            :tool-tip="toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
            :font-color="fontColor"
            :background-color="backgroundColor"
    />
    <base-icon-button-class
            @click="$emit('click')"
            v-else-if="icon_type === 'class'"
            :icon="icon"
            :tool-tip="toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
            :font-color="fontColor"
            :background-color="backgroundColor"
    />
    <base-icon-button-src
            @click="$emit('click')"
            v-else
            :icon="icon"
            :tool-tip="toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
            :font-color="fontColor"
            :background-color="backgroundColor"
    />
</template>

<script>
    import BaseIconButtonClass from "./BaseIconButtonClass.vue";
    import BaseIconButtonIn from "./BaseIconButtonIn.vue";
    import BaseIconButtonSrc from "./BaseIconButtonSrc.vue";

    export default {
        name: "SpinalIconButton",
        components: {BaseIconButtonSrc, BaseIconButtonIn, BaseIconButtonClass},
        props: {
            fontColor: {
                type: String,
                default: function () {
                    return "#FFF";
                }
            },
            backgroundColor: {
                type: String,
                default: function () {
                    return "#2d3d93";
                }
            },
            toolTip: {
                type: String,
                default: function () {
                    return "";
                }
            },
            icon: {
                type: String,
                required: true
            },
            icon_type: {
                type: String,
                default: function () {
                    return "in";
                }
            },
            toolTipDirection: {
                type: String,
                default: "right"
            }
        }
    }
</script>

<style scoped>

</style>