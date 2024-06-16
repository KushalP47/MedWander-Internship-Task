import sql from './db.js'
import { supabase } from '../src/db.js'

export default async function getExcelData(age) {
  const users = await sql`
    select name, age
    from users
    where age > ${ age }
  `
  // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
  return users
}
