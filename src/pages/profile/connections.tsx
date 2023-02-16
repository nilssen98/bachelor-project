import type { ReactElement } from "react";
import { Text } from "@chakra-ui/react";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";

const ConnectionPage: NextPageWithLayout = () => {
  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        Connections page!
      </Text>
    </>
  );
};

ConnectionPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default ConnectionPage;
