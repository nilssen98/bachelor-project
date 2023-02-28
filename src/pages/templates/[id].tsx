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
import { useEffect, useMemo } from "react";
import type { Configuration } from "@prisma/client";
import ConfigurationNavigator from "../../components/config-navigator";
import ReactTimeAgo from "react-time-ago";
import { IoMdSettings } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../../components/loading";
import Link from "next/link";

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
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <Heading pt={4} pb={8}>
          {template?.name}
        </Heading>
        <HStack width={"full"}>
          <Button
            onClick={handleAdd}
            bg={"white"}
            px={8}
            color={"black"}
            border={"1px solid white"}
            _hover={{ bg: "black", color: "white" }}
          >
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
}: {
  configuration: Configuration;
}) => {
  return (
    <>
      <HStack spacing={8} p={4} width={"full"}>
        <Stack flex={1} align={"start"}>
          <Link passHref href={`/configurations/${configuration.id}`}>
            <Text>{configuration.name}</Text>
          </Link>
        </Stack>
        <Stack flex={1} align={"start"} color={"gray.500"}>
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
            <Text color={"gray.500"}>
              created <ReactTimeAgo date={configuration.updatedAt} />
            </Text>
          )}
          <Menu>
            <MenuButton
              color={"gray.500"}
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
