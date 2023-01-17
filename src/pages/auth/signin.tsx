import {
  Button,
  Text,
  Card,
  CardBody,
  Center,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "../../components/logo";

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

  const {
    query: { callbackUrl },
  } = useRouter();

  return (
    <Center minH={"100vh"}>
      <VStack spacing={8}>
        <Logo />
        <Card width={"xs"}>
          <CardBody>
            <Stack spacing={6}>
              <Center fontSize={"3xl"}>
                <Text>Sign in</Text>
              </Center>
              <Stack spacing={4}>
                {Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
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
