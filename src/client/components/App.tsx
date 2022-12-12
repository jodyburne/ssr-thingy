import React, { Fragment, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  HttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3007/graphql", fetch }),
  cache: new InMemoryCache(),
});

const GET_POSTS = gql`
  query getPosts {
    posts {
      title
      id
    }
  }
`;

const App: React.FC = () => {
  const [greeting, setGreeting] = useState("Show Posts");

  const handleClick = () => {
    if (greeting !== "Show Posts") {
      setGreeting("Show Posts");
      return;
    }
    setGreeting("Hide Posts");
  };
  return (
    <ApolloProvider client={client}>
      <button onClick={() => handleClick()}>{greeting}</button>
      <Posts greeting={greeting} />
    </ApolloProvider>
  );
};

export default App;

const Posts = ({ greeting }: { greeting: string }) => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (greeting === "Show Posts") {
      setPosts([]);
    } else setPosts(data.posts);
  }, [greeting]);

  return (
    <>
      {posts.map(({ title, id }) => (
        <Fragment key={id}>
          <p>
            {title}
            <b> #{id}</b>
          </p>
        </Fragment>
      ))}
    </>
  );
};
