<template>
    <md-button
            class="md-icon-button"
            @click="$emit('click')"
            :style="{background: backgroundColor}"
    >
        <md-tooltip :md-delay="toolTipDelay"
                    :md-direction="toolTipDirection"
                    v-if="toolTip.length > 0">
            {{toolTip}}
        </md-tooltip>
        <md-icon :style="{width: width, color: fontColor}">
            {{icon}}
        </md-icon>
    </md-button>
</template>

<script>
    export default {
        name: "BaseIconButtonIn",
        props: {
            toolTip: {
                type: String,
                default: function () {
                    return "";
                }
            },
            toolTipDirection: {
                type: String,
                default: function () {
                    return "left";
                },
                validator: function (data) {
                    return data === "left"
                        || data === "right"
                        || data === "top"
                        || data === "bottom";
                }
            },
            toolTipDelay: {
                type: String,
                default: function () {
                    return 300;
                }
            },
            icon: {
                type: String,
                required: true
            },
            fontColor: {
                type: String,
                default: function () {
                    return ""
                }
            },
            backgroundColor: {
                type: String,
                default: function () {
                    return ""
                }
            },
            width: {
                type: String,
                default: function () {
                    return "20px"
                }
            }
        }
    }
</script>

<style scoped>

</style>