<!--
  - Copyright 2019 SpinalCom - www.spinalcom.com
  -
  -  This file is part of SpinalCore.
  -
  -  Please read all of the following terms and conditions
  -  of the Free Software license Agreement ("Agreement")
  -  carefully.
  -
  -  This Agreement is a legally binding contract between
  -  the Licensee (as defined below) and SpinalCom that
  -  sets forth the terms and conditions that govern your
  -  use of the Program. By installing and/or using the
  -  Program, you agree to abide by all the terms and
  -  conditions stated or referenced herein.
  -
  -  If you do not agree to abide by these terms and
  -  conditions, do not demonstrate your acceptance and do
  -  not install or use the Program.
  -  You should have received a copy of the license along
  -  with this file. If not, see
  -  <http://resources.spinalcom.com/licenses.pdf>.
  -->

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