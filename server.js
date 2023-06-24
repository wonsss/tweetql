import { ApolloServer, gql } from "apollo-server";

const tweets = [
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
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});
