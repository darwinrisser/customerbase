const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// Hardcoded Data

const customers = [
  {id:'1', name:'John Doe', email:"jdoe@gmail.com", age:35},
  {id:'2', name:'Steve Smith', email:"steve@gmail.com", age:25},
  {id:'3', name:'Sarah Williams', email:"sarah@gmail.com", age:32},
];

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: ()=>({
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString,
    age: {type:GraphQLInt}
    }
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    customer: {
      type:CustomerType,
      args:{
        id:{GraphQLString}
      },
      resolve(parentValue, args){
        for(let i = 0; i < customers.length; i++){
          if(customers[i].id == args.id){
            return customers[i]
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});