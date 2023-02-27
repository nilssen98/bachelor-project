import type { ReactElement } from "react";
import {
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profile-sidebar-layout";
import UserAvatar from "../../components/user-avatar";
import { api } from "../../utils/api";

const GeneralPage: NextPageWithLayout = () => {
  const session = useSession();

  const { mutate: deleteAccount } = api.me.delete.useMutation({
    onSuccess: () => signOut(),
  });

  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        General
      </Text>
      <HStack justifyContent={"space-between"}>
        <HStack spacing={4}>
          <UserAvatar
            sx={{
              height: "100px",
              width: "100px",
            }}
          />
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"3xl"}>
              {session.data?.user?.name || "No name"}
            </Text>
            <Text fontSize={"1xl"}>
              {session.data?.user?.email || "No email"}
            </Text>
          </VStack>
        </HStack>
        <Button
          color={"red.300"}
          _hover={{ color: "red.400", bg: "red.900" }}
          onClick={() => void signOut()}
          leftIcon={<MdLogout />}
        >
          Sign out
        </Button>
      </HStack>
      <Card>
        <Stack divider={<StackDivider />}>
          <Heading size={"md"} p={4}>
            Delete account
          </Heading>
          <Text p={4}>
            Permanently remove your account and all of its contents. This action
            is not reversible, so please continue with caution.
          </Text>
          <Button m={4} color={"red.300"} onClick={() => deleteAccount()}>
            Delete
          </Button>
        </Stack>
      </Card>
    </>
  );
};

GeneralPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default GeneralPage;
