<template>
  <div  :id="`card-idx-${idx}`"
        :class="`friends-timezone-${idx}`"
        style="margin: auto;
               width: 50%;">
    <div class="card">
      <div style="float: right;">
        <img alt="delete" @click="$emit('deleteCard', idx)" src="../assets/bin_icon.png">
      </div>
      <div class="container">
        <div class="column">
          <p style="display: inline; font-weight: 700;" :id="`friends-name-${idx}`">{{ name }}</p>
        </div>
        <div class="column">
          <div class="row">
            <p style="display: inline;" :id="`friends-date-${idx}`"></p>
          </div>
          <div class="row">
            <p :id="`friends-time-${idx}`">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseDates } from '../utils.js';
export default {
  name: 'FriendsTime',
  props: {
    idx: Number,
    name: String,
    timezone: String
  },
  created(){
    setInterval(() => {
      const timeZoneTime = new Date().toLocaleString("en-GB", {timeZone: this.timezone});
      const dayName = new Date().toLocaleString('default', {weekday: 'long', timeZone: this.timezone});
      const dateP = document.getElementById(`friends-date-${this.idx}`);
      const timeP = document.getElementById(`friends-time-${this.idx}`);
      const splittedDate = timeZoneTime.split(" ");
      dateP.innerHTML = dayName + ", " + parseDates(timeZoneTime) + " ";
      timeP.innerHTML = `Time in ${this.timezone.split("/")[1]} ` + splittedDate[1];
    },
    1000);
  },
}
</script>

<style scoped>
.card{
  border: 1px solid rgb(173, 162, 162);
  padding: 5px;
  background-color: rgb(240, 147, 147);
  margin-bottom: 1%;
  border-radius: 10px;
}
p{
  font-size:110%;
  margin: 0;
}
img{
  width: 15px;
  height: 15px;
}
img:hover{
  cursor: pointer;
}
</style>
