<template>
  <div>
    <div class="question-box">
      <h4 class="category">{{question.category}}</h4>
      <p class="timer">{{timer}}</p>
      <h3 class="question">{{question.question}}</h3>
      <div class="answers-container">
        <div
          @click="checkAnswer(index)"
          :class="answerClass(index)"
          v-for="(answer, index) in randomizedAnswers"
          :key="index"
        >
          <p>{{answer}}</p>
        </div>
      </div>
      <button :class="answered ? 'btn' : 'btn disabled'" @click="next" :disabled="!answered">Next</button>
    </div>
  </div>
</template>

<script>
let interval;
import { mapActions } from "vuex";
import _ from "lodash";
export default {
  props: {
    question: Object,
    next: Function,
    statistics: Function
  },
  data() {
    return {
      randomizedAnswers: [],
      correctIndex: null,
      selectedIndex: null,
      answered: false,
      timer: 15
    };
  },
  watch: {
    question: {
      immediate: true,
      handler() {
        (this.timer = 15),
          (this.correctIndex = null),
          (this.answered = null),
          this.stopTimer();
        this.randomize();
        this.startTimer();
      }
    }
  },
  computed: {
    answers() {
      let answers = [...this.question.incorrect_answers];
      answers.push(this.question.correct_answer);
      return answers;
    }
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    ...mapActions(["addPoints"]),
    answerClass(index) {
      if (this.answered && this.correctIndex === index) return "correct";
      else if (this.answered && this.selectedIndex === index)
        return "incorrect";
      return "";
    },
    randomize() {
      this.randomizedAnswers = _.shuffle(this.answers);
      this.correctIndex = this.randomizedAnswers.indexOf(
        this.question.correct_answer
      );
    },
    checkAnswer(index) {
      this.stopTimer();
      if (index === this.correctIndex && !this.answered) {
        this.selectedIndex = index;
        this.statistics(true);
        let points;
        let multipler = 1;
        if (this.question.difficulty === "medium") multipler = 2;
        if (this.question.difficulty === "hard") multipler = 3;

        if (this.timer > 11) this.addPoints(10 * multipler);
        else if (this.timer > 8) this.addPoints(7 * multipler);
        else if (this.timer > 4) this.addPoints(5 * multipler);
        else if (this.timer >= 2) this.addPoints(3 * multipler);
        else if (this.timer > 0) this.addPoints(1 * multipler);
      } else if (!this.answered) {
        this.selectedIndex = index;
        this.statistics(false);
      }
      this.answered = true;
    },
    startTimer() {
      interval = window.setInterval(() => {
        if (this.timer > 0) this.timer--;
        else this.checkAnswer(-1);
      }, 1000);
    },
    stopTimer() {
      window.clearInterval(interval);
      interval = null;
    }
  }
};
</script>