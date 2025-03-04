import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SERVICE_ROLE_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, serviceRoleKey)

const seedQuiz = async (numEntries) => {
  try {
    const entryArr = []

    for (let i = 0; i < numEntries; i++) {
      const { data: users, error: userError } = await supabase.from('USER').select('user_id')
      if (userError) throw userError

      const randomUser = users[Math.floor(Math.random() * users.length)]
      entryArr.push({
        quiz_id: faker.string.uuid(),
        title: faker.word.words(3),
        description: faker.word.words({count: {min: 5, max: 10}}),
        created_by: randomUser.user_id,
        created_at: faker.date.recent(),
        is_timed: faker.datatype.boolean(),
        time_limit: faker.number.int(60),
        randomize_questions: faker.datatype.boolean(),
      })
    }

    const { error: insertError } = await supabase.from('QUIZ').insert(entryArr)
    if (insertError) throw insertError

    console.log('Data seeded successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

await seedQuiz(5)
