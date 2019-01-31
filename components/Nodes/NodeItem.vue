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
    <div v-if="isInContext">

        <node-header
                :class="{active: isActive, context: isContext}"
                :color="color"
                :has-child="hasChildInContext(nodeId, contextId)"
                :name="name"
                :show-hide-bim-object="showHideBimObject"
                :opened="opened"
                @click="onHeaderClick"
                @hide-bim-object="onHideBimObject"
                @right-click="onHeaderRightClick"
                @toggle-display-child="onToggleDisplayChildren"
        />

        <node-item
                class="node-item"
                v-if="opened"
                v-for="(child, index) in childrenIds"


                :active-nodes-id="activeNodesId"
                :context-id="contextId"
                :has-child-in-context="hasChildInContext"
                :get-node="getNode"
                :key="index"
                :node-id="child"
                :show-hide-object="showHideBimObject"
                :pull-children="pullChildren"


                @click="$emit('click', $event)"
                @hide-bim-object="$emit('hide-bim-object', $event)"
                @right-click="$emit('click-right', $event)"

        />

    </div>

</template>

<script>
  import NodeHeader from "./NodeHeader.vue";

  export default {
    name: "NodeItem",

    components: { NodeHeader },

    data: function () {
      return {
        opened: false,
      }
    },

    props: {

      activeNodesId: {
        type: Array,
        default: function () {
          return []
        }
      },
      nodeId: {
        type: String,
        required: true
      },
      contextId: {
        type: String,
        required: true
      },
      getNode: {
        type: Function,
        default: function () {
          return function () {
            return {};
          }
        }
      },

      showHideBimObject: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      hasChildInContext: {
        type: Function,

        required: true
      },
      pullChildren: {
        type: Function
      }
    },

    computed: {
      nodeInfo: function(){
        return this.getNode(this.nodeId)
      },
      isActive: function () {
        return this.activeNodesId.includes( this.nodeId )
      },
      isContext: function () {
        return this.nodeId === this.contextId;
      },
      name: function () {

        if (this.nodeInfo.hasOwnProperty( 'name' ))
          return this.nodeInfo.name.get();
        return '';
      },
      color: function () {
        const node = this.getNode( this.nodeId );
        if (typeof node !== "undefined" && node.hasOwnProperty( 'color' ))
          return node.color.get();
      },
      isInContext: function () {

        if (
          (typeof this.nodeInfo !== "undefined")
          && (this.nodeInfo.hasOwnProperty( 'contextIds' ))
        ) {
          return this.nodeInfo.contextIds.has( this.contextId ) ||
            this.contextId === this.nodeId;
        }

        return false;
      },

      childrenIds: function () {
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        return this.nodeInfo.childrenIds.filter(onlyUnique);
      }
    },

    methods: {
      onHideBimObject: function ( event ) {
        if (this.showHideBimObject) {
          if (typeof event === "undefined")
            event = this.nodeId;
          this.emit( 'hide-bim-object', event );
        }
      },

      onToggleDisplayChildren: function () {
        this.opened = !this.opened;
      },

      onHeaderClick: function () {

        const event = {};
        event['contextId'] = this.contextId;
        event['nodeId'] = this.nodeId;
        this.$emit( 'click', event )

      },

      onHeaderRightClick: function () {

        const event = {};
        event['contextId'] = this.contextId;
        event['nodeId'] = this.nodeId;
        this.$emit( 'right-click', event )

      }
    },

    mounted() {
      if (typeof this.pullChildren === "function") {
        this.pullChildren( this.nodeId );
      }

    }

  }
</script>

<style scoped>

    .node-item {
        width: 100%;
        padding-left: 18px;
    }

    .active {
        background-color: #365bab !important;
    }

    .context {
        background-color: rgba(46, 46, 46, 0.5);
    }


</style>