<script setup lang="ts">
</script>

<template>
    <section class="text-center grid gap-8">
        <div>
            <h1>MAKE A QUIZ</h1>
        </div>
        <div>
            <!-- generate a unique uuid -->
            <p>Title: </p>
            <p>Description: </p>
            <p>If time limit: none, don't show time limit</p>
            <p>Time Limit: Clock Select</p>
            <p>Randomize: YES | NO</p>
            <p>Created at: date picker</p>
            <p>Created by: username</p>
        </div>
        <div>
            <h2>Questions:</h2>
            <div class="grid gap-4 justify-center">
                <p>Question 1</p>
                <div>
                    <p>Choices: </p>
                    <div class="columns-2 gap-4">
                        <div class="flex items-center gap-2">
                            <input type="radio" name="choice" id="choice">
                            <p>Answer 1</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" name="choice" id="choice">
                            <p>Answer 2</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" name="choice" id="choice">
                            <p>Answer 3</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="radio" name="choice" id="choice">
                            <p>Answer 4</p>
                        </div>
                    </div>
                </div>
                <p>Correct Answer: Answer 1</p>
            </div>
            <div>
                <button>Add a question</button>
            </div>
        </div>
        <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Create Quiz</button>
        </div>
    </section>
</template>