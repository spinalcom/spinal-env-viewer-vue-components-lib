<!--
Copyright 2024 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <div class="tool-bar">
    <md-progress-bar
      v-if="sideBarButtonLoading"
      md-mode="indeterminate"
    ></md-progress-bar>
    <spinal-badge-icon-button
      v-for="(b, index) in buttons"
      :key="index"
      :background-color="b.button.backgroundColor"
      :font-color="b.button.fontColor"
      :icon="b.button.icon"
      :icon_type="b.button.icon_type"
      :tool-tip="b.button.toolTip"
      :tool-tip-direction="b.button.toolTipDirection"
      :badge_background_color="b.badge_content.backgroundColor"
      :badge_font_color="b.badge_content.fontColor"
      :badge_label="b.badge_content.label"
      @click="b.button.action(option)"
    />
  </div>
</template>

<script>
import SpinalBadgeIconButton from '../Button/SpinalBadgeIconButton.vue';

export default {
  name: 'ToolsBar',
  components: { SpinalBadgeIconButton },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    option: {
      type: Object,
    },
    sideBarButtonLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.tool-bar {
  min-width: 30px;
  min-height: 30px;
}
</style>
