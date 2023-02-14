import { Text } from "@chakra-ui/react";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";

function ConnectionPage() {
  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        Connections page!
      </Text>
    </>
  );
}

ConnectionPage.PageLayout = ProfileSidebarLayout;

export default ConnectionPage;
