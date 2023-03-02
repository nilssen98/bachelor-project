import { Button, Divider, HStack, Stack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "./logo";
import UserAvatar from "./user-avatar";

interface Props {
  height: number;
}

export default function Navbar(props: Props) {
  const { data: session, status } = useSession();

  return (
    <>
      <VStack as={"nav"} spacing={0} h={`${props.height}px`}>
        <HStack justify={"space-between"} flex={1} px={4} w={"full"}>
          <Logo clickable fontSize={"xl"} logoHeight={36} spacing={2} />
          {status === "authenticated" ? (
            <Link passHref href={"/profile/general"}>
              <UserAvatar
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
        <Divider />
      </VStack>
    </>
  );
}
