<template>
    <div v-if="isInContext()">
        <node-header class="node-header"
                     :style="{'background-color': background()}"
                     :has-child="hasChildren()"
                     :name="name"
                     :color="color"
                     :show-hide-object="showHideObject"
                     :node-id="nodeId"
                     @hide-bim-object="$emit('hide-bim-object',$event)"
                     @active-node="onActiveNode($event)"
                     @node-selected="onNodeSelected($event)"
                     @toggle-display-child="displayChildren()"
        />
        <node-item class="node-item"
                   v-if="opened"
                   v-for="(child, index) in childrenIds"
                   :key="index"
                   :nodes="nodes"
                   :node-id="child"
                   :ids="ids"
                   :context-id="contextId"
                   :active-node="activeNode"
                   :show-hide-object="showHideObject"
                   @active-node="onActiveNode($event)"
                   @node-selected="onNodeSelected($event)"
                   @pull-children="pullChildren($event)"

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
        node: {},
        binder: {},
        childrenIds: []
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
      },
      showHideObject: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      ids: {
        type: Array,
        default: function () {
          return []
        }
      },
      activeNode: {
        type: Object,
        required: true
      },
      contextId: {
        type: String,
        required: true
      }
    },

    computed: {
      color: function () {
        if (this.nodes.hasOwnProperty( this.nodeId ) && this.nodes[this.nodeId].hasOwnProperty( "color" ))
          return this.nodes[this.nodeId].color.get();
        else
          return "";
      },
      name: function () {
        if (this.nodes.hasOwnProperty( this.nodeId ) && this.nodes[this.nodeId].hasOwnProperty( 'name' ))
          return this.nodes[this.nodeId].name.get();
        return ""
      },
    },

    methods: {
      displayChildren: function () {
        this.opened = !this.opened;
      },

      pullChildren: function ( event ) {
        if (typeof event === "undefined")
          this.$emit( 'pull-children', this.nodeId );
        else
          this.$emit( 'pull-children', event );
      },

      onNodeSelected: function ( event ) {
        if (typeof event === "undefined")
          this.$emit( 'node-selected', [this.nodeId] );
        else {
          event.push( this.nodeId );
          this.$emit( 'node-selected', event );
        }

      },

      hasChildren: function () {
        return this.childrenIds.length > 0;
      },

      isInContext: function () {
        if (typeof this.nodes === "undefined" || !this.nodes.hasOwnProperty( this.nodeId ))
          return false;

        const node = this.nodes[this.nodeId];
        if (this.nodeId === this.contextId)
          return true;
        if (node.hasOwnProperty( "contextIds" )) {
          const contextIds = node.contextIds;
          return contextIds.has( this.contextId )
        }

        return false
      },

      onActiveNode: function ( event ) {
        if (!event.hasOwnProperty( 'contextId' ))
          event['contextId'] = this.contextId;

        this.$emit( 'active-node', event )
      },

      background: function () {
        if (this.activeNode.nodeId === this.nodeId && this.activeNode.contextId === this.contextId)
          return "#2D3D93";

        return this.backgroundColor
      },

      getChildrenId() {
        return this.nodes[this.nodeId].childrenIds
      }
    },

    watch: {
      ids: {
        handler: function () {
          if (typeof this.nodes[this.nodeId] !== "undefined") {
            const tmp = this.nodes[this.nodeId].childrenIds;
            if (typeof tmp !== "undefined")
              for (let i = 0; i < tmp.length; i++) {
                if (!this.childrenIds.includes( tmp[i] ))
                  this.childrenIds.push( tmp[i] )
              }

          }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>
    .node-item {
        width: 100%;
        padding-inline-start: 18px;
    }

</style>