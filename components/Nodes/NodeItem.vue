<template>
    <ul class="node-item">
        <node-header
                v-if="nodes.hasOwnProperty(nodeId)"
                :has-child="childrenIds.length > 0"
                :info="nodes[nodeId].info"
                :opened="opened"
                :node-id="nodeId"
                @hide-bim-object="$emit('hide-bim-object',$event)"
                @node-selected="$emit('node-selected', $event)"
                @toggle-display-child="displayChildren()"
        />

        <li
                v-for="(child, index) in childrenIds"
                v-if="opened"
                :key="index"
        >
            <node-item
                    :nodes="nodes"
                    :node-id="child"
                    @node-selected="onNodeSelected($event)"
                    @pull-node="pullNode($event)"
            />
        </li>
    </ul>

</template>

<script>
    import DropUpDownButton from "../Button/DropUpDownButton.vue";
    import BaseIconButton from "../Button/BaseIconButton.vue";
    import ColorMaker from "../ColorMarker/ColorMaker.vue";
    import NodeHeader from "./NodeHeader.vue";

    export default {
        name: "NodeItem",

        components: {NodeHeader, ColorMaker, BaseIconButton, DropUpDownButton},
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
            }
        },

        methods: {
            displayChildren: function () {
                this.opened = !this.opened;
            },
            pullNode: function (event) {
                if (typeof event === "undefined")
                    this.$emit('pull-node', this.nodeId);
                else
                    this.$emit('pull-node', event);
            },
            onNodeSelected: function (event) {
                if (typeof event === "undefined")
                    this.$emit('node-selected', [this.nodeId]);
                else
                {
                    event.push(this.nodeId);
                    this.$emit('node-selected', event);
                }
            }
        },

        watch: {
            nodes: {
                handler: function (oldValue, newValue) {

                    if ( typeof newValue !== "undefined"
                        && newValue.hasOwnProperty(this.nodeId)
                    ) {
                        this.node = newValue[this.nodeId];
                        this.childrenIds = this.node.getChildrenIds();
                    }
                    else if ( typeof oldValue !== "undefined"
                        && oldValue.hasOwnProperty(this.nodeId)
                    ) {
                        this.node = oldValue[this.nodeId];
                        const childrenIds = this.node.getChildrenIds();

                        for (let i = 0; i < childrenIds.length; i++) {
                            this.childrenIds.push(childrenIds[i]);
                        }
                    }
                    else {
                        this.node = {};
                        this.childrenIds = [];
                    }
                },
                immediate: true
            }
        },
        mounted: function () {
            if (!this.nodes.hasOwnProperty(this.nodeId)){
                this.$emit("pull-node");
            }

        }

    }
</script>

<style scoped>


    .node-item {
        width: 100%;
        list-style-type: none;
        padding-inline-start: 0px;
    }


</style>