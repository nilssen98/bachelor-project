import { Flex, Link, Stack } from "@chakra-ui/react";
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
        <Stack
          width={200}
          direction={"column"}
          alignItems={"flex-start"}
          spacing={6}
          py={8}
        >
          <Link onClick={() => void router.push("/profile/general")}>
            General
          </Link>
          <Link onClick={() => void router.push("/profile/connections")}>
            Connections
          </Link>
        </Stack>
        <Flex direction={"column"}>{children}</Flex>
      </Flex>
    </>
  );
}
