<template>
  <div id="app">
    <div class = "my-time-card">
      <p v-if="username" id="my-name"
         style="display: inline">
         {{ username }} 
          <img v-if="!showButton" id="edit-name" @click="showButton=!showButton"
               alt="Edit Name"
               src="./assets/edit-button.png"
               style="widht:10px;height:10px;">
         - 
         <input v-if="showButton" id="new-name" placeholder = "Enter new name" style="outline: none">
         <button v-if="showButton" 
              @click="showButton=!showButton"
              src="./assets/edit-button.png"
              >x</button>
         <button v-if="showButton" @click="changeName">Save</button>
      </p>
      <p v-else id="my-name"
         style="display: inline">
         <input v-if="showButton" id="new-name" placeholder = "Enter new name" style="outline: none">
         <button v-if="showButton" @click="changeName">Save</button>
      </p>
      <p id="my-date" style="display: inline">Loading...</p>
      <p id="my-time" style="display: inline"> </p>
    </div>
    <div>
      <input id="ip-fname" placeholder = "Enter a new friend's name" style="outline: none">
      <select name="timezones" id="timezones">
        <option v-for="(zone, index) in allTimesZones" :key="index" :value="zone">
          {{ zone }}
        </option>
      </select>
      <button id="add-friend-button" @click="addNewFriendTime">
        Add
      </button>
    </div>
    <div id="friends-time-panel">
      <FriendsTime v-on:deleteCard="deleteFriendCard"
                   v-for="(friend, index) in friends" 
                   :key="index" 
                   :idx="index"
                   :name="friend.name"
                   :timezone="friend.timezone" />
    </div>
  </div>
</template>

