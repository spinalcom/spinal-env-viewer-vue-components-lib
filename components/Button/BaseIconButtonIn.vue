<template>
    <md-button
            class="md-icon-button"
            @click="$emit('click')"
            v-tooltip="{content: toolTip,
            placement:'bottom',
             autoHide:false,
            }"

    >
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
                        || data === "bottom"
                        || data === "";
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

<style >
    
</style>