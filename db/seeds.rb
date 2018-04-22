# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Person.create(name: "Joe Bob", bio: "From a land down under?",
          bioAvail: true)
        
Person.create(name: "James Peach", 
          bio: "Peaches are good?",
          bioAvail: false)

Person.create(name: "Nancy Drew", 
          bio: "I solve crimes?",
          bioAvail: true)

Person.create(name: "James Bond", 
          bio: "Shaken, not stirred.",
          bioAvail: true)