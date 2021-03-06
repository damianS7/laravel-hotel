
export default ({
    namespaced: true,
    state: {
        settings: {},
    },
    getters: {
        getSetting: (state) => (settingId) => {
            return state.settings[settingId];
        },
        getSettingValue: (state, getters) => (name) => {
            let setting = getters.getSettings.find(
                setting => setting.name === name
            );

            if (typeof setting === "undefined") {
                return "";
            }

            return setting.value;
        },
        getSettings: (state) => {
            const settingsArray = Object.keys(state.settings).map(
                id => state.settings[id]
            );
            return settingsArray;
        },
    },
    mutations: {
        SET_SETTINGS(state, settings) {
            state.settings = settings;
        },
        UPDATE_SETTING(state, setting) {
            //state.settings[setting.id] = setting;
            Vue.set(state.settings, setting.id, setting);
        },
    },
    actions: {
        updateSetting(context, { vm, setting }) {
            axios.post("/settings/" + setting.id, {
                setting,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response["data"].length == 0) {
                        return;
                    }

                    let newSetting = response.data.setting;
                    context.commit("UPDATE_SETTING", newSetting);
                    vm.makeToast("Setting updated", "The setting " + setting.name
                        + " has been updated.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Settings", "Something went wrong.", "danger");
            });
        },
    }
})
