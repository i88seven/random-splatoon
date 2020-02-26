<template>
  <div>
    <div class="condition-container container">
      <el-select v-model="selectedType" clearable multiple placeholder="ブキ系統">
        <el-option
          v-for="weaponType in weaponTypes"
          :key="weaponType.key"
          :label="weaponType.ja_JP"
          :value="weaponType.key"
        />
      </el-select>
      <el-select v-model="selectedSub" clearable multiple placeholder="サブ">
        <el-option
          v-for="weaponSub in weaponSubs"
          :key="weaponSub.key"
          :label="weaponSub.ja_JP"
          :value="weaponSub.key"
        />
      </el-select>
      <el-select v-model="selectedSpecial" clearable multiple placeholder="スペシャル">
        <el-option
          v-for="weaponSpecial in weaponSpecials"
          :key="weaponSpecial.key"
          :label="weaponSpecial.ja_JP"
          :value="weaponSpecial.key"
        />
      </el-select>
    </div>
    <div class="player-count-container container">
      <span>プレイ人数</span>
      <el-slider
        :min="1"
        :max="8"
        v-model="playerCount"
      />
    </div>
    <div class="player-container container">
      <div v-for="i of playerCount" :key="i" class="player-row">
        <el-input
          :value="playerNames[i-1]"
          :placeholder="`プレイヤー${i}`"
          :maxlength="10"
          @input="(name) => $set(playerNames, i-1, name)"
          class="player-name cell"
        />
        <template v-if="randomChoice.length > 0 && conditionWeapons.length > 0">
          <i class="el-icon-right cell" />
          <span class="cell">{{ randomChoice[i-1].name.ja_JP }}</span>
        </template>
      </div>
    </div>
    <el-button
      @click="executeChoice"
      class="container"
      type="primary"
    >
      抽選!!
    </el-button>
    <el-alert
      v-if="conditionWeapons.length === 0"
      class="container"
      title="ブキが見つかりませんでした。条件を見直してください！"
      type="error"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedType: [],
      selectedSub: [],
      selectedSpecial: [],
      playerCount: 8,
      playerNames: [],
      randomChoice: []
    }
  },
  computed: {
    weaponData () {
      return this.$store.getters['weapon_data/all']
    },
    weaponTypes () {
      return this.$store.getters['weapon_data/types']
    },
    weaponSubs () {
      return this.$store.getters['weapon_data/subs']
    },
    weaponSpecials () {
      return this.$store.getters['weapon_data/specials']
    },
    conditionWeapons () {
      return this.$store.getters['weapon_data/conditionWeapons']
    }
  },
  methods: {
    executeChoice () {
      const conditions = {
        type: this.selectedType,
        sub: this.selectedSub,
        special: this.selectedSpecial,
        playerNames: this.playerNames.slice(0, this.playerCount - 1)
      }
      this.$store.dispatch('weapon_data/setCondition', conditions)
      for (let i = 0; i < this.playerCount; i++) {
        const randomWeapon = this.conditionWeapons[Math.floor(Math.random() * this.conditionWeapons.length)]
        this.$set(this.randomChoice, i, randomWeapon)
      }
    }
  }
}
</script>

<style>
.container + .container {
  margin-top: 16px;
}
.player-container {
  display: table;
}
.player-row {
  display: table-row;
}
.cell {
  display: table-cell;
  padding: 8px;
}
.el-slider {
  max-width: 200px;
}
.player-name.cell {
  width: 200px;
  padding-left: 0px;
}
</style>
