<template>
    <div class="node-header"
         @click="$emit('node-selected', [nodeId])">

        <drop-up-down-button
                class="node-list-icon"
                @click="$emit('toggle-display-child')"
                :style="{visibility: isVisible}"/>

        <div class="node-name">
            {{name}}
        </div>

        <i class="material-icons node-hide-bim"
           @click="hideBimObj()"
           v-if="showHideObject"
        >
            remove_red_eye
        </i>

        <color-maker
                class="node-color"
                :color="color"
        />

    </div>
</template>

<script>
    import DropUpDownButton from "../Button/DropUpDownButton.vue";
    import ColorMaker from "../ColorMarker/ColorMaker.vue";

    export default {
        name: "NodeHeader",
        components: {ColorMaker, DropUpDownButton},
        props: {

            hasChild: {
                type: Boolean,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            nodeId: {
                type: String,
                required: true
            },

            color: {
                type: String,
                default: function() {
                    return ""
                }
            },
            showHideObject: {
                type: Boolean,
                default: function () {
                    return false
                }
            }

        },

        computed: {
            isVisible: function() {
                return this.hasChild ? "" : "hidden";
            }
        },

        watch: {
            hasChild: {
                handler: function (oldValue, newValue) {
                    if (typeof newValue === "undefined") {
                        if (typeof oldValue !== "undefined" && !oldValue)
                            this.isVisible = "hidden"

                    }
                    else if (!newValue) {
                        this.isVisible = "hidden";
                    }
                    else {
                        this.isVisible = "";
                    }
                },
                immediate: true
            }
        },

        methods: {
            hideBimObj: function () {
                this.$emit('hide-bim-object', [this.nodeId]);
            }
        }
    }
</script>

<style scoped>

    .node-header {
        position: relative;
        width: 100%;
        height: 36px;
        padding: 9px 6px 6px 13px;
    }

    .node-header:hover {
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    .node-list-icon {
        position: absolute;
        left: 0;
        top: 7px;
        width: 21px;
    }

    .node-name {
        position: absolute;
        left: 26px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 77px);
    }

    .node-hide-bim {
        position: absolute;
        right: 15px;
        top: 6px;
    }

    .node-color {
        position: absolute;
        right: 0;
    }


</style>