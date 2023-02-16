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

const ConfigurationPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

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
    if (template && configurations) {
      addConfiguration({
        templateId: template.id,
        name: `Configuration ${configurations?.length + 1}`,
        status: "",
        content: "",
      });
    }
  };

  const handleCardClick = () => {
    return;
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
        <Text fontSize={"4xl"}>{template?.name as string}</Text>
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
                onClick={handleCardClick}
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

export default ConfigurationPage;
