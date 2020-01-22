export default ({
    namespaced: true,
    state: {
        invoices: [],
    },
    getters: {
        getInvoiceById: (state, getters) => (invoiceId) => {
            return state.invoices.find(invoice => invoice.id === invoiceId);
        },
    },
    mutations: {
        SET_INVOICES(state, invoices) {
            state.invoices = invoices;
        },
        ADD_INVOICE(state, invoice) {

        },
        SET_INVOICE(state, invoice) {

        }
    },
    actions: {
        editInvoice(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
        deleteBilledService(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
        regenerate(context, { vm, invoice }) {
            axios.post("http://127.0.0.1:8000/invoice/" + invoice.id, {
                invoice,
                _method: "put"
            }).then(function (response) {
                vm.makeToast("Invoice ", invoice.id + ' regenerated.', 'success');
                invoice = response['data']['invoice'];
            }).catch(function (response) {
                vm.makeToast("Invoice ", invoice.id + ' not regenerated.', 'danger');
            });
        },
        generateInvoice(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
        // Marca una factura como pagada. (Status/Payment Method)
        setAsPaid(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
    }
})
