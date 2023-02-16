import { useMemo } from "react";
import { Avatar, HStack } from "@chakra-ui/react";
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
      <HStack
        as={"nav"}
        h={`${props.height}px`}
        p={1}
        maxW={"5xl"}
        justify={"space-between"}
        sx={{
          margin: "0 auto",
        }}
      >
        <Logo fontSize={"1xl"} logoHeight={32} spacing={1.5} />
        <Link href={"/profile/general"}>
          {status === "authenticated" ? (
            <Avatar
              size={"sm"}
              bg={bgColor}
              src={session?.user?.image || undefined}
            />
          ) : (
            <Avatar size={"sm"} />
          )}
        </Link>
      </HStack>
    </>
  );
}
