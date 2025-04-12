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


const UploadJobRegisterData = async (req, res) => {
    try {
        let jobArray = req.body;

        // Normalize to array if it's a single object
        if (!Array.isArray(jobArray)) {
            jobArray = [jobArray];
        }

        const results = [];

        for (const jobItem of jobArray) {
            const { shipping_bill_number, ...jobData } = jobItem;

            if (!shipping_bill_number) {
                results.push({
                    status: "error",
                    message: "Missing shipping_bill_number",
                    job: jobItem
                });
                continue;
            }

            let job = await JobRegister.findOne({ shipping_bill_number });

            if (job) {
                // Update existing job
                job = await JobRegister.findOneAndUpdate(
                    { shipping_bill_number },
                    { $set: jobData },
                    { new: true, upsert: true }
                );
                results.push({ status: "updated", job });
            } else {
                // Create new job
                const newJob = new JobRegister({ shipping_bill_number, ...jobData });
                const savedJob = await newJob.save();
                results.push({ status: "created", job: savedJob });
            }
        }

        return res.status(200).json({
            message: "Job entries processed successfully",
            results,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error processing job register data",
            details: error.message,
        });
    }
};


module.exports = { FetchJobRegisterData, UploadJobRegisterData,FetchJobByShippingNo };
