require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const config = require('./config/config');
const { authenticate } = require('./auth');

const dbConfig = {
    host: process.env.MYSQL_HOST || 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
};

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Query {
        login(email: String!, password: String!): String
        me: User
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): String
    }
`;

const resolvers = {
    Query: {
        login: async (_, { email, password }) => {
            try {
                const connection = await mysql.createConnection(dbConfig);
                const [rows] = await connection.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
                if (rows.length === 0) {
                    throw new Error('Invalid credentials');
                }
                const user = rows[0];
                const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: '1d' });
                return token;
            } catch (error) {
                console.error('Error during login:', error);
                throw new Error('Login failed');
            }
        },
        me: async (_, __, { user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }
            return user;
        }
    },
    Mutation: {
        register: async (_, { name, email, password }) => {
            try {
                const connection = await mysql.createConnection(dbConfig);
                await connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
                const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
                const user = rows[0];
                const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: '1d' });
                return token;
            } catch (error) {
                console.error('Error during registration:', error);
                console.error('Error details:', error);
                throw new Error('Registration failed');
            }
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