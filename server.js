import { ApolloServer, gql } from "apollo-server";

let tweets = [
	{
		id: "1",
		text: "Think Different!",
		userId: "2",
	},
	{
		id: "2",
		text: "아버지를 아버지라 부르지 못하고~",
		userId: "1",
	},
];

let users = [
	{
		id: "1",
		firstName: "길동",
		lastName: "홍",
	},
	{
		id: "2",
		firstName: "스티브",
		lastName: "잡스",
	},
];

const typeDefs = gql`
	type User {
		id: ID
		firstName: String!
		lastName: String!
		fullName: String
	}
	type Tweet {
		id: ID
		text: String
		author: User
	}
	type Query {
		allUsers: [User!]!
		allTweets: [Tweet]
		tweet(id: ID): Tweet
	}
	type Mutation {
		postTweet(text: String, userId: ID): Tweet
		deleteTweet(id: ID): Boolean
	}
`;

const resolvers = {
	Query: {
		allTweets() {
			console.log("트윗을 가져옵니다");
			return tweets;
		},
		tweet(root, { id }) {
			return tweets.find(tweet => tweet.id === id);
		},
		allUsers() {
			console.log("모든 사용자를 가져옵니다");
			return users;
		},
	},
	Mutation: {
		postTweet(root, { text, userId }) {
			const newTweet = {
				id: tweets.length + 1,
				text,
				userId,
			};
			tweets.push(newTweet);
			return newTweet;
		},
		deleteTweet(root, { id }) {
			const tweet = tweets.find(tweet => tweet.id === id);
			if (!tweet) {
				return false;
			}
			tweets = tweets.filter(tweet => tweet.id !== id);

			return true;
		},
	},
	User: {
		fullName({ firstName, lastName }) {
			return `${firstName} ${lastName}`;
		},
	},
	Tweet: {
		author({ userId }) {
			const foundUser = users.find(user => user.id === userId);
			if (!foundUser) {
				throw new Error("유저를 찾을 수 없습니다.");
			}
			return foundUser;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});
