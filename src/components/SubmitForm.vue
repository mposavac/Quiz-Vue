<template>
  <div class="submit">
    <form v-if="!submited" @submit.prevent="submitScore" class="submit-form">
      <div class="input-container">
        <label for="userName">Enter name:</label>
        <input type="text" v-model="userName" name="userName" required autocomplete="off" />
      </div>
      <p>{{points}} points</p>
      <button type="submit" class="btn">Submit</button>
    </form>
    <transition name="fade" mode="out-in">
      <div v-if="submited" class="highscores">
        <h4>Highscores:</h4>
        <div class="user">
          <div class="names">
            <p
              v-for="(user, index) in highScoreUsers"
              :key="index"
              class="user-name"
            >{{user.userName}}</p>
          </div>
          <div class="points">
            <p
              v-for="(user, index) in highScoreUsers"
              :key="index+user.userName"
            >({{user.points}}) points</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { fb } from "../config/fbconfig";
export default Vue.extend({
  props: ["time"],
  data() {
    return {
      userName: "",
      submited: false,
      highScoreUsers: []
    };
  },
  computed: {
    ...mapState(["points"])
  },
  methods: {
    async submitScore() {
      await fb.collection(`highScores${this.time}`).add({
        userName: this.userName,
        points: this.points
      });
      this.submited = true;
      this.getHighScores();
    },
    async getHighScores() {
      let users = [];
      let snapshot = await fb.collection(`highScores${this.time}`).get();
      snapshot.forEach(doc => {
        users.push(doc.data());
      });
      users.sort((a, b) => b.points - a.points);
      this.highScoreUsers = users;
    }
  }
});
</script>