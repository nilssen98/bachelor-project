import type { ReactElement } from "react";
import { Button, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";

const GeneralPage: NextPageWithLayout = () => {
  const session = useSession();

  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        General page!
      </Text>
      <Text fontSize={"xl"}>
        {`Email: ${session.data?.user?.email || "No email"}`}
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
