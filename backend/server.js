const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const config = require('./config');
const { authenticate } = require('./auth');

const users = [];

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
    }

    type Query {
        login(email: String!, password: String!): String
    }

    type Mutation {
        register(email: String!, password: String!): String
    }
`;

const resolvers = {
    Query: {
        login: (_, { email, password }) => {
            const user = users.find(user => user.email === email && user.password === password);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, config.jwt.options);
            return token;
        }
    },
    Mutation: {
        register: (_, { email, password }) => {
            const user = { id: users.length + 1, email, password };
            users.push(user);
            const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, config.jwt.options);
            return token;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        let user = null;
        if (token) {
            try {
                user = authenticate(token);
            } catch (e) {
                console.warn('Authentication failed');
            }
        }
        return { user };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});