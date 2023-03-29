import { Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ConfigurationBrowser from "../../components/configuration-browser";
import { ConfigurationProvider } from "../../components/configuration-browser/configuration-provider";
import Loading from "../../components/loading";
import { api } from "../../utils/api";
import ConfigurationSwitcher from "../../components/configuration-switcher";
import BackButton from "../../components/back-button";

const ConfigurationPage: NextPage = () => {
  const router = useRouter();

  const [initialPath, setInitialPath] = useState<string[]>([]);

  const id = useMemo(() => {
    return router.query.path?.[0] || "";
  }, [router.query.path]);

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

  const path = useMemo(() => {
    return (router.query.path as string[] | undefined)?.slice(1);
  }, [router]);

  useEffect(() => {
    if (initialPath.length === 0 && path) {
      console.log("Setting initial path", path);
      setInitialPath(path);
    }
  }, [path]);

  const handlePathChange = (newPath: string[]) => {
    console.log("Changing the path to:", newPath);
    if (path?.toString() !== newPath.toString()) {
      void router.push(`/configurations/${id}/${newPath.join("/")}`);
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
        <BackButton href={`/templates/${configuration.templateId || ""}`} />
        {/* <Icon mt={1} as={MdSettings} boxSize={12} /> */}
        <Heading>{configuration?.name}</Heading>
      </VStack>
      <ConfigurationSwitcher
        configId={configuration.id}
        templateId={configuration.templateId || ""}
      />
      <ConfigurationProvider
        configuration={configuration.content as Prisma.JsonObject}
        errors={configuration.errors}
        schema={template?.content as Prisma.JsonObject}
        onPathChange={(path) => void handlePathChange(path)}
        initialPath={path}
      >
        <ConfigurationBrowser />
      </ConfigurationProvider>
    </>
  );
};

export default ConfigurationPage;
