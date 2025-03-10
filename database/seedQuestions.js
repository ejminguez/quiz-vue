import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SERVICE_ROLE_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, serviceRoleKey)

const seedQuestions = async () => {
  try {
    const { data: quizzes, error: quizError } = await supabase.from('QUIZ').select('quiz_id')
    if (quizError) throw quizError

    for (const quiz of quizzes) {
      const entryArr = []

      for (let i = 0; i < 5; i++) {
        entryArr.push({
          question_id: faker.string.uuid(),
          question_text: faker.word.words({ count: { min: 5, max: 15 } }),
          quiz_id: quiz.quiz_id,
        })
      }

      const { error: insertError } = await supabase.from('QUESTION').insert(entryArr)
      if (insertError) throw insertError
    }

    console.log('Data seeded successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

await seedQuestions(30)
