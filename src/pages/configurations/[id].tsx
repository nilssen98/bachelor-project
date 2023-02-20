import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import { api } from "../../utils/api";

const ConfigurationPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: configuration, isLoading: isLoadingConfiguration } =
    api.configuration.get.useQuery(
      { id },
      {
        enabled: id !== undefined,
      }
    );

  if (isLoadingConfiguration) {
    return <Loading />;
  }

  return (
    <>
      <Text>{configuration?.name}</Text>
    </>
  );
};

export default ConfigurationPage;
