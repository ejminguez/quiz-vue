<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPlus, faTimes, faCheck);

interface Question {
  text: string;
  options: string[];
}

const questions = ref<Question[]>([]);
let isCorrect = ref(false);

// Add a new question with an empty options array
const addQuestion = () => {
  questions.value.push({ text: '', options: [] });
};

// Add an option to a specific question
const addOption = (questionIndex: number) => {
  questions.value[questionIndex].options.push('');
};

// Remove a specific question
const removeQuestion = (index: number) => {
  questions.value.splice(index, 1);
};

// Remove an option from a specific question
const removeOption = (questionIndex: number, optionIndex: number) => {
  questions.value[questionIndex].options.splice(optionIndex, 1);
};

const createQuestions = () => {
  console.log('Create questions with options:', questions.value);
  // Your logic to submit or handle questions here
};
</script>


<template>
  <form>
    <div class="grid gap-16">

      <div class="grid gap-8">
        <!-- Loop through questions -->
        <div v-for="(question, qIndex) in questions" :key="qIndex"
          class="border-[1px] px-4 py-8 rounded-md shadow-md">
          <!-- Question Input -->
          <div class="flex gap-4 items-start">
            <textarea v-model="question.text" placeholder="Enter your question"
              class="border-[1px] rounded-md p-4 w-full h-24 bg-white" />
            <button @click.prevent="removeQuestion(qIndex)"
              class="text-red-500 hover:text-red-700 cursor-pointer hover:scale-125 transition-all duration-300">
              <font-awesome-icon :icon="faTimes" />
            </button>
          </div>

          <!-- Options for the Question -->
          <div class="grid gap-4 mt-4">
            <div v-for="(option, oIndex) in question.options" :key="oIndex" class="flex items-center gap-4">
              <input v-model="question.options[oIndex]" type="text" placeholder="Enter an option"
                class="border-[1px] rounded-md p-2 w-full bg-white" />
                <div class="flex gap-2 items-center">
                  <input type="checkbox" class="cursor-pointer" name="isCorrect" v-model="isCorrect"/>
                  <label for="isCorrect">correct</label>
                </div>
              <button @click.prevent="removeOption(qIndex, oIndex)"
                class="text-red-500 hover:text-red-700 cursor-pointer hover:scale-125 transition-all duration-300">
                <font-awesome-icon :icon="faTimes" />
              </button>
            </div>
          </div>

          <!-- Add Option Button -->
          <div class="mt-4">
            <button @click.prevent="addOption(qIndex)"
              class="border-[1px] bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100 transition-all duration-300">
              <FontAwesomeIcon :icon="faPlus" /> Add Option
            </button>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex gap-4 mt-4">
          <button @click.prevent="addQuestion"
            class="border-[1px] px-4 py-2 rounded-md cursor-pointer hover:bg-amber-100 transition-all duration-300">
            <FontAwesomeIcon :icon="faPlus" /> Add Question
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" @click.prevent="createQuestions"
        class="border rounded-md w-[30%] py-2 mx-auto cursor-pointer hover:bg-green-100 transition-all duration-300">
        <FontAwesomeIcon :icon="faCheck" /> Create Questions
      </button>

    </div>
  </form>
</template>
