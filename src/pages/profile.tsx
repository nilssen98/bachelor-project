import type { NextPage } from "next";
import { Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Text>Profile page</Text>
      <Button onClick={() => void signOut()}>Sign out</Button>
    </>
  );
};

export default ProfilePage;
