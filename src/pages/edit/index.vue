<script setup lang="ts">
</script>

<template>
    <section>
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
            <div>
                <p>Question 1</p>
                <div>
                    <p>Choices: </p>
                    <p>Answer 1</p>
                    <p>Answer 2</p>
                    <p>Answer 3</p>
                    <p>Answer 4</p> 
                </div>
                <p>Correct Answer: Answer 1</p>
            </div>
            <div>
                <button>Add a question</button>
            </div>
        </div>
        <div>
            <button>Finalize quiz</button>
        </div>
    </section>
</template>