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
    rx_sec: 0,
    tx_sec: 0,
    speed: 0,
    rx_bytes: 0,
    tx_bytes: 0,
    iface: "",
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
      state.perCpuTemp = payload.perCpuTemp;
      state.iface = payload.iface;
      state.speed = payload.speed;
      state.rx_sec = payload.rx_sec;
      state.tx_sec = payload.tx_sec;
      state.rx_bytes = payload.rx_bytes;
      state.tx_bytes = payload.tx_bytes;
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
