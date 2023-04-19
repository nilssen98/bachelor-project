import { Center, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { template } from "lodash-es";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import BackButton from "../../components/buttons/back-button";
import ConfigurationBrowser from "../../components/configuration-browser";
import { ConfigurationProvider } from "../../components/configuration-browser/utils/browser-provider";
import GradientAvatar from "../../components/avatars/gradient-avatar";
import Loading from "../../components/loading";
import Navbar from "../../components/navbar";
import { navbarHeight } from "../../theme";
import { api } from "../../utils/api";

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
        refetchOnWindowFocus: false,
      }
    );

  const { data: configurations, isLoading: isLoadingConfigurations } =
    api.configuration.getAll.useQuery(
      { templateId: configuration?.Template?.id },
      {
        enabled: configuration?.Template?.id !== undefined,
        refetchOnWindowFocus: false,
      }
    );

  const filteredConfigurations = useMemo(() => {
    return configurations
      ?.filter((c) => c.templateId === configuration?.Template?.id)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }, [configuration, configurations]);

  const path = useMemo(() => {
    return (router.query.path as string[] | undefined)?.slice(1);
  }, [router]);

  useEffect(() => {
    if (initialPath.length === 0 && path) {
      setInitialPath(path);
    }
  }, [path]);

  const handlePathChange = (newPath: string[]) => {
    if (path?.toString() !== newPath.toString() && newPath.length !== 0) {
      void router.push(`/configurations/${id}/${newPath.join("/")}`);
    }
  };

  if (isLoadingConfiguration || isLoadingConfigurations) {
    return (
      <Center w={"full"}>
        <Loading />
      </Center>
    );
  }

  if (!configuration) {
    return <Text>No configuration found</Text>;
  }

  return (
    <>
      <Stack spacing={0} minH={`calc(100vh - ${navbarHeight})`} flex={1}>
        <Navbar bg={"whiteAlpha.200"} maxH={navbarHeight} h={"full"}>
          <HStack spacing={6} w={"full"} px={4}>
            <Text
              color={"whiteAlpha.600"}
              fontWeight={"thin"}
              fontSize={"xx-large"}
            >
              /
            </Text>
            <Link
              href={`/templates/${configuration.Template?.id || ""}`}
              passHref
            >
              <HStack w={"100%"} cursor={"pointer"}>
                <GradientAvatar
                  clickable
                  w={7}
                  h={7}
                  id={configuration.Template?.name}
                />
                <Heading size={"md"} fontWeight={"semi-bold"}>
                  {configuration.Template?.name}
                </Heading>
              </HStack>
            </Link>
          </HStack>
        </Navbar>
        {configuration && configuration.Template && (
          <ConfigurationProvider
            configuration={configuration || {}}
            configurations={filteredConfigurations || []}
            template={configuration.Template}
            errors={configuration.errors}
            onPathChange={(path) => void handlePathChange(path)}
            path={path}
          >
            <ConfigurationBrowser />
          </ConfigurationProvider>
        )}
      </Stack>
    </>
  );
};

export default ConfigurationPage;
