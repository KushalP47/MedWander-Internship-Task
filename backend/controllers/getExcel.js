import client from '../src/db.js';

const getExcelData = async (req, res) => {
    try {
        const response = await client.query(
            "SELECT * FROM users"
        );
        res.status(200).json(response.rows);
        res.status(200).json({ message: "Hello from getExcelData" });
    } catch (error) {
        // res.status(500).json({ error: error.message });
    }
}

export { getExcelData };
