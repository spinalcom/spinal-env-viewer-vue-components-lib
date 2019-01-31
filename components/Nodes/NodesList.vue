<template>
    <div class="nodes-list">
        <node-item class="nodes-list-context"
                   v-for="(id) in contextsId"
                   :key="id"

                   :active-nodes-id="activeNodesId"
                   :context-id="id"
                   :nodes="nodes"
                   :node-info="nodes[id]"

                   :show-hide-bim-object="showHideBimObject"
                   :has-child-in-context="hasChildInContext"


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

      activeNodesId: {
        type: Array,
        required: true,
        default: function () {
          return [];
        }
      },

      nodes: {
        type: Object,
        default: function (  ) {
          return {};
        }
      },

      hasChildInContext: {
        type: Function,
        required: true
      }

    }
  }
</script>

<style scoped>

</style>