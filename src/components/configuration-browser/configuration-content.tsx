import { HStack, Icon, Stack, Tag, Text } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { range } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { generateColor } from "../../utils/colorUtils";
import {
  useConfiguration,
  useConfigurationRouter,
} from "./configuration-provider";

export default function ConfigurationContent() {
  const { content } = useConfiguration();
  const router = useConfigurationRouter();
  const [offsetX, setOffsetX] = useState(0);

  const [sections, setSections] = useState<number>(2);

  useEffect(() => {
    if (content.length <= sections) {
      setOffsetX(0);
    } else {
      setOffsetX((content.length - sections) * -(100 / sections));
    }
  }, [content]);

  const filteredContent = useMemo(() => {
    return [...(content.length === 1 ? [...content, {}] : content)];
  }, [content]);

  return (
    <>
      <Stack
        transform={`translateX(${offsetX}%)`}
        transition={"all 0.3s ease-in-out"}
        direction={"row"}
        spacing={0}
        flex={1}
      >
        {filteredContent.map((item, idx) => (
          <Stack
            transform={`translateX(${idx * 100}%)`}
            key={idx}
            py={2}
            width={`${100 / sections}%`}
            height={"100%"}
            spacing={2}
            position={"absolute"}
            borderRight={filteredContent.length - 1 === idx ? 0 : "1px solid"}
            borderColor={"whiteAlpha.400"}
            overflowY={"auto"}
          >
            {Object.entries(item || {}).map(([key, val], idx2) => (
              <ConfigurationField
                onClick={() => router.push(key)}
                key={idx2}
                name={key}
                active={router.path[idx] === key}
                value={val as Prisma.JsonObject}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </>
  );
}

interface ConfigurationFieldProps {
  name: string;
  value?: Prisma.JsonValue;
  active?: boolean;
  onClick?: () => void;
}

function ConfigurationField(props: ConfigurationFieldProps) {
  const { name, value } = props;

  const valueType = useMemo(() => {
    if (Array.isArray(props.value)) {
      return "array";
    }
    return typeof props.value;
  }, [props]);

  const valueColor = useMemo(() => {
    if (typeof props.value === "string") {
      return "#a5d6ff";
    } else if (typeof props.value === "boolean") {
      return "#ff7b72";
    } else if (typeof props.value === "number") {
      return "#79c0ff";
    }
    return "#fff";
  }, [props]);

  const valueCount = useMemo(() => {
    if (Array.isArray(props.value)) {
      return props.value.length;
    } else if (props.value && typeof props.value === "object") {
      return Object.values(props.value).length;
    }
    return undefined;
  }, [props]);

  const isClickable = ["object", "array"].includes(valueType);

  return (
    <>
      <Stack
        fontFamily={"Consolas, monaco, monospace"}
        onClick={isClickable ? props.onClick : undefined}
        p={2}
        px={4}
        sx={{
          "&:hover": { bg: isClickable ? "gray.700" : "default" },
          bg: props.active ? "gray.700" : "default",
        }}
        direction={"row"}
        alignItems={"center"}
        cursor={isClickable ? "pointer" : "default"}
        justifyContent={"space-between"}
      >
        <HStack spacing={0} direction={"row"}>
          <Text color={"#79c0ff"} fontWeight={"bold"}>
            {`"${name}"`}
          </Text>
          <Text pr={2}>{": "}</Text>
          {value ? (
            <HStack>
              <Text color={valueColor}>
                {valueType === "array" && "[]"}
                {valueType === "object" && "{}"}
                {!isClickable && value.toString()}
                {/* <Tag bg={color}>{valueType}</Tag> */}
              </Text>
              <Text color={"whiteAlpha.600"}>
                {valueCount && ` (${valueCount})`}
              </Text>
            </HStack>
          ) : (
            <Text color={"#ff7b72"}>
              null
              {/* <Tag>{valueType}</Tag> */}
            </Text>
          )}
        </HStack>
        {isClickable && <Icon as={MdArrowRight} fontSize={"xl"} />}
      </Stack>
    </>
  );
}
