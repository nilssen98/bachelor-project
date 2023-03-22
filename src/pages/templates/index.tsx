import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useFilePicker } from "use-file-picker";
import Loading from "../../components/loading";
import TemplateCard from "../../components/template-card";
import { api } from "../../utils/api";

const TemplatesPage: NextPage = () => {
  const [search, setSearch] = useState<string>("");

  const {
    data: templates,
    refetch,
    isLoading: isLoadingTemplate,
  } = api.template.getAll.useQuery();

  const { mutate: addTemplate, isLoading: isAddingTemplate } =
    api.template.add.useMutation({
      onSuccess: () => refetch(),
    });

  const { mutate: deleteTemplate } = api.template.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const filtered = useMemo(() => {
    let temp = [...(templates || [])];

    temp = temp.filter((template) => {
      return template.name.toLowerCase().includes(search.toLowerCase());
    });

    return temp;
  }, [templates, search]);

  const router = useRouter();

  const handleAdd = () => {
    openFileSelector();
  };

  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: ".json",
    multiple: false,
  });

  useEffect(() => {
    if (filesContent.length > 0) {
      const file = filesContent[0];
      if (file) {
        addTemplate({
          name: file.name.split(".json")[0] || file.name,
          content: file.content,
        });
      }
    }
  }, [filesContent]);

  const handleDelete = (templateId: string) => {
    deleteTemplate({ id: templateId });
  };

  const handleEdit = () => {
    return;
  };

  const handleCardClick = (templateId: string): Promise<boolean> => {
    return router.push(`${router.pathname}/${templateId}`);
  };

  if (isLoadingTemplate) {
    return <Loading />;
  }

  return (
    <>
      <Heading pb={12}>Your templates</Heading>
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <HStack width={"full"}>
          <Button
            variant={"custom"}
            disabled={isAddingTemplate}
            onClick={handleAdd}
          >
            Add template
          </Button>
          <Input
            value={search}
            placeholder={"Search"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </HStack>
        <Grid w={"full"} templateColumns="repeat(3, 1fr)" gap={4}>
          {filtered.map((template, idx) => (
            <GridItem w={"100%"} key={idx}>
              <TemplateCard
                name={template.name}
                files={2}
                lastModified={template.updatedAt}
                onClick={() => void handleCardClick(template.id)}
                onDelete={() => handleDelete(template.id)}
                onEdit={handleEdit}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </>
  );
};

export default TemplatesPage;
