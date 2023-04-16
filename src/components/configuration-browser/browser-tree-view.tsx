import type { StackProps } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useBrowserContent } from "./hooks/useBrowserContent";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

export default function BrowserTreeView(props: StackProps) {
  const { configuration } = useBrowserContent();

  return (
    <Stack width={"full"} height={"full"} {...props}>
      <DynamicReactJson
        theme={"chalk"}
        enableClipboard={false}
        name={configuration.name}
        style={{ padding: 16, backgroundColor: "#0A0A0A", height: "100%" }}
        src={(configuration.content as object) || {}}
      />
    </Stack>
  );
}
