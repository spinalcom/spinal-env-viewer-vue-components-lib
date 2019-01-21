<template>
    <div class="nodes-list">
        <node-item class="nodes-list-context"
                   v-for="(id, index) in contextsId"
                   :key="index"

                   :refresh="refresh"
                   :active-nodes-id="activeNodesId"
                   :node-id="id"
                   :context-id="id"
                   :get-node="getNode"
                   :node-info="nodes.get(id)"
                   :show-hide-bim-object="showHideBimObject"
                   :pull-children="pullChildren"
                   @click="$emit('click', $event)"
                   @hide-bim-object="$emit('hide-bim-object', $event)"
                   @right-click="$emit('right-click', $event)"
        />
    </div>

</template>

<script>
  import NodeItem from "./NodeItem.vue";

  export default {
    name: "NodesList",
    components: { NodeItem },
    props: {
      refresh : {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      showHideBimObject: {
        type: Boolean,
        default: function () {
          return false;
        }
      },

      contextsId: {
        type: Array,
        default: function () {
          return [];
        }
      },

      getNode: {
        type: Function,
        default: function () {
          return function () {
            return {};
          }
        }
      },

      activeNodesId: {
        type: Array,
        required: true,
        default: function () {
          return [];
        }
      },
      nodes: {

        default: function (  ) {
          return new Map();
        }
      },
      pullChildren: {
        type: Function
      },

    }
  }
</script>

<style scoped>

</style>