import type { StackProps } from "@chakra-ui/react";
import { Badge, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { includes } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MdArrowRight,
  MdOutlineError,
  MdOutlineErrorOutline,
} from "react-icons/md";
import { useBrowserContent } from "./hooks/useBrowserContent";
import { useBrowserRouter } from "./hooks/useBrowserRouter";

export default function BrowserContent(props: StackProps) {
  const { content, errors, template } = useBrowserContent();
  const router = useBrowserRouter();

  const [offsetX, setOffsetX] = useState(0);

  const [sections] = useState<number>(2);

  useEffect(() => {
    if (content.length <= sections) {
      setOffsetX(0);
    } else {
      setOffsetX((content.length - sections) * -(100 / sections));
    }
  }, [content, sections]);

  const filteredContent = useMemo(() => {
    return [...(content.length === 1 ? [...content] : content)];
  }, [content]);

  const getContentErrors = useCallback(
    (contentIdx: number, item: Prisma.JsonValue) => {
      // Only get errors for objects and arrays
      // This is because they are the only ones that can have errors that are not bound to a field
      if (!["object", "array"].includes(typeof item)) {
        return;
      }

      const currentPath = router.path.slice(0, contentIdx);

      const contentErrors: string[] = [];

      errors.forEach((error) => {
        const errorPath = error.path.split("/").filter(Boolean);
        if (errorPath.toString() === currentPath.toString()) {
          contentErrors.push(error.message);
        }
      });

      return contentErrors;
    },
    [errors, router.path]
  );

  const getFieldErrors = useCallback(
    (contentIdx: number, item: Prisma.JsonValue) => {
      const currentPath = [...router.path.slice(0, contentIdx), item];
      const fieldErrors: string[] = [];

      errors.forEach((error) => {
        const errorPath = error.path.split("/").filter(Boolean);
        if (errorPath.toString() === currentPath.toString()) {
          fieldErrors.push(error.message);
        }
      });

      return fieldErrors;
    },
    [errors, router.path]
  );

  const getFieldSchemaType = (contentIdx: number, item: Prisma.JsonObject) => {
    // console.log("content", content);
    console.log("schema", template.content);
    console.log("path", router.path);

    // const schemaTypes = content.slice(contentIdx).map((item, idx) => {
    //   if (idx === 0) {
    //     return template.content.properties[item];
    //   }
    // });

    return "";
  };

  const hasRightBorder = (idx: number) => {
    return filteredContent.length === 1 || filteredContent.length - 1 !== idx;
  };

  return (
    <>
      <Stack
        transform={`translateX(${offsetX}%)`}
        transition={"all 0.3s ease-in-out"}
        direction={"row"}
        spacing={0}
        flex={1}
        position={"relative"}
        {...props}
      >
        {filteredContent.map((item, idx) => (
          <Stack
            transform={`translateX(${idx * 100}%)`}
            key={idx}
            py={2}
            width={`calc(${100 / sections}%)`}
            height={"100%"}
            position={"absolute"}
            borderRight={hasRightBorder(idx) ? "1px solid" : 0}
            borderColor={"whiteAlpha.300"}
            spacing={0}
          >
            <HStack>
              {getContentErrors(idx, item)?.map((error, errIdx) => (
                <HStack
                  py={2}
                  px={4}
                  spacing={2}
                  justify={"center"}
                  key={errIdx}
                >
                  <Icon as={MdOutlineErrorOutline} color={"red.500"} />
                  <Text
                    color={"red.500"}
                    fontSize={"sm"}
                    fontFamily={"Consolas, monaco, monospace"}
                  >
                    {error}
                  </Text>
                </HStack>
              ))}
            </HStack>
            <VStack spacing={0} align={"start"}>
              {Object.entries(item || {}).map(([key, val], idx2) => (
                <ConfigurationField
                  onClick={() => router.push(key)}
                  key={idx2}
                  name={key}
                  schemaType={getFieldSchemaType(
                    idx,
                    item as Prisma.JsonObject
                  )}
                  errors={getFieldErrors(idx, key)}
                  active={router.path[idx] === key}
                  value={val as Prisma.JsonObject}
                />
              ))}
            </VStack>
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
  errors?: string[];
  schemaType?: string;
  onClick?: () => void;
}

function ConfigurationField(props: ConfigurationFieldProps) {
  const { name, value, errors } = props;

  const valueType = useMemo(() => {
    if (Array.isArray(props.value)) {
      return "array";
    }
    return typeof props.value;
  }, [props.value]);

  const isClickable = useMemo(
    () => ["object", "array"].includes(valueType),
    [valueType]
  );

  const valueColor = useMemo(() => {
    if (typeof value === "string") {
      return "#A87864";
    }
    if (typeof value === "number") {
      return "#B5CEA8";
    }
    return "#569CD6";
  }, [value]);

  const valueCount = useMemo(() => {
    if (Array.isArray(props.value)) {
      return props.value.length;
    } else if (props.value && typeof props.value === "object") {
      return Object.values(props.value).length;
    }
    return undefined;
  }, [props.value]);

  // console.log(props.schemaType);

  const hasError = useMemo(
    () => props.errors && props.errors.length > 0,
    [props.errors]
  );

  return (
    <>
      <VStack
        width={"full"}
        fontFamily={"Consolas, monaco, monospace"}
        onClick={isClickable ? props.onClick : undefined}
        py={2}
        px={4}
        transition={"all 0.1s ease-in-out"}
        sx={{
          "&:hover": { bg: isClickable ? "whiteAlpha.300" : "default" },
          bg: props.active ? "whiteAlpha.200" : "default",
        }}
        cursor={isClickable ? "pointer" : "default"}
        spacing={0}
      >
        <HStack width={"full"} spacing={0} direction={"row"}>
          <Text color={"#98D7F8"}>{`"${name}"`}</Text>
          <Text pr={2}>{": "}</Text>
          <Text>{}</Text>
          {!value && <Text color={valueColor}>null</Text>}
          {!includes(["array", "object"], valueType) && (
            <Text color={valueColor}>{JSON.stringify(value)}</Text>
          )}
          {value && valueType === "array" && (
            <HStack spacing={1}>
              <Text>[</Text>
              <Badge fontSize={"small"} textTransform={"none"}>
                {valueCount} items
              </Badge>
              <Text>]</Text>
            </HStack>
          )}
          {value && valueType === "object" && (
            <HStack spacing={1}>
              <Text>{"{"}</Text>
              <Badge fontSize={"small"} textTransform={"none"}>
                {valueCount} item{valueCount === 1 ? "" : "s"}
              </Badge>
              <Text>{"}"}</Text>
            </HStack>
          )}
          <Stack flex={1} alignItems={"flex-end"}>
            {isClickable && <Icon as={MdArrowRight} fontSize={"xl"} />}
          </Stack>
        </HStack>
        {errors && errors.length > 0 && !isClickable && (
          <VStack spacing={0} w={"full"} alignItems={"flex-start"}>
            {errors.map((error, idx) => (
              <HStack spacing={2} justify={"center"} key={idx}>
                <Icon as={MdOutlineErrorOutline} color={"red.500"} />
                <Text fontSize={"sm"} color={"red.500"}>
                  {error}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </>
  );
}
