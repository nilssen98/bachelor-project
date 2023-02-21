import type { ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Flex, Link, Stack } from "@chakra-ui/react";

const pages = ["general", "connections"];

export default function ProfileSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const currentPage = router.pathname.split("/").pop();

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
          {pages.map((page, idx) => (
            <Link
              key={idx}
              as={NextLink}
              fontWeight={page === currentPage ? "bold" : "normal"}
              href={`/profile/${page}`}
              sx={{
                textTransform: "capitalize",
              }}
            >
              {page}
            </Link>
          ))}
        </Stack>
        <Flex direction={"column"}>{children}</Flex>
      </Flex>
    </>
  );
}
