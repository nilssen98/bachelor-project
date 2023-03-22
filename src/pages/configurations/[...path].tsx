import { Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ConfigurationBrowser from "../../components/configuration-browser";
import { ConfigurationProvider } from "../../components/configuration-browser/configuration-provider";
import Loading from "../../components/loading";
import { api } from "../../utils/api";
import ConfigurationNavigator from "../../components/config-navigator";
import CustomBreadcrumb from "../../components/custom-breadcrumb";
import BackButton from "../../components/back-button";
import { MdSettings } from "react-icons/md";

const ConfigurationPage: NextPage = () => {
  const router = useRouter();

  const id = useMemo(() => {
    return router.query.path?.[0] || "";
  }, [router]);

  const path = useMemo(() => {
    return (router.query.path as string[] | undefined)?.slice(1);
  }, [router]);

  const { data: configuration, isLoading: isLoadingConfiguration } =
    api.configuration.get.useQuery(
      { id },
      {
        enabled: id !== undefined,
      }
    );

  const { data: template, isLoading: isLoadingTemplate } =
    api.template.get.useQuery(
      { id: configuration?.templateId || "" },
      {
        enabled: configuration?.templateId !== undefined,
      }
    );

  const handlePathChange = async (path: string[]) => {
    if (configuration) {
      await router.push(
        `/configurations/${configuration.id}/${path.join("/")}`
      );
    }
  };

  if (isLoadingConfiguration || isLoadingTemplate) {
    return <Loading />;
  }

  if (!configuration) {
    return <Text>No configuration found</Text>;
  }

  return (
    <>
      <VStack pb={6} spacing={4} align={"start"}>
        <BackButton />
        {/* <Icon mt={1} as={MdSettings} boxSize={12} /> */}
        <Heading>{configuration?.name}</Heading>
      </VStack>
      <ConfigurationNavigator
        configId={configuration.id}
        templateId={configuration.templateId || ""}
      />
      <ConfigurationProvider
        configuration={configuration.content as Prisma.JsonObject}
        schema={template?.content as Prisma.JsonObject}
        onPathChange={(path) => void handlePathChange(path)}
        routerPath={path}
      >
        <ConfigurationBrowser />
      </ConfigurationProvider>
    </>
  );
};

export default ConfigurationPage;
