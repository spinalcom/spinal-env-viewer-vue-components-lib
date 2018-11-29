<template>
    <div v-if="isInContext()">
        <node-header class="node-header"
                     v-if="nodes.hasOwnProperty(nodeId)"
                     :style="{'background-color': background()}"
                     :has-child="hasChildren()"
                     :name="name"
                     :color="color"
                     :show-hide-object="showHideObject"
                     :node-id="nodeId"
                     @hide-bim-object="$emit('hide-bim-object',$event)"
                     @active-node="onActiveNode($event)"
                     @node-selected="onNodeSelected($event)"
                     @toggle-display-child="displayChildren()"
        />
        <node-item class="node-item"
                   v-if="opened"
                   v-for="(child, index) in childrenIds"
                   :key="index"
                   :nodes="nodes"
                   :node-id="child"
                   :ids="ids"
                   :context-id="contextId"
                   :active-node="activeNode"
                   @active-node="onActiveNode($event)"
                   @node-selected="onNodeSelected($event)"
                   @pull-children="pullChildren($event)"
                   :show-hide-object="showHideObject"
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
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            ids: {
                type: Array,
                default: function () {
                    return []
                }
            },
            activeNode: {
                type: Object,
                required: true
            },
            contextId: {
                type: String,
                required: true
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
            },



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

            hasChildren: function () {
                return this.childrenIds.length > 0;
            },

            isInContext: function () {
                if (typeof this.nodes === "undefined" || !this.nodes.hasOwnProperty(this.nodeId))
                    return false;

                const node = this.nodes[this.nodeId];
                if (this.nodeId === this.contextId)
                    return true;
                if (node.hasOwnProperty("contextIds")) {
                    const contextIds = node.contextIds;
                    return contextIds.has(this.contextId)
                }

                return false
            },

            onActiveNode: function (event) {
                if (!event.hasOwnProperty('contextId'))
                    event['contextId'] = this.contextId;

                this.$emit('active-node', event)
            },
            background: function () {
                if (this.activeNode.nodeId === this.nodeId && this.activeNode.contextId === this.contextId)
                    return "#2D3D93";
                else {
                    this.activeNode['loris'] = {nodeId: this.nodeId, context: this.contextId}
                    console.log(this.name, this.activeNode)
                }

                return this.backgroundColor
            }
        },

        watch: {
            ids: {
                handler: function () {
                    if (typeof this.nodes[this.nodeId] !== "undefined") {
                        const tmp = this.nodes[this.nodeId].getChildrenIds();

                        if (tmp.length !== this.childrenIds.length)
                            this.$forceUpdate();

                        for (let i = 0; i < tmp.length; i++) {
                            if (!this.childrenIds.includes(tmp[i]))
                                this.childrenIds.push(tmp[i])
                        }

                    }
                },
                immediate: true
            }
        },
        beforeDestroy: function () {

            if (typeof this.node !== "undefined" && typeof this.node.unbind === "function") {
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