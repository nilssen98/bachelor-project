import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Center, Stack, Text, useColorMode } from "@chakra-ui/react";
import AuthShowcase from "../components/auth-showcase";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Configify</title>
      </Head>
      <Center>
        <AuthShowcase />
      </Center>
    </>
  );
};

export default Home;
