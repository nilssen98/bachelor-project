import { type NextPage } from "next";
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import ConfigurationCard from "../../components/configuration-card";
import Loading from "../../components/loading";
import BackButton from "../../components/back-button";
import { useFilePicker } from "use-file-picker";
import { useEffect } from "react";
import type { Prisma } from "@prisma/client";

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
          name: file.name.split(".json")[0],
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

  if (isLoadingConfigurations || isLoadingTemplate) {
    return <Loading />;
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

  return (
    <>
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <BackButton />
        <Text fontSize={"4xl"}>{`Templates / ${
          template?.name as string
        }`}</Text>
        <HStack width={"full"}>
          <Button onClick={handleAdd}>Add new</Button>
          <Input placeholder={"Search"} />
        </HStack>
        <Grid w={"full"} templateColumns="repeat(3, 1fr)" gap={4}>
          {configurations?.map((configuration, idx) => (
            <GridItem w={"100%"} key={idx}>
              <ConfigurationCard
                name={configuration.name}
                validated={false}
                lastModified={configuration.updatedAt}
                onClick={() => void handleCardClick(configuration.id)}
                onDelete={() => handleDelete(configuration.id)}
                onEdit={handleEdit}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </>
  );
};

export default TemplatePage;
