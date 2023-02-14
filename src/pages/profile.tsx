import type { NextPage } from "next";
import { Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        Account Settings
      </Text>
      <Button leftIcon={<MdLogout />} onClick={() => void signOut()}>
        Sign out
      </Button>
    </>
  );
};

export default ProfilePage;
