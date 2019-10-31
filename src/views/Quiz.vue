<template>
  <main>
    <div class="nav">
      <router-link class="exit" to="/">
        <i class="fas fa-sign-out-alt" />Exit
      </router-link>
      <p class="timer">{{formatTimer()}}</p>
      <p class="num-of-questions">{{correctAnswers}} / {{totalQuestions}}</p>
      <p class="points">{{points}} points</p>
      <div class="lifes">
        <div v-for="life in lifes" :key="life">
          <i class="full-heart far fa-heart" />
        </div>
        <div v-for="wrong in wrongAnswers" :key="wrong*6">
          <i class="lost-heart far fa-heart" />
        </div>
      </div>
      <router-link to="/">
        <img src="../assets/logo.png" draggable="false" alt="logoImg" />
      </router-link>
      <div class="timer-bar" :style="{width: ((timer/time)*100 )+'%'}"></div>
    </div>
    <div v-if="questions.length>0" class="main">
      <p class="start" v-if="!started && timer>0" @click="startTimer">START</p>
      <QuestionBox
        v-else-if="started && timer>0 && lifes>0"
        v-show="timer!==0"
        :question="questions[index]"
        :next="next"
        :statistics="statistics"
      />
      <p class="game-over" v-else>GAME OVER</p>
    </div>
    <p v-else class="game-over">Plsese choose difrent options</p>
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
      wrongAnswers: 0,
      totalQuestions: 0
    };
  },
  computed: {
    ...mapState(["questions", "points"])
  },
  watch: {
    wrongAnswers: {
      immediate: true,
      handler() {
        if (this.wrongAnswers === 3) this.stopTimer();
      }
    }
  },
  methods: {
    next(param?: boolean) {
      this.index++;
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
      else {
        this.lifes--;
        this.wrongAnswers++;
      }
    },
    formatTimer() {
      if (this.timer >= 60)
        return `${Math.floor(this.timer / 60)}:${
          this.timer % 60 < 10 ? `0${this.timer % 60}` : this.timer % 60
        }`;
      else if (this.timer === 0) return "0:00";
      return "0:" + this.timer;
    }
  }
});
</script>