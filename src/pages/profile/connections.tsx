import type { ReactElement } from "react";
import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";

const ConnectionPage: NextPageWithLayout = () => {
  const session = useSession();

  const { data: me, isLoading: isLoadingMe } = api.me.get.useQuery();

  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        Connections page!
      </Text>
      {session.data?.user?.id}
    </>
  );
};

ConnectionPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default ConnectionPage;
