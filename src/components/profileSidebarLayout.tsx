import { Button, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";

export default function ProfileSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <Flex direction={"row"}>
        <Flex width={200} direction={"column"} alignItems={"flex-start"}>
          <Button onClick={() => void router.push("/profile/general")}>
            General
          </Button>
          <Button onClick={() => void router.push("/profile/connections")}>
            Connections
          </Button>
        </Flex>
        <Flex direction={"column"}>{children}</Flex>
      </Flex>
    </>
  );
}
