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
    <div v-if="isInContext" v-tooltip="name" >
        <node-header
                :class="{active: isActive, context: isContext}"
                :color="color"
                :has-child="hasChildInContext(nodeInfo.id, contextId)"
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
                v-for="(child) in childrenIds.filter(onlyUnique)"
                :key="child"


                :active-nodes-id="activeNodesId"
                :context-id="contextId"
                :nodes="nodes"
                :node-info="genNodeRef(nodes[child])"

                :has-child-in-context="hasChildInContext"
                :show-hide-object="showHideBimObject"

                @click="$emit('click', $event)"
                @hide-bim-object="$emit('hide-bim-object', $event)"
                @right-click="$emit('click-right', $event)"

        />

    </div>

</template>

<script>
  import NodeHeader from "./NodeHeader.vue";
  import genNodeRef from "./genNodeRef.js";

  export default {
    name: "NodeItem",

    components: { NodeHeader },

    data: function () {
      return {
        opened: false
      }
    },

    props: {
      activeNodesId: {
        type: Array,
        default: function () {
          return []
        }
      },
      contextId: {
        type: String,
        required: true
      },
      nodes: {
        type: Object,
        default: function () {
          return {}
        }
      },
      nodeInfo: {
        type: Object,
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
      }
    },

    computed: {

      isActive: function () {
        return this.activeNodesId.includes( this.nodeInfo.id )
      },
      isContext: function () {
        return this.nodeInfo.id === this.contextId;
      },
      name: function () {
        if (this.nodeInfo.hasOwnProperty( 'name' ) &&
          typeof this.nodeInfo.name !== "undefined")
          return this.nodeInfo.name;
        return 'Uknown Name';
      },
      color: function () {

        if (
          (typeof this.nodeInfo !== "undefined")
          && (this.nodeInfo.hasOwnProperty( 'color' ))
        )
          return this.nodeInfo.color;
      },
      isInContext: function () {
        if (
          (typeof this.nodeInfo !== "undefined")
          && (this.nodeInfo.hasOwnProperty( 'contextIds' ))
        ) {
          return this.nodeInfo.contextIds.hasOwnProperty( this.contextId ) ||
            this.contextId === this.nodeInfo.id;
        }

        return false;
      },
      childrenIds() {
        return this.nodeInfo.childrenIds.filter(this.onlyUnique);
      }
    },

    methods: {
      genNodeRef,
      onlyUnique: function ( value, index, self ) {
        return self.indexOf( value ) === index;
      },
      onHideBimObject: function ( event ) {
        if (this.showHideBimObject) {
          if (typeof event === "undefined")
            event = this.nodeInfo.id;
          this.emit( 'hide-bim-object', event );
        }
      },

      onToggleDisplayChildren: function () {
        // TO DO 
        // - peu etre mettre un state "loading" ici ou dans le NodeHeader
        // - test si on a pas deja pull les children ?
        this.$store
          .dispatch("pullChildren", this.nodeInfo.id)
          .then(() => {
            this.opened = !this.opened;
          })
          .catch(e => console.error(e));
      },

      onHeaderClick: function () {

        const event = {};
        event['contextId'] = this.contextId;
        event['nodeId'] = this.nodeInfo.id;
        this.$emit( 'click', event )

      },

      onHeaderRightClick: function () {

        const event = {};
        event['contextId'] = this.contextId;
        event['nodeId'] = this.nodeInfo.id;
        this.$emit( 'right-click', event )

      }
    },


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
