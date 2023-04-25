import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { useFilePicker } from "use-file-picker";
import Loading from "../../components/loading";
import TemplateCard from "../../components/cards/template-card";
import { api } from "../../utils/api";
import AddTemplateDialog from "../../components/dialogs/add-template-dialog";

const TemplatesPage: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const finalRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const { mutate: updateTemplate } = api.template.update.useMutation({
    onSuccess: () => refetch(),
  });

  const filtered = useMemo(() => {
    return (
      templates?.filter(
        (template) =>
          template.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      ) || []
    );
  }, [templates, search]);

  const router = useRouter();

  const handleAdd = () => {
    openFileSelector();
  };

  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: ".json",
    multiple: false,
  });

  function uploadFile(name = filesContent[0]?.name.split(".")[0] || "") {
    if (filesContent.length > 0) {
      const file = filesContent[0];
      if (file) {
        addTemplate({
          name: name,
          content: file.content,
        });
      }
    }
  }

  const handleDelete = (templateId: string) => {
    deleteTemplate({ id: templateId });
  };

  const handleEdit = (templateId: string, name: string, content?: string) => {
    updateTemplate({
      id: templateId,
      name: name,
      content: content,
    });
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
          <Button variant={"custom"} isLoading={isOpen} onClick={onOpen}>
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
                id={template.id}
                name={template.name}
                files={template._count.configurations}
                lastModified={template.updatedAt}
                onClick={() => void handleCardClick(template.id)}
                onDelete={() => handleDelete(template.id)}
                onEdit={(name) => {
                  handleEdit(
                    template.id,
                    name,
                    filesContent[0] ? filesContent[0].content : undefined
                  );
                }}
                openFileSelector={handleAdd}
                fileContent={filesContent}
                clearFileSelection={clear}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>
      <AddTemplateDialog
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        openFileSelector={handleAdd}
        uploadFile={uploadFile}
        fileContent={filesContent}
        clearFileSelection={clear}
      />
    </>
  );
};

export default TemplatesPage;
