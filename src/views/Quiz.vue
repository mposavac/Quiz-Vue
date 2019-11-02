<template>
  <main>
    <div class="nav">
      <router-link class="exit" to="/">
        <i class="fas fa-arrow-left"></i>
        Exit
      </router-link>
      <p class="timer">{{formatTimer()}}</p>
      <p class="num-of-questions">{{correctAnswers}} / {{totalQuestions}}</p>
      <p class="points">{{points}} points</p>
      <div class="lifes">
        <transition-group name="lifeIn" tag="div">
          <div v-for="life in lifes" :key="life">
            <i class="full-heart far fa-heart" />
          </div>
        </transition-group>
        <transition-group name="lifeOut" tag="div">
          <div v-for="wrong in wrongAnswers" :key="wrong*6">
            <i class="lost-heart far fa-heart" />
          </div>
        </transition-group>
      </div>
      <router-link to="/">
        <img src="../assets/logo.png" draggable="false" alt="logoImg" />
      </router-link>
      <div class="timer-bar" :style="{width: ((timer/time)*100 )+'%'}"></div>
    </div>
    <div v-if="questions.length>0 && totalQuestions<20" class="main">
      <p class="start" v-if="!started && timer>0" @click="startTimer">START</p>
      <QuestionBox
        v-else-if="started && timer>0 && lifes>0"
        v-show="timer!==0"
        :question="questions[index]"
        :next="next"
        :statistics="statistics"
      />
      <p v-else class="game-over">GAME OVER</p>
    </div>
    <p v-else class="game-over">Please choose another difficulty or category</p>
    <transition name="formfade" mode="out-in">
      <SubmitForm v-if="lifes===0" :time="time" />
    </transition>
  </main>
</template>

<script>
let interval;
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import QuestionBox from "../components/QuestionBox.vue";
import SubmitForm from "../components/SubmitForm.vue";
export default {
  name: "quiz",
  props: ["category", "time"],
  components: {
    QuestionBox,
    SubmitForm
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
        if (this.wrongAnswers === 3) {
          this.stopTimer();
        }
      }
    },
    totalQuestions: {
      immediate: true,
      handler() {
        if (this.totalQuestions === 20) {
          this.addPoints(this.timer + this.lifes);
          this.stopTimer();
        }
      }
    }
  },
  methods: {
    ...mapActions(["addPoints"]),
    next() {
      this.index++;
    },
    statistics(correctAnswer) {
      this.totalQuestions++;
      if (correctAnswer) this.correctAnswers++;
      else {
        this.lifes--;
        this.wrongAnswers++;
      }
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
      this.lifes = 0;
      this.wrongAnswers = 3;
      this.timer = 0;
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
};
</script>