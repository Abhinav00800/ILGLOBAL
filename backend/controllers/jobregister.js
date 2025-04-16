const JobRegister = require("../models/jobregister.js");

const FetchJobRegisterData = async (req, res) => {
    try {
        const jobs = await JobRegister.find();
        res.status(200).json({ 
            message: "Fetched job register data successfully", 
            data: jobs 
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching job register data", details: error.message });
    }
};

const FetchJobByShippingNo = async (req, res) => {
    try {
        const shippingno = req.params.id; 
        const job = await JobRegister.findOne({ shipping_bill_number:shippingno }); 
        
        if (!job) {
            return res.status(404).json({ message: "No job found with this shipping number" });
        }

        res.status(200).json({ 
            message: "Fetched container by shipping number", 
            data: job 
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Error fetching container by shipping number", 
            details: error.message 
        });
    }
};

const fieldMapping = {
    "Exporter name": "exporter_name",
    "Inv. No.": "invoice_number",
    "Date": "date",
    "S.Bill no.": "shipping_bill_number",
    "PORT OF Dest.": "port_of_destination",
    "FOB Value": "fob_value",
    "Cont no.": "container_number",
    "Size": "size",
    "custom seal": "custom_seal",
    "H/OVER": "h_over",
    "Scheme": "scheme",
    "DBK&DEPB AMOUNT": "dbk_depb",
    "LOCATION": "location",
    "Current ↵Status": "current_status",
    "Scroll ↵no. & date": "scroll_date",
    "No of Pkgs": "no_of_pakages",
    "NET WT.": "net_weight",
    "Gross weight.": "gross_weight",
    "Forwarding date": "forwarding_date",
    "rail out date": "rail_out_date",
    "EDI Job": "edi_job",
    "LEO date": "leo_date",
    "Port arrival date ": "mundra_arrival_date",
    "Remarks": "remarks",
    // second "Date" column in frontend
    "Date2": "date2"
};

const dateFields = [
    "date", "date2", "h_over", "forwarding_date", "rail_out_date", "leo_date", "mundra_arrival_date"
];

const numberFields = [
    "fob_value", "size", "scheme", "dbk_depb", "no_of_pakages",
    "net_weight", "gross_weight", "edi_job", "shipping_bill_number"
];

const sanitizeDate = (val) => {
    if (!val) return null;

    // Convert to string in case it's a number
    const strVal = String(val).trim();

    // Match DD.MM.YYYY
    const dateParts = strVal.split(".");
    if (dateParts.length !== 3) return null;

    const [day, month, year] = dateParts.map(part => parseInt(part, 10));
    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        year < 1000 || year > 9999
    ) {
        return null;
    }

    // JS months are 0-indexed
    return new Date(year, month - 1, day);
};


const sanitizeNumber = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
};

const UploadJobRegisterData = async (req, res) => {
    try {
        let jobArray = req.body;

        if (!Array.isArray(jobArray)) {
            jobArray = [jobArray];
        }

        const results = [];

        for (const jobItem of jobArray) {
            const mappedJob = {};

            for (const [key, value] of Object.entries(jobItem)) {
                if (!fieldMapping[key]) continue;

                const fieldName = fieldMapping[key];

                if (dateFields.includes(fieldName)) {
                    mappedJob[fieldName] = sanitizeDate(value);
                } else if (numberFields.includes(fieldName)) {
                    mappedJob[fieldName] = sanitizeNumber(value);
                } else {
                    mappedJob[fieldName] = value;
                }
            }

            const shipping_bill_number = mappedJob["shipping_bill_number"];

            if (!shipping_bill_number) {
                results.push({
                    status: "error",
                    message: "Missing shipping_bill_number",
                    job: jobItem,
                });
                continue;
            }

            let job = await JobRegister.findOne({ shipping_bill_number });

            if (job) {
                job = await JobRegister.findOneAndUpdate(
                    { shipping_bill_number },
                    { $set: mappedJob },
                    { new: true, upsert: true }
                );
                results.push({ status: "updated", job });
            } else {
                const newJob = new JobRegister(mappedJob);
                const savedJob = await newJob.save();
                results.push({ status: "created", job: savedJob });
            }
        }

        return res.status(200).json({
            message: "Job entries processed successfully",
            results,
        });
    } catch (error) {
        console.error("UploadJobRegisterData Error:", error);
        return res.status(500).json({
            error: "Error processing job register data",
            details: error.message,
        });
    }
};


module.exports = { FetchJobRegisterData, UploadJobRegisterData,FetchJobByShippingNo };
