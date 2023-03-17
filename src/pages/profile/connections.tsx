import { useMemo, useRef } from "react";
import type { ReactElement } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { getProviders, signOut } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profile-sidebar-layout";
import Loading from "../../components/loading";
import { signIn } from "next-auth/react";
import ConnectionCard from "../../components/connection-card";
import ProviderIcon from "../../components/provider-icon";
import { MdLogout } from "react-icons/md";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

interface PageProps {
  providers: ReturnType<typeof getProviders>;
}

const ConnectionPage: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const initialFocusRef = useRef(null);

  const { data: me, isLoading: isLoadingMe } = api.me.get.useQuery();

  const { mutate: unlink } = api.me.unlink.useMutation({
    onSuccess: () => api.useContext().me.invalidate(),
  });

  const connections: Set<string> = useMemo(() => {
    const connections = new Set<string>();
    me?.accounts.forEach((account) => connections.add(account.provider));
    if (me?.emailVerified) {
      connections.add("email");
    }
    return connections;
  }, [me]);

  const providers: string[] = useMemo(() => {
    return Object.values(props.providers)
      .filter(
        (provider: ClientSafeProvider) =>
          me?.emailVerified || provider.name.toLowerCase() !== "email"
      )
      .map((provider: ClientSafeProvider) => provider.name);
  }, [me, props.providers]);

  const handleDisconnect = (provider: string) =>
    unlink({ provider: provider.toLowerCase() });

  function isProviderDisabled(provider: string) {
    return connections.has(provider.toLowerCase());
  }

  if (isLoadingMe) {
    return <Loading />;
  }

  return (
    <>
      <Text fontSize={"3xl"} my={4}>
        Connections
      </Text>
      <VStack alignItems={"flex-start"} spacing={8}>
        <Card w={"full"}>
          <CardBody w={"full"}>
            <VStack spacing={4} align={"start"}>
              <Text fontSize={"xl"}>Add new</Text>
              <Divider />
              <HStack spacing={4}>
                {!connections.has("email") && (
                  <Popover
                    initialFocusRef={initialFocusRef}
                    placement={"bottom"}
                    closeOnBlur={true}
                  >
                    <PopoverTrigger>
                      <Button leftIcon={<ProviderIcon provider={"email"} />}>
                        Email
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverHeader pt={4} fontWeight={"bold"} border={"0"}>
                        Setup Email
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        To setup email, sign out and then sign in with your
                        email. Accounts with the same email will be merged.
                      </PopoverBody>
                      <PopoverFooter
                        border={"0"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        pb={4}
                      >
                        <Button
                          variant={"text"}
                          colorScheme={"red"}
                          leftIcon={<Icon as={MdLogout} />}
                          onClick={() => {
                            void signOut();
                          }}
                        >
                          Sign out
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                )}
                {providers.map((provider) => (
                  <Tooltip
                    key={provider}
                    hasArrow
                    label={
                      isProviderDisabled(provider)
                        ? `Already connected to ${provider}`
                        : `Connect with ${provider}`
                    }
                  >
                    <Button
                      isDisabled={isProviderDisabled(provider)}
                      onClick={() => {
                        void signIn(provider.toLowerCase());
                      }}
                      leftIcon={<ProviderIcon provider={provider} />}
                    >
                      {provider}
                    </Button>
                  </Tooltip>
                ))}
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        <Box width={"full"}>
          {/* <Text fontSize={"2xl"} pb={2}>
            Current Connections
          </Text> */}
          <VStack alignItems={"flex-start"} spacing={2}>
            {[...connections].map((provider) => (
              <ConnectionCard
                key={provider}
                provider={provider}
                disabled={provider.toLowerCase() === "email"}
                onDisconnect={(provider) => void handleDisconnect(provider)}
              />
            ))}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

ConnectionPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default ConnectionPage;
