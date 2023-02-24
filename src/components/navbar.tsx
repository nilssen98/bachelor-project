import { useMemo } from "react";
import { Avatar, Box, Button, Flex, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { generateColor } from "../utils/colorUtils";
import Logo from "./logo";

interface Props {
  height: number;
}

export default function Navbar(props: Props) {
  const { data: session, status } = useSession();

  const bgColor = useMemo<string>(
    () => generateColor(session?.user?.email || ""),
    [session]
  );

  return (
    <>
      <Stack px={4} align={"center"} as={"nav"} h={`${props.height}px`}>
        <HStack
          height={"100%"}
          justify={"space-between"}
          maxW={"5xl"}
          w={"full"}
        >
          <Logo clickable fontSize={"xl"} logoHeight={36} spacing={2} />
          {status === "authenticated" ? (
            <Link passHref href={"/profile/general"}>
              <Avatar
                bg={bgColor}
                src={session?.user?.image || undefined}
                sx={{
                  height: "36px",
                  width: "36px",
                  cursor: "pointer",
                }}
              />
            </Link>
          ) : (
            <Link passHref href={"/auth/signin"}>
              <Button variant={"ghost"}>Login</Button>
            </Link>
          )}
        </HStack>
      </Stack>
    </>
  );
}
