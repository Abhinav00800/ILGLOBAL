// const JobRegister = require("../models/jobregister.js");

// const FetchJobRegisterData = async (req, res) => {
//     try {
//         const jobs = await JobRegister.find();
//         res.status(200).json({ 
//             message: "Fetched job register data successfully", 
//             data: jobs 
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching job register data", details: error.message });
//     }
// };

// const FetchJobByShippingNo = async (req, res) => {
//     try {
//         const shippingno = req.params.id; 
//         const job = await JobRegister.findOne({ shipping_bill_number:shippingno }); 
        
//         if (!job) {
//             return res.status(404).json({ message: "No job found with this shipping number" });
//         }

//         res.status(200).json({ 
//             message: "Fetched container by shipping number", 
//             data: job 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             error: "Error fetching container by shipping number", 
//             details: error.message 
//         });
//     }
// };

// const fieldMapping = {
//   cha: "cha",
//   contno: "container_number",
//   currentstatus: "current_status",
//   customseal: "custom_seal",
//   date: "date",
//   date1: "date_1",
//   dbkdepbamount: "dbk_depb",
//   edijob: "edi_job",
//   exportername: "exporter_name",
//   fobvalue: "fob_value",
//   grossweight: "gross_weight",
//   invno: "invoice_number",
//   leodate: "leo_date",
//   location: "location",
//   netwt: "net_weight",
//   noofpkgs: "no_of_packages",
//   portofdest: "port_of_destination",
//   railoutdate: "rail_out_date",
//   remarks: "remarks",
//   sbillno: "shipping_bill_number",
//   scheme: "scheme",
//   scrollnodate: "scroll_date",
//   size: "size",
//   sno: "serial_number",
//   hover: "hover"
// };


// const dateFields = [
//     "date", "date2", "hover", "forwarding_date", "rail_out_date", "leo_date", "mundra_arrival_date"
// ];

// const numberFields = [
//     "fob_value", "size", "scheme", "dbk_depb", "no_of_pakages",
//     "net_weight", "gross_weight", "edi_job", "shipping_bill_number"
// ];

// const sanitizeDate = (val) => {
//     if (!val) return null;

//     // Convert to string in case it's a number
//     const strVal = String(val).trim();

//     // Match DD.MM.YYYY
//     const dateParts = strVal.split(".");
//     if (dateParts.length !== 3) return null;

//     const [day, month, year] = dateParts.map(part => parseInt(part, 10));
//     if (
//         isNaN(day) || isNaN(month) || isNaN(year) ||
//         day < 1 || day > 31 ||
//         month < 1 || month > 12 ||
//         year < 1000 || year > 9999
//     ) {
//         return null;
//     }

//     // JS months are 0-indexed
//     return new Date(year, month - 1, day);
// };


// const sanitizeNumber = (val) => {
//     const num = parseFloat(val);
//     return isNaN(num) ? null : num;
// };

// const BATCH_SIZE = 200;

// const splitIntoChunks = (array, size) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += size) {
//         result.push(array.slice(i, i + size));
//     }
//     return result;
// };

// const mapJobItem = (jobItem) => {
//     const mappedJob = {};

//     for (const [key, value] of Object.entries(jobItem)) {
//         if (!fieldMapping[key]) continue;

//         const fieldName = fieldMapping[key];

//         if (dateFields.includes(fieldName)) {
//             mappedJob[fieldName] = sanitizeDate(value);
//         } else if (numberFields.includes(fieldName)) {
//             mappedJob[fieldName] = sanitizeNumber(value);
//         } else {
//             mappedJob[fieldName] = value;
//         }
//     }

//     return mappedJob;
// };

// const UploadJobRegisterData = async (req, res) => {
//   try {
//     let jobArray = Array.isArray(req.body) ? req.body : [req.body];

//     const chunks = splitIntoChunks(jobArray, BATCH_SIZE);
//     const allResults = [];

//     for (const chunk of chunks) {
//       const mappedJobs = chunk.map(mapJobItem);

//       const billNumbers = mappedJobs
//         .map(j => j.shipping_bill_number)
//         .filter(Boolean);

//       const existing = await JobRegister.find({
//         shipping_bill_number: { $in: billNumbers },
//       });

//       const existingSet = new Set(
//         existing.map(j => j.shipping_bill_number)
//       );

//       const bulkOps = [];

//       for (const job of mappedJobs) {
//         if (!job.shipping_bill_number) continue;

