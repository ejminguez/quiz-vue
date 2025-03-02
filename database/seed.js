import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SERVICE_ROLE_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, serviceRoleKey)

const seedUsers = async (numEntries) => {

    const entryArr = []

    for (let i = 0; i < numEntries; i++) {
        entryArr.push({
            user_id: faker.string.uuid(),
            username: faker.internet.username(),
            email_address: faker.internet.email(),
            is_authorized: faker.datatype.boolean({ probability: 0.5 }),
            password_hash: faker.internet.password({ length: 20, memorable: true })
          })
    }

    await supabase.from('USER').insert(entryArr)
}

await seedUsers(5)
