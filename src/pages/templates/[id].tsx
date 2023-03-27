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
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import BackButton from "../../components/back-button";
import { useFilePicker } from "use-file-picker";
import { useMemo, useState } from "react";
import type { Configuration } from "@prisma/client";
import ReactTimeAgo from "react-time-ago";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../../components/loading";
import Link from "next/link";
import GradientAvatar from "../../components/gradient-avatar";
import { MdSettings } from "react-icons/md";
import AddConfigurationDialog from "../../components/add-configuration-dialog";

const TemplatePage: NextPage = () => {
  const [search, setSearch] = useState<string>("");

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
    return sortedConfigurations?.filter(
      (configuration) =>
        configuration.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }, [sortedConfigurations, search]);

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
        </HStack>
        <Box width={"full"}>
          <Card>
            <Stack divider={<StackDivider />} spacing={0}>
              {filteredConfigurations?.map((configuration, idx) => (
                <ConfigurationListItem
                  key={idx}
                  configuration={configuration}
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
}: {
  configuration: Configuration;
}) => {
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
              <MenuItem onClick={() => void {}}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </>
  );
};
