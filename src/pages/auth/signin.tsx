import {
  Button,
  Text,
  Card,
  CardBody,
  Center,
  Stack,
  VStack,
  Divider,
  HStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import type { ClientSafeProvider } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "../../components/logo";
import PasswordInput from "../../components/passwordInput";
import { FaGoogle } from "react-icons/fa";
import EmailInput from "../../components/emailInput";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

interface PageProps {
  providers: ReturnType<typeof getProviders>;
}

function getLogo(provider: ClientSafeProvider): JSX.Element {
  switch (provider.name) {
    case "Google":
      return <FaGoogle />;
    default:
      return <Text>No logo</Text>;
  }
}

const SignIn: NextPage<PageProps> = (props) => {
  const { providers } = props;

  const {
    query: { callbackUrl },
  } = useRouter();

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
                <EmailInput isDisabled />
                <PasswordInput isDisabled />
                <Button isDisabled>Sign in</Button>
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
                      leftIcon={getLogo(provider)}
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: callbackUrl?.toString(),
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
