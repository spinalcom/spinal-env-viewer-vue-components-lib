<template>
    <div class="node-header"
         @click="$emit('node-selected', [nodeId])">
        <drop-up-down-button
                class="node-list-icon"
                :opened="opened"
                @click="$emit('toggle-display-child')"
                :style="{visibility: isVisible}"
        />
        <div class="node-name">
            {{name}}
        </div>
        <i class="material-icons node-hide-bim"
           @click="hideBimObj()"
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
    import BaseIconButton from "../Button/BaseIconButton.vue";
    import ColorMaker from "../ColorMarker/ColorMaker.vue";

    export default {
        name: "NodeHeader",
        components: {ColorMaker, BaseIconButton, DropUpDownButton},
        props: {
            hasChild: {
                type: Boolean,
                required: true
            },

            info: {
                type: Object,
                required: true
            },

            nodeId: {
                type: String,
                required: true
            },

            opened: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            hasChild: {
                handler: function (oldValue, newValue) {
                    if (!newValue) {
                        this.isVisible = "";
                    }
                    else {
                        this.isVisible = "";
                    }
                }
                ,
                immediate: true
            },
            info: {
                handler: function (oldValue, newValue) {
                    if (typeof newValue !== "undefined") {
                        if (newValue.hasOwnProperty("name"))
                            this.name = newValue.name.get();
                        if (newValue.hasOwnProperty("color"))
                            this.color = newValue.color.get();
                    }

                    else if (typeof oldValue !== "undefined") {
                        if (oldValue.hasOwnProperty("name"))
                            this.name = oldValue.name.get();
                        if (oldValue.hasOwnProperty("color"))
                            this.color = oldValue.color.get();
                    }
                    else {
                        this.name = "";
                        this.color = "";
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
        padding: 9px 6px 6px 13px;
    }

    .node-list-icon {
        position: absolute;
        left: 0;
        width: 21px;
    }

    .node-name {
        position: absolute;
        left: 21px;
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