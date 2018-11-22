<template>
    <div class="nodes-list">
        <node-item class="nodes-list-context"
                   v-for="(id, index) in contextIds"
                   :key="index"
                   :nodes="nodes"
                   :node-id="id"
                   @node-selected="$emit('node-selected', $event)"
                   @hide-bim-object="$emit('hide-bim-object', $event)"
                   @pull-children="$emit('pull-children',$event)"
                   background-color="rgba(46, 46, 46, 0.5)"
        />
    </div>

</template>

<script>
    import NodeItem from "./NodeItem.vue";

    export default {
        name: "NodesList",
        components: {NodeItem},
        props: {
            nodes: {
                type: Object,
                default: function () {
                    return []
                }
            },

            contextIds: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .nodes-list {
        width: 100%;
    }

    .nodes-list-context {

    }
</style>