import { useMemo } from "react";
import { Avatar, Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { generateColor } from "../utils/colorUtils";
import Logo from "./logo";

interface Props {
  height: number;
}

export default function Navbar(props: Props) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const navigateLogin = () => void router.push("/auth/signin");
  const navigateProfile = () => void router.push("/profile/general");

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
        <Logo clickable fontSize={"1xl"} logoHeight={32} spacing={1.5} />
        {status === "authenticated" ? (
          <Avatar
            size={"sm"}
            bg={bgColor}
            onClick={navigateProfile}
            src={session?.user?.image || undefined}
            sx={{
              cursor: "pointer",
            }}
          />
        ) : (
          <Button variant={"ghost"} onClick={navigateLogin}>
            Login
          </Button>
        )}
      </HStack>
    </>
  );
}
