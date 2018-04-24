/* global Vue, VueRouter, axios, google */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [],
      newPerson: {name: "", bio:"", bioVisible: true}, 
      searchName: "", 
      searchBio: "", 
      sortAttribute: "name", 
      sortAsc: true
    };
  },
  created: function() {
    axios.get("/people").then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      var params = {
        inputName: this.newPerson.name,
        inputBio: this.newPerson.bio
      };
      axios.post("/people", params).then(function(response) {
        this.people.push(response.data);
        this.newPerson = {name: "", bio: "", bioVisible: true};
        this.errors = [];
      }.bind(this)).catch(function(error) {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      }.bind(this));
    }, 
    removePerson: function(thePerson) {
      var index = this.people.indexOf(thePerson);
      this.people.splice(index, 1);
    },
    isValidPerson: function(inputPerson) {
      var validBio = inputPerson.bio.toLowerCase().includes(this.searchBio.toLowerCase());
      var validName = inputPerson.name.toLowerCase().includes(this.searchName.toLowerCase());
      return validBio && validName;
    },
    setSortAttribute: function(inputAttribute) {
      this.sortAttribute = inputAttribute;
      this.sortAsc = !this.sortAsc;
    },
    setMarker: function(thisPlace, thisMap) {
      var contentString = thisPlace["des"];

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: {
          lat: thisPlace["lat"], 
          lng: thisPlace["lng"]},
        map: thisMap,
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(thisMap, marker);
      });

    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var person1Attribute = person1[this.sortAttribute].toLowerCase();
        var person2Attribute = person2[this.sortAttribute].toLowerCase();
        if (this.sortAsc) {
          return person1Attribute.localeCompare(person2Attribute);
        } else {
          return person2Attribute.localeCompare(person1Attribute);
        }
      }.bind(this));
    }
  }, 
  mounted: function() {
    var places = [{lat: -25.363, lng: 131.044, des: "super awesome"}, {lat: -25.363, lng: 31.044, des: "even better"}, {lat: -25.363, lng: 101.044, des: "simply the best"}];
    console.log(places)
    console.log(places[0]["lat"], places[0]["lng"])
    var uluru = {lat: -25.363, lng: 131.044};
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: uluru,
      zoom: 8
    });

    var i;
    for (i = 0; i < places.length; i++) { 
      this.setMarker(places[i], map);
    }
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});