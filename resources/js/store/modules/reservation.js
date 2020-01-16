export default ({
    namespaced: true,
    state: {
        reservations: [],
    },
    getters: {

    },
    mutations: {
        SET_RESERVATION(state, reservation) {
            state.reservation = reservation;
        },
        SET_RESERVATIONS(state, reservations) {
            state.reservations = reservations;
        },
        ADD_RESERVATION(state, reservation) {
            state.reservations.push(reservation);
        },
    },
    actions: {
        addReservation(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/", {
                reservation
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newReservation = response['data']['reservation'];
                    context.commit('ADD_RESERVATION', newReservation);
                    vm.makeToast("Reservation created.", 'success');
                }
            }).catch(function (response) {
                console.log(response);
                vm.makeToast("Error", 'Reservation failed!!!', 'danger');
            });
        },
        deleteReservation(context, reservation) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "delete"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    // console.log('success');
                }
            });
        },
    }
})
