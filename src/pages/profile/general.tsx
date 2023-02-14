import { Button, Text } from "@chakra-ui/react";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

function GeneralPage() {
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
}

GeneralPage.PageLayout = ProfileSidebarLayout;

export default GeneralPage;
