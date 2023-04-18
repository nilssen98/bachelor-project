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
import { MdDelete, MdLogout } from "react-icons/md";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profile-sidebar-layout";
import GradientAvatar from "../../components/gradient-avatar";
import { api } from "../../utils/api";
import ConfirmationDialog from "../../components/confirmation-dialog";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react-use-disclosure";
import type { FocusableElement } from "@chakra-ui/utils";

const GeneralPage: NextPageWithLayout = () => {
  const session = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef<FocusableElement | null>(null);

  const { mutate: deleteAccount } = api.me.delete.useMutation({
    onSuccess: () => signOut(),
  });

  return (
    <>
      <Text fontSize={"3xl"} my={4}>
        General
      </Text>
      <VStack spacing={4}>
        <Card width={"full"}>
          <HStack p={4}>
            <GradientAvatar
              id={session.data?.user?.id}
              sx={{
                height: "52px",
                width: "52px",
              }}
            />
            <Text fontSize={"2xl"} flex={1}>
              {session.data?.user?.email || "No email"}
            </Text>
            <Button
              variant={"text"}
              color={"red.300"}
              justifySelf={"flex-end"}
              _hover={{ color: "red.400", bg: "red.900" }}
              onClick={() => void signOut()}
              leftIcon={<MdLogout />}
            >
              Sign out
            </Button>
          </HStack>
        </Card>
        <Card width={"full"}>
          <Stack spacing={0} divider={<StackDivider />}>
            <Heading size={"md"} p={4}>
              Delete account
            </Heading>
            <Text p={4}>
              Permanently remove your account and all of its contents. This
              action is not reversible, please continue with caution.
            </Text>
            <Button
              variant={"outline"}
              alignSelf={"end"}
              borderColor={"red.300"}
              m={4}
              color={"red.300"}
              onClick={onOpen}
              leftIcon={<MdDelete />}
            >
              Delete
            </Button>
          </Stack>
        </Card>
      </VStack>
      <ConfirmationDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmation={() => {
          deleteAccount();
          onClose();
        }}
        title={"Delete account?"}
        body={"Are you sure? You can't undo this action afterwards."}
      />
    </>
  );
};

GeneralPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default GeneralPage;
