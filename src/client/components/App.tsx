import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  HttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import e from "express";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3007", fetch }),
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query getUsers {
    users {
      posts {
        title
        description
      }
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
  const { loading, error, data } = useQuery(GET_USERS);
  const [posts, setPosts] = useState([]);
  console.log(data);
  // useEffect(() => {
  //   if (greeting === "Show Posts") {
  //     setPosts([]);
  //   } else setPosts(data.users.map((user: any) => user.posts));
  // });

  return (
    <>
      {posts.map(({ title, description }) => (
        <>
          <b>{title}</b>
          <p>{description}</p>
        </>
      ))}
    </>
  );
};
