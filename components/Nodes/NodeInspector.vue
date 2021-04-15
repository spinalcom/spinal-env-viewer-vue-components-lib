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
  <div class="node-inspector">
    <!-- <div class="node-inspector-name">
      {{ name }}
    </div> -->

    <md-field v-if="relationNames.length > 0">
      <label for="relationNames">Relations</label>
      <md-select id="relationNames"
                 v-model="relationName"
                 name="relationName">
        <md-option v-for="(relName, index) in relationNames"
                   :key="index"
                   :value="relName">
          {{ relName }}
        </md-option>
      </md-select>
    </md-field>
    <div class="node-inspector-children">
      <i v-if="editMode"
         class="material-icons node-inspector-btn-icon"
         @click="sort()">
        sort_by_alpha
      </i>

      <div v-for="(info, index) in lstCompu"
           :key="info._server_id"
           class="node-inspector-child">
        <template v-if="editMode">
          <i class="material-icons node-inspector-btn-icon"
             :class="{'arrow-disable': index === 0}"
             @click="moveUp(info, index)">
            keyboard_arrow_up
          </i>
          <i class="material-icons node-inspector-btn-icon"
             :class="{'arrow-disable': lstCompu.length -1 <= index}"
             @click="moveDown(info, index)">
            keyboard_arrow_down
          </i>
        </template>
        <div v-if="info.hasOwnProperty('name')"
             class="node-inspector-child-name">
          {{ info.name }}
        </div>
        <div v-else
             class="node-inspector-child-name">
          undefined
        </div>

        <div class="node-inspector-child-delete-buttons">
          <md-menu md-direction="bottom-start">
            <i class="material-icons node-inspector-btn-icon"
               md-menu-trigger>
              more_vert
            </i>
            <md-menu-content>
              <!-- <md-menu-item @click="$emit('remove-from-parent', info.id)">
                Remove children
              </md-menu-item> -->
              <md-menu-item @click="$emit('remove-from-graph', info.id)">
                Remove from graph
              </md-menu-item>
            </md-menu-content>
          </md-menu>
          <!--
          <i class="material-icons node-inspector-btn-icon"
             @click="$emit('remove-from-graph', info.id)">
            delete
          </i>
          <i class="material-icons node-inspector-btn-icon"
             @click="$emit('remove-from-parent', info.id)">
            delete
          </i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import deleteForEvener from "./remove-forever.svg";

export default {
  name: "NodeInspector",
  props: {
    childInfo: {
      type: Array,
      default: function () {
        return [];
      }
    },
    defaultRelationName: {
      type: String,
      default: function () {
        return "";
      }
    },
    relationNames: {
      type: Array,
      default: function () {
        return [];
      }
    },
    editMode: {
      type: Boolean,
      default: function () {
        return false;
      }
    }
  },
  data: function () {
    return {
      relationName: this.defaultRelationName,
      lstCompu: []
      // deleteForEvenerIcon: deleteForEvener,
    };
  },
  watch: {
    relationName: {
      handler: function (newValue) {
        if (newValue !== "") this.$emit("get-children", newValue);
      }
    },
    childInfo: {
      handler: function () {
        this.reset();
      }
    }
  },
  methods: {
    moveUp(info, idx) {
      if (idx === 0) return;
      this.lstCompu.splice(idx, 1);
      this.lstCompu.splice(idx - 1, 0, info);
    },
    moveDown(info, idx) {
      if (this.lstCompu.length - 1 <= idx) return;
      this.lstCompu.splice(idx, 1);
      this.lstCompu.splice(idx + 1, 0, info);
    },
    sort() {
      this.lstCompu.sort((a, b) => {
        return a.name ? a.name.localeCompare(b.name) : -1;
      });
    },
    returnSort() {
      return this.lstCompu;
    },
    reset() {
      console.log(this.childInfo);
      this.lstCompu = [];
      this.lstCompu.push(...this.childInfo);
    }
  }
};
</script>

<style scoped>
.arrow-disable {
  color: #7e7e7e;
  background: unset !important;
  cursor: alias !important;
}
.node-inspector-name {
  text-align: center;
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 28px;
}
.node-inspector-children {
  overflow-y: auto;
  max-height: 40vh;
}
.node-inspector-btn-icon {
  cursor: pointer;
  user-select: none;
}
.node-inspector-btn-icon:hover {
  background: #7e7e7e;
  border-radius: 50%;
}
.node-inspector-children::-webkit-scrollbar {
  width: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #121212;
}

.node-inspector-children::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.node-inspector-children::-webkit-scrollbar-thumb {
  outline: 1px solid slategrey;
  background-color: #737374;
}

.node-inspector-child {
  border: 1px solid #979797;
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  padding: 4px;
}

.node-inspector-child-name {
  padding-left: 4%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-inspector-child-delete-buttons {
  position: absolute;
  right: 4%;
  display: flex;
}

.node-inspector {
  max-height: 70vh;
}
</style>
