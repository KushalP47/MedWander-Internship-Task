import client from '../src/db.js';

const postData = async (req, res) => {
    try {
        const { formType, name, countryCode, phoneNumber } = req.body;
        
        // Check for null or undefined values in required fields
        if (!name || !countryCode || !phoneNumber || !formType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log(formType, name, countryCode, phoneNumber);
        const response = await client.query(
            "INSERT INTO users (name, countryCode, phoneNumber, formType) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, countryCode, phoneNumber, formType]
        );
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { postData };