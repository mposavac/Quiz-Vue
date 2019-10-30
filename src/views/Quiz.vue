<template>
  <main>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <p>{{timer}}</p>
      <p>{{correctAnswers}} / {{totalQuestions}}</p>
      <p>{{points}} points</p>
      <div class="lives">
        <p v-for="life in lifes" :key="life">X</p>
      </div>
    </div>
    <div>
      <h1>QUIZ LOGO smaller</h1>
      <button v-if="!started && timer>0" @click="startTimer">START</button>
      <QuestionBox
        v-else-if="started && timer>0 && lifes>0"
        v-show="timer!==0"
        :question="questions[index]"
        :next="next"
        :statistics="statistics"
      />
      <div v-else>GAME OVER</div>
    </div>
  </main>
</template>

<script lang="ts">
let interval;
import Vue from "vue";
import QuestionBox from "../components/QuestionBox.vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "quiz",
  props: ["category", "time"],
  components: {
    QuestionBox
  },
  data() {
    return {
      timer: this.$props.time,
      started: false,
      index: 0,
      lifes: 3,
      correctAnswers: 0,
      totalQuestions: 0
    };
  },
  computed: {
    ...mapState(["questions", "points"])
  },
  methods: {
    next(param?: boolean) {
      this.index++;
      console.log("NEXT:", param);
      if (param === true) this.statistics(false);
    },
    startTimer() {
      this.started = true;
      interval = setInterval(() => {
        if (this.timer > 0) this.timer--;
        else this.stopTimer();
      }, 1000);
    },
    stopTimer() {
      interval = null;
      this.timer = 0;
    },
    statistics(correctAnswer: boolean) {
      this.totalQuestions++;
      if (correctAnswer) this.correctAnswers++;
      else this.lifes--;
    }
  }
});
</script>
