import client from '../src/db.js';

const getExcelData = async (req, res) => {
    try {
        // const { name, countryCode, phoneNumber } = req.body;
        // const response = await client.query(
        //     "INSERT INTO users (name, countryCode, phoneNumber) VALUES ($1, $2, $3) RETURNING *",
        //     [name, countryCode, phoneNumber]
        // );
        // res.status(200).json(response.rows[0]);
        res.status(200).json({ message: "Hello from getExcelData" });
    } catch (error) {
        // res.status(500).json({ error: error.message });
    }
}

export { getExcelData };
