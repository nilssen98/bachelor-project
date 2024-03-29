import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import type { ClientSafeProvider } from "next-auth/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "../../components/logo";
import Loading from "../../components/loading";
import EmailInput from "../../components/inputs/email-input";
import ProviderIcon from "../../components/provider-icon";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

interface PageProps {
  providers: ReturnType<typeof getProviders>;
}

const SignIn: NextPage<PageProps> = (props) => {
  const { providers } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableInputs, setDisableInputs] = useState<boolean>(false);

  const onEnter = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      void handleEmailSignIn();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", onEnter, false);
    return () => {
      window.removeEventListener("keyup", onEnter, false);
    };
  }, [onEnter]);

  const router = useRouter();
  const session = useSession();

  const CALLBACK_URL = "/templates";

  async function handleEmailSignIn() {
    setDisableInputs(true);
    await signIn("email", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: CALLBACK_URL,
    })
      .then(() => {
        // Signed in . . .
      })
      .finally(() => {
        setDisableInputs(false);
      });
  }

  // If the user is already signed in, redirect to home page
  if (session.status === "authenticated") {
    void router.push("/");
  }

  if (session.status === "authenticated") {
    return (
      <Center height={"full"}>
        <VStack spacing={6}>
          <Loading />
          <Text>Already signed in, redirecting...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Center height={"full"}>
      <VStack spacing={8}>
        <Logo logoHeight={56} />
        <Card width={"xs"}>
          <CardBody>
            <Stack spacing={6}>
              <Center fontSize={"3xl"}>
                <Text>Sign in</Text>
              </Center>
              <Stack spacing={4}>
                <EmailInput
                  value={email}
                  verify
                  isDisabled={disableInputs}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/*<PasswordInput
                  value={password}
                  isDisabled={disableInputs}
                  onChange={(e) => setPassword(e.target.value)}
                />*/}
                <Button
                  isDisabled={disableInputs}
                  isLoading={disableInputs}
                  loadingText={"Signing in..."}
                  onClick={() => void handleEmailSignIn()}
                >
                  Sign in
                </Button>
                <HStack alignItems={"center"} justifyContent={"center"}>
                  <Divider />
                  <Text pb={1} userSelect={"none"}>
                    or
                  </Text>
                  <Divider />
                </HStack>
                {Object.values(providers)
                  .filter(
                    (provider: ClientSafeProvider) =>
                      provider.name.toLowerCase() !== "email"
                  )
                  .map((provider: ClientSafeProvider) => (
                    <Button
                      key={provider.name}
                      leftIcon={<ProviderIcon provider={provider.name} />}
                      onClick={() =>
                        void signIn(provider.id, {
                          callbackUrl: CALLBACK_URL,
                        })
                      }
                    >
                      Sign in with {provider.name}
                    </Button>
                  ))}
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
};

export default SignIn;
