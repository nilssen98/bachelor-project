import type { StackProps } from "@chakra-ui/react";
import { Button, Divider, HStack, Stack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "./logo";
import GradientAvatar from "./avatars/gradient-avatar";

type Props = StackProps;

export default function Navbar(props: Props) {
  const { data: session, status } = useSession();

  return (
    <>
      <VStack as={"nav"} spacing={0} {...props}>
        <HStack justify={"space-between"} flex={1} px={4} w={"full"}>
          <Stack>
            <Logo clickable fontSize={"xl"} logoHeight={36} spacing={2} />
          </Stack>
          <Stack flex={1}>{props.children}</Stack>
          {status === "authenticated" ? (
            <Link passHref href={"/profile/general"}>
              <GradientAvatar
                id={session?.user?.id}
                clickable
                sx={{
                  height: "36px",
                  width: "36px",
                }}
              />
            </Link>
          ) : (
            <Link passHref href={"/auth/signin"}>
              <Button variant={"ghost"}>Login</Button>
            </Link>
          )}
        </HStack>
        <Divider bg={"whiteAlpha.100"} />
      </VStack>
    </>
  );
}
