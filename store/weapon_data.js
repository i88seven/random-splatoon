import weaponData from '~/assets/json/weapon_data.json'

export const state = () => ({
  data: weaponData,
  conditions: {}
})

export const mutations = {
  setCondition (state, conditions) {
    state.conditions = { ...conditions }
  }
}

export const actions = {
  setCondition (store, conditions) {
    store.commit('weapon_data/setCondition', conditions, { root: true })
  }
}

export const getters = {
  all (state) {
    return state.data
  },
  types (state) {
    const existType = []
    return state.data.map((weapon) => {
      return {
        key: weapon.type.key,
        en_US: weapon.type.name.en_US,
        ja_JP: weapon.type.name.ja_JP
      }
    }).filter((type) => {
      if (existType.includes(type.key)) {
        return false
      }
      existType.push(type.key)
      return true
    })
  },
  subs (state) {
    const existSub = []
    return state.data.map((weapon) => {
      return {
        key: weapon.sub.key,
        en_US: weapon.sub.name.en_US,
        ja_JP: weapon.sub.name.ja_JP
      }
    }).filter((sub) => {
      if (existSub.includes(sub.key)) {
        return false
      }
      existSub.push(sub.key)
      return true
    })
  },
  specials (state) {
    const existSpecial = []
    return state.data.map((weapon) => {
      return {
        key: weapon.special.key,
        en_US: weapon.special.name.en_US,
        ja_JP: weapon.special.name.ja_JP
      }
    }).filter((special) => {
      if (existSpecial.includes(special.key)) {
        return false
      }
      existSpecial.push(special.key)
      return true
    })
  },
  conditionWeapons (state) {
    let conditionWeapons = [ ...state.data ]
    if (state.conditions.type) {
      conditionWeapons = conditionWeapons.filter((weapon) => {
        return weapon.type.key === state.conditions.type
      })
    }
    if (state.conditions.sub) {
      conditionWeapons = conditionWeapons.filter((weapon) => {
        return weapon.sub.key === state.conditions.sub
      })
    }
    if (state.conditions.special) {
      conditionWeapons = conditionWeapons.filter((weapon) => {
        return weapon.special.key === state.conditions.special
      })
    }
    return conditionWeapons
  }
}
