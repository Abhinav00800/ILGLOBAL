const mongoose = require("mongoose")

const jobRegisterSchema = new mongoose.Schema({
    exporter_name: {
        type: String,
    },
    invoice_number: {
        type: String,
    },
    date: {
        type: Date,
    },
    shipping_bill_number: {
        type: Number,
    },
    date2: {
        type: Date,
    },
    port_of_destination: {
        type: String,
    },
    fob_value: {
        type: Number,
    },
    container_number: [String],
    size: [String],
    custom_seal: [String],
    hover: [Date],

    scheme: {
        type: Number,
    },
    dbk_depb: {
        type: Number,
    },
    location: {
        type: String,
    },
    current_status: {
        type: String,
    },
    scroll_date: {
        type: String,
    },
    no_of_pakages: {
        type: Number,
    },
    net_weight: {
        type: Number,
    },
    serial_number: {
        type: String,
    },
    gross_weight: {
        type: Number,
    },
    forwarding_date: {
        type: Date,
    },
    rail_out_date: {
        type: Date,
    },
    edi_job: {
        type: Number,
    },
    leo_date: {
        type: Date,
    },
    mundra_arrival_date: {
        type: Date,
    },
    remarks: {
        type: String,
    }

})

module.exports = mongoose.model("JobRegister", jobRegisterSchema)