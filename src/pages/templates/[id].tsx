import type { NextPage } from "next";
import {
  Button,
  Center,
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
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import BackButton from "../../components/buttons/back-button";
import { useFilePicker } from "use-file-picker";
import { useMemo, useRef, useState } from "react";
import type { Configuration } from "@prisma/client";
import ReactTimeAgo from "react-time-ago";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../../components/loading";
import Link from "next/link";
import GradientAvatar from "../../components/avatars/gradient-avatar";
import { MdSettings } from "react-icons/md";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import type { FocusableElement } from "@chakra-ui/utils";
import ConfirmationDialog from "../../components/dialogs/confirmation-dialog";
import AddConfigurationDialog from "../../components/dialogs/add-configuration-dialog";
import EditDialog from "../../components/dialogs/edit-dialog";

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

  const { mutate: updateConfiguration } = api.configuration.update.useMutation({
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
      ?.filter(
        (configuration) =>
          showValid === null || configuration.valid === showValid
      )
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

  function createBlankConfiguration(name: string) {
    if (template) {
      addConfiguration({
        templateId: template.id,
        name: name,
      });
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

  const handleEdit = (
    configurationId: string,
    name: string,
    content?: string
  ) => {
    updateConfiguration({
      id: configurationId,
      name: name,
      content: content,
    });
  };

  if (isLoadingConfigurations || isLoadingTemplate) {
    return <Loading />;
  }

  return (
    <>
      <Flex direction={"column"} minH={"100%"}>
        <Box>
          <BackButton href={"/templates"} />
        </Box>
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
            <Menu>
              <MenuButton
                as={Button}
                variant={"outline"}
                borderColor={"whiteAlpha.400"}
                aria-label={"Filter configurations"}
                leftIcon={<Icon as={HiAdjustmentsHorizontal} fontSize={"xl"} />}
                sx={{
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <Text>Filter</Text>
                <Box
                  top={-0.5}
                  right={-0.5}
                  bg={"whiteAlpha.800"}
                  borderRadius={"50%"}
                  height={1}
                  width={1}
                  sx={{
                    display: showValid !== null ? "block" : "none",
                    position: "absolute",
                  }}
                />
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
        </VStack>
        {filteredConfigurations?.length === 0 ? (
          <Center flexGrow={2} width={"full"}>
            <Text>
              {`No configurations to display${
                showValid !== null ? " with the selected filter" : ""
              }`}
            </Text>
          </Center>
        ) : (
          <>
            <Spacer py={4} flexGrow={0} />
            <Box width={"full"}>
              <Card>
                <Stack divider={<StackDivider />} spacing={0}>
                  {filteredConfigurations?.map((configuration, idx) => (
                    <ConfigurationListItem
                      key={idx}
                      configuration={configuration}
                      handleDelete={() => handleDelete(configuration.id)}
                      onEdit={(name) => handleEdit(configuration.id, name)}
                    />
                  ))}
                </Stack>
              </Card>
            </Box>
          </>
        )}
        <AddConfigurationDialog
          isOpen={isOpen}
          onClose={onClose}
          openFileSelector={handleAdd}
          clearFileSelection={clear}
          fileContent={filesContent}
          uploadFile={uploadFile}
          createNew={createBlankConfiguration}
          configurations={sortedConfigurations || []}
          cloneConfiguration={handleClone}
        />
      </Flex>
    </>
  );
};

export default TemplatePage;

const ConfigurationListItem = ({
  configuration,
  handleDelete,
  onEdit,
}: {
  configuration: Configuration;
  handleDelete: () => void;
  onEdit: (name: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: renameIsOpen,
    onOpen: renameOnOpen,
    onClose: renameOnClose,
  } = useDisclosure();

  const cancelRef = useRef<FocusableElement | null>(null);

  const { data, refetch: fetch } = api.configuration.download.useQuery(
    {
      id: configuration.id,
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  function downloadConfiguration(fetchedData?: typeof data) {
    try {
      if (!fetchedData) {
        console.log("No data to download");
        return;
      }

      // Convert the Buffer to a Uint8Array
      const uint8Array = Uint8Array.from(atob(fetchedData.base64), (c) =>
        c.charCodeAt(0)
      );

      // Create a Blob from the Uint8Array
      const blob = new Blob([uint8Array], { type: "application/json" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fetchedData.fileName;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading configuration:", error);
    }
  }

  function handleDownload() {
    fetch()
      .then(({ data: fetchedData }) => {
        downloadConfiguration(fetchedData);
      })
      .catch((error) => {
        console.error("Error downloading configuration:", error);
      });
  }

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
          <Menu isLazy>
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
              <MenuItem onClick={renameOnOpen}>Edit</MenuItem>
              <MenuItem onClick={onOpen}>Delete</MenuItem>
              <MenuItem onClick={handleDownload}>Download</MenuItem>
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
      <EditDialog
        name={configuration.name}
        onSave={onEdit}
        isOpen={renameIsOpen}
        onClose={renameOnClose}
        type={"configuration"}
      ></EditDialog>
    </>
  );
};
