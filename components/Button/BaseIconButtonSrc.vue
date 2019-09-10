<template>
    <md-button class="md-icon-button"
               @click="$emit('click')"
               v-tooltip="{content: toolTip, container:'body',
            placement:'end', autoHide:false}"    >

        <md-icon :md-src="icon" :style="{width: width, color: fontColor}"/>
    </md-button>
</template>

<script>
    export default {
        name: "BaseIconButtonSrc",
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