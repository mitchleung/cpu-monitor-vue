import { createStore } from "vuex";

const defaultConfig = {
  apiProtocol: "http",
  apiHostname: window.location.hostname,
  apiPath: "/api/all",
  apiPort: "3000",
  refreshRate: 1000,
};
export default createStore({
  state: {
    cpu: null,
    mem: null,
    cpuTemp: null,
    perCpuTemp: null,
    config: JSON.parse(localStorage.getItem("config")) || defaultConfig,
    defaultConfig,
  },
  getters: {
    config(state) {
      return state.config;
    },
  },
  mutations: {
    setData(state, payload) {
      state.cpu = payload.cpu;
      state.cpuTemp = payload.cpuTemp;
      state.mem = payload.mem;
      state.perCpuTemp = payload.perCpuTemp;
    },
    setConfig(state, payload) {
      state.config.apiProtocol =
        payload.apiProtocol || state.config.apiProtocol;
      state.config.apiHostname =
        payload.apiHostname || state.config.apiHostname;
      state.config.apiPath = payload.apiPath;
      state.config.apiPort = payload.apiPort;
      state.config.refreshRate = payload.refreshRate;
      localStorage.setItem("config", JSON.stringify(state.config));

      console.log("set config completed", state.config);
    },
  },
  modules: {},
});
