import type { NextPage } from "next";
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
  useDisclosure,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import BackButton from "../../components/back-button";
import { useFilePicker } from "use-file-picker";
import { useMemo, useRef, useState } from "react";
import type { Configuration } from "@prisma/client";
import ReactTimeAgo from "react-time-ago";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../../components/loading";
import Link from "next/link";
import GradientAvatar from "../../components/gradient-avatar";
import { MdFilterList, MdSettings } from "react-icons/md";
import type { FocusableElement } from "@chakra-ui/utils";
import ConfirmationDialog from "../../components/confirmation-dialog";
import AddConfigurationDialog from "../../components/add-configuration-dialog";

const TemplatePage: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [showValid, setShowValid] = useState<boolean | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const id = router.query.id as string;

  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: ".json",
    multiple: false,
  });

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

  const { mutate: cloneConfiguration } = api.configuration.clone.useMutation({
    onSuccess: () => refetch(),
  });

  const sortedConfigurations = useMemo(() => {
    return configurations?.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [configurations]);

  const filteredConfigurations = useMemo(() => {
    return sortedConfigurations
      ?.filter((configuration) => {
        if (showValid === null) {
          return true;
        }
        return configuration.valid === showValid;
      })
      .filter(
        (configuration) =>
          configuration.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
  }, [sortedConfigurations, showValid, search]);

  function uploadFile(name = filesContent[0]?.name.split(".json")[0] || "") {
    if (filesContent.length > 0) {
      const file = filesContent[0];
      if (template && file) {
        addConfiguration({
          templateId: template.id,
          name: name,
          content: file.content,
        });
      }
    }
  }

  function handleClone(id: string, name: string) {
    if (template) {
      cloneConfiguration({
        id: id,
        name: name,
      });
    }
  }

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
      <BackButton href={"/templates"} />
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
          <Button onClick={onOpen} isLoading={isOpen} variant={"custom"}>
            Add configuration
          </Button>
          <Input
            value={search}
            placeholder={"Search"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              aria-label={"Options"}
              leftIcon={<MdFilterList />}
              variant={"outline"}
              sx={{
                flexShrink: 0,
              }}
            >
              <Text>Filter</Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                title={"Show"}
                defaultValue={"all"}
                type={"radio"}
              >
                <MenuItemOption
                  value={"all"}
                  onClick={() => {
                    setShowValid(null);
                  }}
                >
                  All
                </MenuItemOption>
                <MenuItemOption
                  value={"valid"}
                  onClick={() => {
                    setShowValid(true);
                  }}
                >
                  Valid only
                </MenuItemOption>
                <MenuItemOption
                  value={"invalid"}
                  onClick={() => {
                    setShowValid(false);
                  }}
                >
                  Invalid only
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
        <Box width={"full"}>
          <Card>
            <Stack divider={<StackDivider />} spacing={0}>
              {filteredConfigurations?.map((configuration, idx) => (
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
      <AddConfigurationDialog
        isOpen={isOpen}
        onClose={onClose}
        openFileSelector={handleAdd}
        clearFileSelection={clear}
        fileContent={filesContent}
        uploadFile={uploadFile}
        configurations={sortedConfigurations || []}
        cloneConfiguration={handleClone}
      />
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
            {configuration.valid ? (
              <HStack>
                <Box h={2} w={2} borderRadius={"full"} bg={"green"} />
                <Text>valid</Text>
              </HStack>
            ) : (
              <HStack>
                <Box h={2} w={2} borderRadius={"full"} bg={"red"} />
                <Text>invalid</Text>
              </HStack>
            )}
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
