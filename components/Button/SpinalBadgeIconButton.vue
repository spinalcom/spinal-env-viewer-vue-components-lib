<template>

    <!-- Badge button-->
    <md-badge
            :md-content="badge_label"
            v-if="badge_label.length > 0"
    >
        <spinal-icon-button
                @click="$emit('click')"
                :icon="icon"
                :tool-tip="toolTip"
                tool-tip-delay="300"
                :tool-tip-direction="toolTipDirection"
                :font-color="fontColor"
                :background-color="backgroundColor"
        />
    </md-badge>

    <!-- Normal button -->
    <spinal-icon-button
            @click="$emit('click')"
            v-else
            :icon="icon"
            :icon_type="icon_type"
            :tool-tip="toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
            :font-color="fontColor"
            :background-color="backgroundColor"
    />

</template>

<script>


    import SpinalIconButton from "./SpinalIconButton";

    export default {
        name: "SpinalBadgeIconButton",
        components: {SpinalIconButton},
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
            },
            badge_label: {
                default: function () {
                    return "";
                }
            },
            badge_background_color: {
                type: String,
                default: function () {
                    return "#F68204";
                }
            },
            badge_font_color: {
                type: String,
                default: function () {
                    return "#FFF";
                }
            }
        }

    }
</script>

<style scoped>

</style>