//         if (existingSet.has(job.shipping_bill_number)) {
//           bulkOps.push({
//             replaceOne: {
//               filter: { shipping_bill_number: job.shipping_bill_number },
//               replacement: job,
//               upsert: true,
//             },
//           });
//         } else {
//           bulkOps.push({
//             insertOne: { document: job },
//           });
//         }
//       }

//       if (bulkOps.length) {
//         await JobRegister.bulkWrite(bulkOps);
//       }

//       allResults.push(...mappedJobs);
//     }

//     res.status(200).json({
//       message: "Job entries uploaded successfully",
//       count: allResults.length,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Upload failed",
//       details: error.message,
//     });
//   }
// };


// module.exports = { FetchJobRegisterData, UploadJobRegisterData,FetchJobByShippingNo };













const JobRegister = require("../models/jobregister.js");

/* =========================
   HELPERS
========================= */

// Convert "DD.MM.YYYY" → Date
const parseDMYDate = (val) => {
  if (!val) return null;
  if (val instanceof Date) return val;

  if (typeof val === "string") {
    const parts = val.split(".");
    if (parts.length !== 3) return null;

    const [dd, mm, yyyy] = parts.map(Number);
    if (!dd || !mm || !yyyy) return null;

    return new Date(yyyy, mm - 1, dd);
  }

  return null;
};

// Convert date fields safely (including arrays of dates)
const normalizeDates = (job) => {
  const dateFields = [
    "date",
    "date2",
    "forwarding_date",
    "rail_out_date",
    "leo_date",
    "mundra_arrival_date",
  ];

  for (const field of dateFields) {
    if (job[field]) {
      job[field] = parseDMYDate(job[field]);
    }
  }

  // hover is ARRAY of dates
  if (Array.isArray(job.hover)) {
    job.hover = job.hover
      .map(parseDMYDate)
      .filter(Boolean);
  }

  return job;
};

/* =========================
   FETCH ALL
========================= */
const FetchJobRegisterData = async (req, res) => {
  try {
    const jobs = await JobRegister.find();
    res.status(200).json({
      message: "Fetched job register data successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching job register data",
      details: error.message,
    });
  }
};

/* =========================
   FETCH BY SHIPPING BILL
========================= */
const FetchJobByShippingNo = async (req, res) => {
  try {
    const shippingno = Number(req.params.id);

    const job = await JobRegister.findOne({
      shipping_bill_number: shippingno,
    });

    if (!job) {
      return res
        .status(404)
        .json({ message: "No job found with this shipping number" });
    }

    res.status(200).json({
      message: "Fetched job by shipping number",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching job by shipping number",
      details: error.message,
    });
  }
};

/* =========================
   UPLOAD (FINAL SAFE VERSION)
========================= */
const BATCH_SIZE = 300;

const splitIntoChunks = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const UploadJobRegisterData = async (req, res) => {
  try {
    let jobArray = Array.isArray(req.body) ? req.body : [req.body];

    if (!jobArray.length) {
      return res.status(400).json({ message: "No data received" });
    }

    const chunks = splitIntoChunks(jobArray, BATCH_SIZE);
    let processedCount = 0;

    for (const chunk of chunks) {
      // Normalize + clone
      const mappedJobs = chunk
        .map(raw => normalizeDates({ ...raw }))
        .filter(j => j.shipping_bill_number);

      if (!mappedJobs.length) continue;

      // Fetch existing records in ONE query
      const billNumbers = mappedJobs.map(
        j => j.shipping_bill_number
      );

      const existing = await JobRegister.find(
        { shipping_bill_number: { $in: billNumbers } },
        { shipping_bill_number: 1 }
      );

      const existingSet = new Set(
        existing.map(j => j.shipping_bill_number)
      );

      const bulkOps = mappedJobs.map(job => {
        if (existingSet.has(job.shipping_bill_number)) {
          return {
            replaceOne: {
              filter: { shipping_bill_number: job.shipping_bill_number },
              replacement: job,
              upsert: true,
            },
          };
        }

        return {
          insertOne: { document: job },
        };
      });

      if (bulkOps.length) {
        await JobRegister.bulkWrite(bulkOps, {
          ordered: false, // faster + fault-tolerant
        });
        processedCount += bulkOps.length;
      }
    }

    res.status(200).json({
      message: "Job register uploaded successfully",
      processed: processedCount,
      received: jobArray.length,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};


module.exports = {
  FetchJobRegisterData,
  UploadJobRegisterData,
  FetchJobByShippingNo,
};
