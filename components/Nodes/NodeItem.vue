<template>
    <div>
        <node-header class="node-header"
                     v-if="nodes.hasOwnProperty(nodeId)"
                     :style="{'background-color': backgroundColor}"
                     :has-child="childrenIds.length > 0"
                     :name="name"
                     :color="color"
                     :show-hide-object="showHideObject"
                     :node-id="nodeId"
                     @hide-bim-object="$emit('hide-bim-object',$event)"
                     @node-selected="$emit('node-selected', $event)"
                     @toggle-display-child="displayChildren()"
        />
        <node-item class="node-item"
                   v-if="opened"
                   v-for="(child, index) in childrenIds"
                   :key="index"
                   :nodes="nodes"
                   :node-id="child"
                   :ids="ids"
                   @node-selected="onNodeSelected($event)"
                   @pull-children="pullChildren($event)"
        />

    </div>

</template>

<script>
    import NodeHeader from "./NodeHeader.vue";
    export default {
        name: "NodeItem",

        components: {NodeHeader},
        data: function () {
            return {
                opened: false,
                node: {},
                binder: {},
                childrenIds: []
            }
        },

        props: {
            nodes: {
                type: Object,
                required: true,
            },
            nodeId: {
                type: String,
                required: true
            },
            backgroundColor: {
                type: String,
                default: function () {
                    return ""
                }
            },
            showHideObject: {
                type:Boolean,
                default: function () {
                    return false;
                }
            },
            ids: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },

        computed: {
            color: function () {
                if (this.nodes.hasOwnProperty(this.nodeId) && this.nodes[this.nodeId].info.hasOwnProperty("color"))
                    return this.nodes[this.nodeId].info.color.get();
                else
                    return "";
            },
            name: function () {
                return this.nodes[this.nodeId].info.name.get();
            }
        },

        methods: {
            displayChildren: function () {
                this.opened = !this.opened;
            },

            pullChildren: function (event) {
                if (typeof event === "undefined")
                    this.$emit('pull-children', this.nodeId);
                else
                    this.$emit('pull-children', event);
            },

            onNodeSelected: function (event) {
                if (typeof event === "undefined")
                    this.$emit('node-selected', [this.nodeId]);
                else {
                    event.push(this.nodeId);
                    this.$emit('node-selected', event);
                }
            },

        },

        watch: {
            ids: {
                handler: function () {
                    if (typeof this.nodes[this.nodeId] !== "undefined" && typeof this.nodes[this.nodeId].info !== "undefined")
                    {
                        this.childrenIds = this.nodes[this.nodeId].getChildrenIds();
                    }

                },
                immediate: true
            }
        },
        beforeDestroy: function () {

            if (typeof this.node !== "undefined" && typeof this.node.unbind === "function" ){
                this.node.unbind(this.binder);
                this.binder = "undefined";
            }
        }
    }
</script>

<style scoped>
    .node-item {
        width: 100%;
        padding-inline-start: 18px;
    }

</style>