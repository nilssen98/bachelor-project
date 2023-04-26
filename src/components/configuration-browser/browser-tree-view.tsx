import type { StackProps } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useBrowserContent } from "./hooks/useBrowserContent";
import { useBrowserController } from "./hooks/useBrowserController";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

export default function BrowserTreeView(props: StackProps) {
  const { configuration, template, updateConfigurationContent } =
    useBrowserContent();
  const { showTreeView, showSchema } = useBrowserController();

  const source = useMemo(() => {
    if (showTreeView) {
      return configuration;
    } else if (showSchema) {
      return template.content;
    }
    return {};
  }, [configuration, template, showTreeView, showSchema]);

  const handleEdit = ({ updated_src }: { updated_src: object }) => {
    updateConfigurationContent(updated_src);
  };

  const handleAdd = ({ updated_src }: { updated_src: object }) => {
    updateConfigurationContent(updated_src);
  };

  return (
    <Stack width={"full"} height={"full"} {...props}>
      <DynamicReactJson
        theme={"chalk"}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        onEdit={showSchema ? false : handleEdit}
        onAdd={showSchema ? false : handleAdd}
        // name={configuration.name}
        style={{ padding: 16, backgroundColor: "#0A0A0A", height: "100%" }}
        src={source as object}
      />
    </Stack>
  );
}
