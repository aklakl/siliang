const app = {
  state: {
    requireFullScreen: Object,
  },

  mutations: {
    REQUIRE_FULLSCREEN: (state, res) => {
      console.log("REQUIRE_FULLSCREEN");
      state.requireFullScreen = res
    },
  }
}

export default app

