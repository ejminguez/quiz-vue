<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const quizTitle = ref('');
const quizDescription = ref('');
const quizTime = ref(0);
const isTimed = ref(false);
const randomize = ref(false);
const user = useAuthStore();
const router = useRouter();

const createQuiz = async () => {
  if (!quizTitle.value || !quizDescription.value) {
    window.alert('All fields are required');
    return;
  }

  const { data, error } = await supabase
    .from('QUIZ')
    .insert([
      {
        created_at: new Date().toISOString(),
        created_by: user.user?.id || '',
        description: quizDescription.value,
        is_timed: isTimed.value,
        randomize_questions: randomize.value,
        time_limit: quizTime.value,
        title: quizTitle.value,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return;
  } else {
    console.log(data);
    router.push(`/quiz/create/${quizTitle.value}`);
  }
};
</script>

<template>
  <section class="text-center grid gap-8 w-full">
    <h1 class="text-3xl font-bold">Create Quiz</h1>
    <form>
      <div class="grid gap-4 justify-center w-[45%] mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div class="flex gap-4 items-center">
          <label for="quizTitle" class="w-[30%]">Quiz Title</label>
          <input
            type="text"
            name="quizTitle"
            placeholder="Quiz Title"
            v-model="quizTitle"
            class="border border-gray-300 p-2 w-96 rounded-xl"
          />
        </div>

        <div class="flex gap-4">
          <label for="quizDescription" class="w-[30%]">Description</label>
          <textarea
            name="quizDescription"
            placeholder="Quiz Description"
            v-model="quizDescription"
            class="border border-gray-300 p-2 rounded-xl w-96 h-56"
          ></textarea>
        </div>

        <div class="grid gap-4 w-full">
          <div>
            <button
              @click.prevent="isTimed = true"
              :class="{ 'bg-amber-200': isTimed }"
              class="px-4 py-2 border-[1px] cursor-pointer hover:bg-amber-100 rounded-l-xl transition-all duration-300"
            >
              Set Time
            </button>
            <button
              @click.prevent="isTimed = false"
              :class="{ 'bg-amber-200': !isTimed }"
              class="px-4 py-2 border-[1px] cursor-pointer hover:bg-amber-100 rounded-r-xl transition-all duration-300"
            >
              No Time
            </button>
          </div>
          <div v-if="isTimed" class="w-full flex items-center">
            <label for="quizTime" class="w-[30%]">Time</label>
            <input
              type="number"
              name="quizTime"
              placeholder="Time in minutes"
              class="border border-gray-300 p-2 w-[40%] rounded-xl"
              v-model="quizTime"
            />
          </div>

          <div class="flex items-center gap-4 mx-auto">
            <input
              type="checkbox"
              name="randomizeQuestions"
              class="cursor-pointer"
              v-model="randomize"
            />
            <label for="randomizeQuestions">Randomize Questions</label>
          </div>
        </div>
      </div>
    </form>

    <div>
      <button
        class="border-[1px] py-3 px-6 rounded-xl cursor-pointer bg-green-300 shadow-xl hover:bg-green-100 transition-all duration-300"
        @click="createQuiz"
      >
        Create Quiz
      </button>
    </div>
  </section>
</template>