<template>
        <md-button
                class="md-icon-button md-raised"
                @click="$emit('click')">
            <md-tooltip :md-delay="toolTipDelay"
                        :md-direction="toolTipDirection"
                        v-if="toolTip.length > 0">
                {{toolTip}}
            </md-tooltip>
            <md-icon>{{icon}}</md-icon>
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
            }
        }
    }
</script>

<style scoped>
    .md-ripple {
        padding-left: 0;
        padding-right: 0;
    }
</style>