<script>
import FriendsTime from './components/FriendsTime.vue';
import { parseDates } from "./utils.js";
export default {
  name: 'App',
  data() {
    return {
      allTimesZones: [
        'Europe/Andorra',
        'Asia/Dubai',
        'Asia/Kabul',
        'Europe/Tirane',
        'Asia/Yerevan',
        'Antarctica/Casey',
        'Antarctica/Davis',
        'Antarctica/DumontDUrville',
        'Antarctica/Mawson',
        'Antarctica/Palmer',
        'Antarctica/Rothera',
        'Antarctica/Syowa',
        'Antarctica/Troll',
        'Antarctica/Vostok',
        'America/Argentina/Buenos_Aires',
        'America/Argentina/Cordoba',
        'America/Argentina/Salta',
        'America/Argentina/Jujuy',
        'America/Argentina/Tucuman',
        'America/Argentina/Catamarca',
        'America/Argentina/La_Rioja',
        'America/Argentina/San_Juan',
        'America/Argentina/Mendoza',
        'America/Argentina/San_Luis',
        'America/Argentina/Rio_Gallegos',
        'America/Argentina/Ushuaia',
        'Pacific/Pago_Pago',
        'Europe/Vienna',
        'Australia/Lord_Howe',
        'Antarctica/Macquarie',
        'Australia/Hobart',
        'Australia/Currie',
        'Australia/Melbourne',
        'Australia/Sydney',
        'Australia/Broken_Hill',
        'Australia/Brisbane',
        'Australia/Lindeman',
        'Australia/Adelaide',
        'Australia/Darwin',
        'Australia/Perth',
        'Australia/Eucla',
        'Asia/Baku',
        'America/Barbados',
        'Asia/Dhaka',
        'Europe/Brussels',
        'Europe/Sofia',
        'Atlantic/Bermuda',
        'Asia/Brunei',
        'America/La_Paz',
        'America/Noronha',
        'America/Belem',
        'America/Fortaleza',
        'America/Recife',
        'America/Araguaina',
        'America/Maceio',
        'America/Bahia',
        'America/Sao_Paulo',
        'America/Campo_Grande',
        'America/Cuiaba',
        'America/Santarem',
        'America/Porto_Velho',
        'America/Boa_Vista',
        'America/Manaus',
        'America/Eirunepe',
        'America/Rio_Branco',
        'America/Nassau',
        'Asia/Thimphu',
        'Europe/Minsk',
        'America/Belize',
        'America/St_Johns',
        'America/Halifax',
        'America/Glace_Bay',
        'America/Moncton',
        'America/Goose_Bay',
        'America/Blanc-Sablon',
        'America/Toronto',
        'America/Nipigon',
        'America/Thunder_Bay',
        'America/Iqaluit',
        'America/Pangnirtung',
        'America/Atikokan',
        'America/Winnipeg',
        'America/Rainy_River',
        'America/Resolute',
        'America/Rankin_Inlet',
        'America/Regina',
        'America/Swift_Current',
        'America/Edmonton',
        'America/Cambridge_Bay',
        'America/Yellowknife',
        'America/Inuvik',
        'America/Creston',
        'America/Dawson_Creek',
        'America/Fort_Nelson',
        'America/Vancouver',
        'America/Whitehorse',
        'America/Dawson',
        'Indian/Cocos',
        'Europe/Zurich',
        'Africa/Abidjan',
        'Pacific/Rarotonga',
        'America/Santiago',
        'America/Punta_Arenas',
        'Pacific/Easter',
        'Asia/Shanghai',
        'Asia/Urumqi',
        'America/Bogota',
        'America/Costa_Rica',
        'America/Havana',
        'Atlantic/Cape_Verde',
        'America/Curacao',
        'Indian/Christmas',
        'Asia/Nicosia',
        'Asia/Famagusta',
        'Europe/Prague',
        'Europe/Berlin',
        'Europe/Copenhagen',
        'America/Santo_Domingo',
        'Africa/Algiers',
        'America/Guayaquil',
        'Pacific/Galapagos',
        'Europe/Tallinn',
        'Africa/Cairo',
        'Africa/El_Aaiun',
        'Europe/Madrid',
        'Africa/Ceuta',
        'Atlantic/Canary',
        'Europe/Helsinki',
        'Pacific/Fiji',
        'Atlantic/Stanley',
        'Pacific/Chuuk',
        'Pacific/Pohnpei',
        'Pacific/Kosrae',
        'Atlantic/Faroe',
        'Europe/Paris',
        'Europe/London',
        'Asia/Tbilisi',
        'America/Cayenne',
        'Africa/Accra',
        'Europe/Gibraltar',
        'America/Godthab',
        'America/Danmarkshavn',
        'America/Scoresbysund',
        'America/Thule',
        'Europe/Athens',
        'Atlantic/South_Georgia',
        'America/Guatemala',
        'Pacific/Guam',
        'Africa/Bissau',
        'America/Guyana',
        'Asia/Hong_Kong',
        'America/Tegucigalpa',
        'America/Port-au-Prince',
        'Europe/Budapest',
        'Asia/Jakarta',
        'Asia/Pontianak',
        'Asia/Makassar',
        'Asia/Jayapura',
        'Europe/Dublin',
        'Asia/Jerusalem',
        'Asia/Kolkata',
        'Indian/Chagos',
        'Asia/Baghdad',
        'Asia/Tehran',
        'Atlantic/Reykjavik',
        'Europe/Rome',
        'America/Jamaica',
        'Asia/Amman',
        'Asia/Tokyo',
        'Africa/Nairobi',
        'Asia/Bishkek',
        'Pacific/Tarawa',
        'Pacific/Enderbury',
        'Pacific/Kiritimati',
        'Asia/Pyongyang',
        'Asia/Seoul',
        'Asia/Almaty',
        'Asia/Qyzylorda',
        'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        'Asia/Aqtobe',
        'Asia/Aqtau',
        'Asia/Atyrau',
        'Asia/Oral',
        'Asia/Beirut',
        'Asia/Colombo',
        'Africa/Monrovia',
        'Europe/Vilnius',
        'Europe/Luxembourg',
        'Europe/Riga',
        'Africa/Tripoli',
        'Africa/Casablanca',
        'Europe/Monaco',
        'Europe/Chisinau',
        'Pacific/Majuro',
        'Pacific/Kwajalein',
        'Asia/Yangon',
        'Asia/Ulaanbaatar',
        'Asia/Hovd',
        'Asia/Choibalsan',
        'Asia/Macau',
        'America/Martinique',
        'Europe/Malta',
        'Indian/Mauritius',
        'Indian/Maldives',
        'America/Mexico_City',
        'America/Cancun',
        'America/Merida',
        'America/Monterrey',
        'America/Matamoros',
        'America/Mazatlan',
        'America/Chihuahua',
        'America/Ojinaga',
        'America/Hermosillo',
        'America/Tijuana',
        'America/Bahia_Banderas',
        'Asia/Kuala_Lumpur',
        'Asia/Kuching',
        'Africa/Maputo',
        'Africa/Windhoek',
        'Pacific/Noumea',
        'Pacific/Norfolk',
        'Africa/Lagos',
        'America/Managua',
        'Europe/Amsterdam',
        'Europe/Oslo',
        'Asia/Kathmandu',
        'Pacific/Nauru',
        'Pacific/Niue',
        'Pacific/Auckland',
        'Pacific/Chatham',
        'America/Panama',
        'America/Lima',
        'Pacific/Tahiti',
        'Pacific/Marquesas',
        'Pacific/Gambier',
        'Pacific/Port_Moresby',
        'Pacific/Bougainville',
        'Asia/Manila',
        'Asia/Karachi',
        'Europe/Warsaw',
        'America/Miquelon',
        'Pacific/Pitcairn',
        'America/Puerto_Rico',
        'Asia/Gaza',
        'Asia/Hebron',
        'Europe/Lisbon',
        'Atlantic/Madeira',
        'Atlantic/Azores',
        'Pacific/Palau',
        'America/Asuncion',
        'Asia/Qatar',
        'Indian/Reunion',
        'Europe/Bucharest',
        'Europe/Belgrade',
        'Europe/Kaliningrad',
        'Europe/Moscow',
        'Europe/Simferopol',
        'Europe/Kirov',
        'Europe/Astrakhan',
        'Europe/Volgograd',
        'Europe/Saratov',
        'Europe/Ulyanovsk',
        'Europe/Samara',
        'Asia/Yekaterinburg',
        'Asia/Omsk',
        'Asia/Novosibirsk',
        'Asia/Barnaul',
        'Asia/Tomsk',
        'Asia/Novokuznetsk',
        'Asia/Krasnoyarsk',
        'Asia/Irkutsk',
        'Asia/Chita',
        'Asia/Yakutsk',
        'Asia/Khandyga',
        'Asia/Vladivostok',
        'Asia/Ust-Nera',
        'Asia/Magadan',
        'Asia/Sakhalin',
        'Asia/Srednekolymsk',
        'Asia/Kamchatka',
        'Asia/Anadyr',
        'Asia/Riyadh',
        'Pacific/Guadalcanal',
        'Indian/Mahe',
        'Africa/Khartoum',
        'Europe/Stockholm',
        'Asia/Singapore',
        'America/Paramaribo',
        'Africa/Juba',
        'Africa/Sao_Tome',
        'America/El_Salvador',
        'Asia/Damascus',
        'America/Grand_Turk',
        'Africa/Ndjamena',
        'Indian/Kerguelen',
        'Asia/Bangkok',
        'Asia/Dushanbe',
        'Pacific/Fakaofo',
        'Asia/Dili',
        'Asia/Ashgabat',
        'Africa/Tunis',
        'Pacific/Tongatapu',
        'Europe/Istanbul',
        'America/Port_of_Spain',
        'Pacific/Funafuti',
        'Asia/Taipei',
        'Europe/Kiev',
        'Europe/Uzhgorod',
        'Europe/Zaporozhye',
        'Pacific/Wake',
        'America/New_York',
        'America/Detroit',
        'America/Kentucky/Louisville',
        'America/Kentucky/Monticello',
        'America/Indiana/Indianapolis',
        'America/Indiana/Vincennes',
        'America/Indiana/Winamac',
        'America/Indiana/Marengo',
        'America/Indiana/Petersburg',
        'America/Indiana/Vevay',
        'America/Chicago',
        'America/Indiana/Tell_City',
        'America/Indiana/Knox',
        'America/Menominee',
        'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem',
        'America/North_Dakota/Beulah',
        'America/Denver',
        'America/Boise',
        'America/Phoenix',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Juneau',
        'America/Sitka',
        'America/Metlakatla',
        'America/Yakutat',
        'America/Nome',
        'America/Adak',
        'Pacific/Honolulu',
        'America/Montevideo',
        'Asia/Samarkand',
        'Asia/Tashkent',
        'America/Caracas',
        'Asia/Ho_Chi_Minh',
        'Pacific/Efate',
        'Pacific/Wallis',
        'Pacific/Apia',
        'Africa/Johannesburg'
      ],
      friends: [],
      username: "",
      showButton: "",
    }
  },
  components: {
    FriendsTime
  },
  created(){
    setInterval(() => {
      const timeZoneTime = new Date().toLocaleString('en-GB');
      const dayName = new Date().toLocaleString('default', {weekday: 'long', timeZone: this.timezone});
      const dateP = document.getElementById("my-date");
      const timeP = document.getElementById("my-time");
      const splittedDate = timeZoneTime.split(" ");
      dateP.innerHTML = dayName + ", " + parseDates(timeZoneTime) + " ";
      timeP.innerHTML = splittedDate[1];
    },
    1000);
    const jsonObj = JSON.parse(localStorage.getItem("friendsArray"));
    if(jsonObj === null){
      const jsonString = JSON.stringify(this.friends);
      localStorage.setItem("friendsArray", jsonString);
    }
    else{
      this.friends = jsonObj;
    }
    const usernameObj = localStorage.getItem("username");
    if(usernameObj === null){
      this.showButton = true;
    }
    else{
      this.showButton = false;
      this.username = usernameObj;
    }
  },
  methods: {
    addNewFriendTime: function(){
      const fname = document.getElementById("ip-fname").value;
      const ftimezone = document.getElementById("timezones").value;
      const newElem = {
        name: fname,
        timezone: ftimezone,
      };
      this.friends.push(newElem);
      const jsonObj = JSON.parse(localStorage.getItem("friendsArray"));
      jsonObj.push(newElem);
      localStorage.setItem("friendsArray", JSON.stringify(jsonObj));
      window.location.reload();
    },
    deleteFriendCard: function(idx){
      // Remove the element from the DOM
      const element = document.getElementById(`card-idx-${idx}`);
      console.log(element);
      element.remove();
      // Remove the element from the json object in the local storage
      const jsonObj = JSON.parse(localStorage.getItem("friendsArray"));
      jsonObj.splice(idx, 1);
      localStorage.setItem("friendsArray", JSON.stringify(jsonObj));
      // Reload the page
      window.location.reload();
    },
    changeName() {
      const newName = document.getElementById("new-name").value;
      if(newName !== ""){
        localStorage.setItem("username", newName);
        window.location.reload();
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.my-time-card{
  border: 1px solid rgb(187, 197, 187);
  width: 50%;
  margin: auto;
  padding: 1%;
  border-radius: 5px;
  background-color: rgb(199, 241, 199);
  font-weight: 700;
}
#ip-fname{
  margin-right: 1%;
  margin-top: 1%;
  margin-bottom: 1%;
  width: 20%;
  padding: 0.4%;
  border: 1px solid gray;
  border-radius: 10px;
}
select{
  margin-right: 1%;
  margin-top: 1%;
  margin-bottom: 1%;
  padding: 0.35%;
  outline: none;
  border: 1px solid gray;
  border-radius: 10px;
}
#add-friend-button{
  padding: 0.35%;
  outline: none;
  border: 1px solid gray;
  border-radius: 10px;
  transition: all 0.1s ease-in;
}
#add-friend-button:hover{
  cursor: pointer;
  background-color: rgb(181, 224, 181);
}
#edit-name:hover{
  cursor: pointer;
}
</style>
