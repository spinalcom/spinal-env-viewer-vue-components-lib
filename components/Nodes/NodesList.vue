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
                   @active-node="$emit('active-node', $event)"
                   :context-id="id"
                   background-color="rgba(46, 46, 46, 0.5)"
                   :ids="childrenIds"
                   :show-hide-object="true"
                   :active-node="activeNode"
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
                  return {}
                }
            },

            contextIds: {
                type: Array,
                default: function () {
                    return []
                }
            },

            childrenIds: {
                type: Array,
                default: function () {
                    return {}
                }
            },
            activeNode: {
                type: Object,
                required: true
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