<template>
  <div class="home">
    <div>
      <img src="../assets/logo.png" draggable="false" alt="logoImg" />
    </div>
    <form @submit.prevent="submit">
      <div class="form-flex">
        <div class="form-content-flex">
          <p>Choose time:</p>
          <p>Choose category:</p>
          <p>Choose difficulty:</p>
        </div>
        <div class="form-content-flex">
          <Selection :disabled="isLoading" :options="time" v-model="chosenTime" />
          <Selection :disabled="isLoading" :options="categories" v-model="chosenCategory" />
          <Selection :disabled="isLoading" :options="difficulty" v-model="chosenDifficulty" />
        </div>
      </div>
      <div>
        <button class="btn" :disabled="isLoading" @click="randomPick">RANDOM</button>
        <button class="btn" :disabled="isLoading" type="submit">PLAY</button>
      </div>
    </form>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import "../style/index.scss";
import Selection from "@/components/Selection.vue";
import Spinner from "@/components/Spinner.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  components: {
    Selection,
    Spinner
  },
  data() {
    return {
      time: [
        { name: "60 seconds", value: 60 },
        { name: "90 seconds", value: 90 },
        { name: "120 seconds", value: 120 },
        { name: "180 seconds", value: 180 }
      ],
      categories: [
        { name: "Any Category", value: "" },
        { name: "General Knowledge", value: 9 },
        { name: "Books", value: 10 },
        { name: "Film", value: 11 },
        { name: "Music", value: 12 },
        { name: "Musicals & Theatres", value: 13 },
        { name: "Television", value: 14 },
        { name: "Video Games", value: 15 },
        { name: "Board Games", value: 16 },
        { name: "Science & Nature", value: 17 },
        { name: "Science: Computers", value: 18 },
        { name: "Science: Mathematics", value: 19 },
        { name: "Mythology", value: 20 },
        { name: "Sports", value: 21 },
        { name: "Geography", value: 22 },
        { name: "History", value: 23 },
        { name: "Politics", value: 24 },
        { name: "Art", value: 25 },
        { name: "Celebrities", value: 26 },
        { name: "Animals", value: 27 },
        { name: "Vehicles", value: 28 },
        { name: "Comics", value: 29 },
        { name: "Gadgets", value: 30 },
        { name: "Japanese Anime & Manga", value: 31 },
        { name: "Cartoon & Animations", value: 32 }
      ],
      difficulty: [
        { name: "Any Difficulty", value: "" },
        { name: "Easy", value: "easy" },
        { name: "Medium", value: "medium" },
        { name: "Hard", value: "hard" }
      ],
      chosenTime: 60,
      chosenCategory: "",
      chosenDifficulty: "",
      isLoading: false
    };
  },
  methods: {
    ...mapActions(["addQuestions"]),
    async submit() {
      this.isLoading = true;
      await fetch(
        `https://opentdb.com/api.php?amount=20&${
          this.chosenCategory === "" ? "" : "category=" + this.chosenCategory
        }&${
          this.chosenDifficulty === ""
            ? ""
            : "difficulty=" + this.chosenDifficultys
        }`
      )
        .then(res => res.json())
        .then(data => this.addQuestions(data.results));
      setTimeout(() => {
        this.$router.push({
          name: "quiz",
          params: { time: this.chosenTime }
        });
      }, 1000);
    },
    randomPick() {
      this.chosenTime = this.time[
        Math.floor(Math.random() * this.time.length)
      ].value;
      this.chosenCategory = this.categories[
        Math.floor(Math.random() * this.categories.length)
      ].value;
      this.chosenDifficulty = "";
    }
  }
};
</script>
