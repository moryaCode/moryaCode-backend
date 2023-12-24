const express = require('express');
const app = express();
const port = 8000;
require('./app');
const { db } = require('./config/db')
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const {graphqlHTTP} = require('express-graphql');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const UserType = new GraphQLObjectType({
    name : "User",
    fields : () => ({
        id : { type : GraphQLInt },
        username : {type : GraphQLString },
        email : { type : GraphQLString }
    })
});
const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        // query
        getAllUsers : {
            type : new GraphQLList(UserType),
            args : { id : { type : GraphQLInt }},
            async resolve(parent, args){
                return await db.query(`select * from users`, {
                    type: db.QueryTypes.SELECT,
                    raw: true      
                });
            }
        }
    }
});
// const Mutation = "mutation";
const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        // query
        createUser : {
            type : UserType,
            args : {
                username : { type : GraphQLString },
                email : { type : GraphQLString }
            },
            resolve(parent, args){
                db.query("INSERT INTO users(username, email)VALUES ('arya', 'arya@gmail.com')");
                return args;
            }

        }
        // updateUser
        // deleteUser
    }
});

const schema = new GraphQLSchema({query: RootQuery,mutation: Mutation});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));


 app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
 });