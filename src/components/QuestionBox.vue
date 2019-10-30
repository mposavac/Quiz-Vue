<template>
  <div>
    <div>
      <h4>{{question.category}}</h4>
      <h3>{{question.question}}</h3>
      <div class="answers-container">
        <p>{{timer}}</p>
        <div
          @click="checkAnswer(index)"
          :class="answerClass(index)"
          v-for="(answer, index) in randomizedAnswers"
          :key="index"
        >{{answer}}</div>
      </div>
    </div>
    <button @click="next" :disabled="!answered">Next</button>
  </div>
</template>

<script lang="ts">
let interval;
import Vue from "vue";
import { mapActions } from "vuex";
import _ from "lodash";
export default Vue.extend({
  props: {
    question: Object,
    next: Function,
    statistics: Function
  },
  data() {
    return {
      randomizedAnswers: [],
      correctIndex: null,
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
  mounted() {},
  computed: {
    answers() {
      let answers: Array<string> = [...this.question.incorrect_answers];
      answers.push(this.question.correct_answer);
      return answers;
    }
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    ...mapActions(["addPoints"]),
    answerClass(index: number): string {
      return "answer";
    },
    randomize() {
      console.log(this.answers);
      this.randomizedAnswers = _.shuffle(this.answers);
      this.correctIndex = this.randomizedAnswers.indexOf(
        this.question.correct_answer
      );
      console.log(this.randomizedAnswers);
    },
    checkAnswer(index: number) {
      this.stopTimer();
      if (index === this.correctIndex && !this.answered) {
        this.statistics(true);
        let points;
        if (this.timer > 12) this.addPoints(10);
        else if (this.timer > 8) this.addPoints(7);
        else if (this.timer > 4) this.addPoints(5);
        else if (this.timer >= 2) this.addPoints(3);
        else if (this.timer > 0) this.addPoints(1);
      } else if (!this.answered) {
        console.log("NETOČNO");
        this.statistics(false);
      }
      this.answered = true;
    },
    startTimer() {
      interval = window.setInterval(() => {
        if (this.timer > 0) this.timer--;
        else this.next(true);
      }, 1000);
    },
    stopTimer() {
      window.clearInterval(interval);
      interval = null;
    }
  }
});
</script>

<style lang="scss" scoped>
</style>