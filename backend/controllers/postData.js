import sql from '../src/db.js'
import { supabase } from '../src/db.js'

export default async function postData(req, res) {
    const { name, countryCode, phoneNumber } = req.body
    const { data, error } = await supabase
        .from('users')
        .insert([{ name, countryCode, phoneNumber }])
}