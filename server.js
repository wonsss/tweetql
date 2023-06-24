import { ApolloServer, gql } from "apollo-server";

let tweets = [
	{
		id: "1",
		text: "first one!",
		author: { id: 1, username: "Marco" },
	},
	{
		id: "2",
		text: "second one",
	},
];

const typeDefs = gql`
	type User {
		id: ID
		username: String
	}
	type Tweet {
		id: ID
		text: String
		author: User
	}
	type Query {
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
	},
	Mutation: {
		postTweet(root, { text, userId }) {
			const tweet = {
				id: tweets.length + 1,
				text,
			};
			tweets.push(tweet);
			return tweet;
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
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});
