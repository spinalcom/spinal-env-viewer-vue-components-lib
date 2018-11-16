<template>
    <div class="nodes-list">
        <node-item
                   v-for="(id, index) in contextIds"
                   :key="index"
                   :nodes="nodes"
                   :node-id="id"
                   @node-selected="$emit('node-selected', $event)"
                   @hide-bim-object="$emit('hide-bim-object', $event)"
                   @pull-node="$emit('pull-node',$event)"
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
    .nodes-list{
        width: 100%;
    }
</style>