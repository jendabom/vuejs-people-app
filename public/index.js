/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [
        {
          name: "Joe Bob", 
          bio: "From a land down under?",
          bioAvail: true
        },
        {
          name: "James Peach", 
          bio: "Peaches are good?",
          bioAvail: false
        },
        {
          name: "Nancy Drew", 
          bio: "I solve crimes?",
          bioAvail: true
        }
      ],
      newPerson: {name: "", bio:"", bioVisible: true}, 
      searchName: "", 
      searchBio: ""
    };
  },
  created: function() {},
  methods: {
    addPerson: function() {
      console.log("I am a Person");
      this.people.push(this.newPerson);
      this.newPerson = {name: "", bio:"", bioVisible: true};
    }, 
    removePerson: function(thePerson) {
      console.log(thePerson);
      var index = this.people.indexOf(thePerson);
      this.people.splice(index, 1);
    },
    isValidPerson: function(inputPerson) {
      console.log('running isValidPerson');
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