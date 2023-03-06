import { type NextPage } from "next";
import {
  Button,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  Stack,
  StackDivider,
  Card,
  Box,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import BackButton from "../../components/back-button";
import { useFilePicker } from "use-file-picker";
import { useEffect, useMemo, useRef } from "react";
import type { Configuration } from "@prisma/client";
import ConfigurationSwitcher from "../../components/configuration-switcher";
import ReactTimeAgo from "react-time-ago";
import { IoMdCog, IoMdSettings } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../../components/loading";
import Link from "next/link";
import GradientAvatar from "../../components/gradient-avatar";
import { IoCogOutline } from "react-icons/io5";
import { MdOutlineSettings, MdSettings } from "react-icons/md";
import ValidationIcon from "../../components/validation-icon";
import ConfirmationDialog from "../../components/confirmation-dialog";
import { useDisclosure } from "@chakra-ui/react-use-disclosure";
import { FocusableElement } from "@chakra-ui/utils";

const TemplatePage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: ".json",
    multiple: false,
  });

  useEffect(() => {
    if (filesContent.length > 0) {
      const file = filesContent[0];
      if (template && file) {
        addConfiguration({
          templateId: template.id,
          name: file.name.split(".json")[0] || file.name,
          content: file.content,
        });
      }
    }
  }, [filesContent]);

  const { data: template, isLoading: isLoadingTemplate } =
    api.template.get.useQuery(
      { id },
      {
        enabled: id !== undefined,
      }
    );

  const {
    data: configurations,
    isLoading: isLoadingConfigurations,
    refetch,
  } = api.configuration.getAll.useQuery(
    { templateId: template?.id || "" },
    {
      enabled: template?.id !== undefined,
    }
  );

  const { mutate: addConfiguration } = api.configuration.add.useMutation({
    onSuccess: () => refetch(),
  });

  const { mutate: deleteConfiguration } = api.configuration.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const sortedConfigurations = useMemo(() => {
    return configurations?.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [configurations]);

  const handleAdd = () => {
    openFileSelector();
  };

  const handleCardClick = async (configurationId: string) => {
    await router.push(`/configurations/${configurationId}`);
  };

  const handleDelete = (configurationId: string) => {
    deleteConfiguration({ id: configurationId });
  };

  const handleEdit = () => {
    return;
  };

  if (isLoadingConfigurations || isLoadingTemplate) {
    return <Loading />;
  }

  return (
    <>
      <BackButton />
      <HStack pt={4} spacing={4} pb={12} align={"center"}>
        <GradientAvatar
          w={12}
          h={12}
          id={template?.name}
          // icon={<Icon boxSize={7} as={HiDocumentText} />}
        />
        <Heading>{template?.name}</Heading>
      </HStack>
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <HStack width={"full"}>
          <Button onClick={handleAdd} variant={"custom"}>
            Add configuration
          </Button>
          <Input placeholder={"Search"} />
        </HStack>
        <Box width={"full"}>
          <Card>
            <Stack divider={<StackDivider />} spacing={0}>
              {sortedConfigurations?.map((configuration, idx) => (
                <ConfigurationListItem
                  key={idx}
                  configuration={configuration}
                  handleDelete={() => handleDelete(configuration.id)}
                />
              ))}
            </Stack>
          </Card>
        </Box>
      </VStack>
    </>
  );
};

export default TemplatePage;

const ConfigurationListItem = ({
  configuration,
  handleDelete,
}: {
  configuration: Configuration;
  handleDelete: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef<FocusableElement | null>(null);

  return (
    <>
      <HStack spacing={8} p={4} width={"full"}>
        <Stack flex={1} align={"start"}>
          <Link passHref href={`/configurations/${configuration.id}`}>
            <HStack>
              <Icon as={MdSettings} boxSize={5} />
              <Text>{configuration.name}</Text>
            </HStack>
          </Link>
        </Stack>
        <Stack flex={1} align={"start"} color={"whiteAlpha.600"}>
          <Text>
            <ValidationIcon
              validated={configuration.valid}
              includeText={true}
            />
          </Text>
        </Stack>
        <HStack flex={1} justify={"end"}>
          {configuration.updatedAt && (
            <Text color={"whiteAlpha.600"}>
              created <ReactTimeAgo date={configuration.updatedAt} />
            </Text>
          )}
          <Menu>
            <MenuButton
              color={"whiteAlpha.600"}
              background={"none"}
              as={IconButton}
              onClick={(e) => {
                e.stopPropagation();
              }}
              icon={<Icon boxSize={7} as={BiDotsVerticalRounded} />}
            />
            <MenuList
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={onOpen}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <ConfirmationDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmation={() => {
          handleDelete();
          onClose();
        }}
        title={"Delete configuration?"}
        body={`Are you sure you want to delete configuration ${configuration.name}? You can't undo this action afterwards.`}
      />
    </>
  );
};
