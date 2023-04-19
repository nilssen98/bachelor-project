import type { ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { ClientSafeProvider } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/layouts/profile-sidebar-layout";
import Loading from "../../components/loading";
import { MdSend } from "react-icons/md";
import ConnectionCard from "../../components/cards/connection-card";
import ProviderIcon from "../../components/provider-icon";
import EmailInput from "../../components/inputs/email-input";

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
  const [email, setEmail] = useState<string>("");
  const [emailSubmitting, setEmailSubmitting] = useState<boolean>(false);

  const initialFocusRef = useRef(null);

  const toast = useToast();
  const toastId = "email-verification-toast";

  const { data: me, isLoading: isLoadingMe, refetch } = api.me.get.useQuery();

  const { mutate: unlink } = api.me.unlink.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    setEmail(me?.email ?? "");
  }, [me]);

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

  function handleEmailSignIn(onClose: () => void) {
    setEmailSubmitting(true);
    signIn("email", {
      email: email,
      redirect: false,
    })
      .then(() => {
        onClose();
        toast({
          id: toastId,
          title: "Email sent!",
          description: "Check your inbox for a verification link.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          id: toastId,
          title: "Failed to send email!",
          description: "Please try again later.",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      })
      .finally(() => {
        setEmailSubmitting(false);
      });
  }

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
                    {({ onClose }) => (
                      <>
                        <PopoverTrigger>
                          <Button
                            leftIcon={<ProviderIcon provider={"email"} />}
                          >
                            Email
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader
                            pt={4}
                            fontWeight={"bold"}
                            border={"0"}
                          >
                            Email connection
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            <VStack alignItems={"flex-start"}>
                              <Text textAlign={"left"} whiteSpace={"pre-line"}>
                                {`Send a verification link to your email address to connect.`}
                              </Text>
                              <EmailInput
                                value={email}
                                isDisabled={emailSubmitting}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </VStack>
                          </PopoverBody>
                          <PopoverFooter
                            border={"0"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                            pb={4}
                          >
                            <Button
                              colorScheme={"blue"}
                              isLoading={emailSubmitting}
                              loadingText={"Sending . . ."}
                              rightIcon={<Icon as={MdSend} />}
                              onClick={() => handleEmailSignIn(onClose)}
                            >
                              Send
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </>
                    )}
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
                connections={connections.size}
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
