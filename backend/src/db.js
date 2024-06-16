import postgres from "postgres";

const connectionString = process.env.DATABASE_URL
const connectDB = async() => postgres(connectionString)

export default connectDB

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)