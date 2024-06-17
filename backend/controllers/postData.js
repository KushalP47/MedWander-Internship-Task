import client from '../src/db.js';

const postData = async (req, res) => {
    try {
        const { name, countryCode, phoneNumber } = req.body;
        console.log(name, countryCode, phoneNumber);
        const response = await client.query(
            "INSERT INTO users (name, countryCode, phoneNumber) VALUES ($1, $2, $3) RETURNING *",
            [name, countryCode, phoneNumber]
        );
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { postData };