import type { ReactElement } from "react";
import { Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";

const GeneralPage: NextPageWithLayout = () => {
  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        General page!
      </Text>
      <Button onClick={() => void signOut()} leftIcon={<MdLogout />}>
        Sign out
      </Button>
    </>
  );
};

GeneralPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default GeneralPage;
