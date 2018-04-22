/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [],
      newPerson: {name: "", bio:"", bioVisible: true}, 
      searchName: "", 
      searchBio: ""
    };
  },
  created: function() {
    axios.get("/people").then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      this.people.push(this.newPerson);
      this.newPerson = {name: "", bio:"", bioVisible: true};
    }, 
    removePerson: function(thePerson) {
      var index = this.people.indexOf(thePerson);
      this.people.splice(index, 1);
    },
    isValidPerson: function(inputPerson) {
      var validBio = inputPerson.bio.toLowerCase().includes(this.searchBio.toLowerCase());
      var validName = inputPerson.name.toLowerCase().includes(this.searchName.toLowerCase());
      return validBio && validName;
    }
  },
  computed: {}
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