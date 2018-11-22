<template>
    <div>
        <node-header class="node-header"
                     v-if="nodes.hasOwnProperty(nodeId)"
                     :style="{'background-color': backgroundColor}"
                     :has-child="childrenIds.length > 0"
                     :name="name"
                     :color="nodes[nodeId].info.name"
                     :node-id="nodeId"
                     @hide-bim-object="$emit('hide-bim-object',$event)"
                     @node-selected="$emit('node-selected', $event)"
                     @toggle-display-child="displayChildren()"
        />
        <node-item class="node-item"
                   v-for="(child, index) in childrenIds"
                   v-if="opened"
                   :key="index"
                   :nodes="nodes"
                   :node-id="child"
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
                childrenIds: [],
                node: {}
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
                return this.nodes[this.nodeId].info.name;
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
            }
        },

        watch: {
            nodes: {
                handler: function (newValue) {
                    if (newValue.hasOwnProperty(this.nodeId)) {
                        this.node = newValue[this.nodeId];

                        const childrenIds = this.node.getChildrenIds();
                        if (typeof childrenIds !== "undefined" && this.childrenIds.length <= 0)
                            this.$emit('pull-children', this.nodeId);

                        for (let i = 0; i < childrenIds.length; i++) {
                            if (!this.childrenIds.includes(childrenIds[i]))
                                this.childrenIds.push(childrenIds[i]);
                        }
                    }
                },
                immediate: true
            },
        }
    }
</script>

<style scoped>
    .node-item {
        width: 100%;
        padding-inline-start: 18px;
    }
    .node-header{
        border: 1px solid rgba(0, 0, 0, 0.50);

    }

</style>