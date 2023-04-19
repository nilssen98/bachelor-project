import type { StackProps } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Badge, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import { includes, range } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoConstructOutline } from "react-icons/io5";
import {
  MdAdd,
  MdArrowRight,
  MdDelete,
  MdEdit,
  MdOutlineError,
  MdOutlineErrorOutline,
} from "react-icons/md";
import BrowserErrorTooltip from "./browser-error-tooltip";
import BrowserFieldEditPopover from "./browser-field-edit-popover";
import { useBrowserContent } from "./hooks/useBrowserContent";
import { useBrowserRouter } from "./hooks/useBrowserRouter";

export default function BrowserContent(props: StackProps) {
  const {
    content,
    configuration,
    errors,
    template,
    updateConfigurationContent,
    getConfigurationFromPath,
  } = useBrowserContent();
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
    return [...content];
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

  const hasRightBorder = (idx: number) => {
    return filteredContent.length === 1 || filteredContent.length - 1 !== idx;
  };

  const handleFieldUpdate = (
    field: string,
    value: string,
    type: "string" | "number" | "boolean" | "null",
    content: Prisma.JsonValue,
    path: string[]
  ) => {
    // TODO: finish the logic
    let updatedContent = content;
    let updatedValue: string | number | boolean | null = value;
    if (type === "number") {
      updatedValue = parseInt(value);
    } else if (type === "boolean") {
      updatedValue = value === "true";
    } else if (type === "null") {
      updatedValue = null;
    }

    // This means that the field we want to update is in an array
    if (content && (content as any[]).length >= 0) {
      const idx = parseInt(field);

      const newContent: Prisma.JsonValue[] = [
        ...(content as Prisma.JsonValue[]),
      ];
      newContent[idx] = updatedValue;

      updatedContent = newContent;
    }

    // This means that the field we want to update is in an object
    else {
      const updatedField = { [field]: updatedValue };

      const newContent: Prisma.JsonObject = {
        ...content,
        ...updatedField,
      };

      updatedContent = newContent;
    }

    let newConfig: Prisma.JsonValue = configuration.content;

    // If the path is empty, we are updating the root content
    if (router.path.length === 0) {
      newConfig = updatedContent;
    } else {
      router.path.forEach((slug, idx) => {
        const currPath = router.path.slice(0, idx);
      });
    }
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
            width={`calc(${100 / sections}%)`}
            height={"100%"}
            position={"absolute"}
            borderRight={hasRightBorder(idx) ? "1px solid" : 0}
            borderColor={"whiteAlpha.300"}
            spacing={0}
          >
            <VStack align={"start"} px={2}>
              {getContentErrors(idx, item)?.map((error, errIdx) => (
                <Badge mt={2} w={"full"} colorScheme={"red"} key={errIdx}>
                  <HStack
                    py={2}
                    px={4}
                    spacing={2}
                    key={errIdx}
                    textTransform={"none"}
                  >
                    <Icon boxSize={5} as={MdOutlineErrorOutline} />
                    <Text
                      fontSize={"sm"}
                      fontFamily={"Consolas, monaco, monospace"}
                    >
                      {error}
                    </Text>
                  </HStack>
                </Badge>
              ))}
            </VStack>
            <VStack pt={2} px={2}>
              <Button
                color={"whiteAlpha.800"}
                justifyContent={"flex-start"}
                leftIcon={<Icon boxSize={5} as={MdAdd} />}
                py={2}
                mx={0}
                w={"full"}
                variant={"ghost"}
              >
                Add field
              </Button>
            </VStack>
            <VStack spacing={0} align={"start"}>
              {Object.entries(item || {}).map(([key, val], idx2) => (
                <ConfigurationField
                  onClick={() => router.push(key)}
                  key={idx2}
                  name={key}
                  errors={getFieldErrors(idx, key)}
                  active={router.path[idx] === key}
                  value={val as Prisma.JsonObject}
                  onUpdate={(field, value, type) =>
                    handleFieldUpdate(
                      field,
                      value,
                      type,
                      item,
                      router.path.slice(0, idx)
                    )
                  }
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
  onUpdate?: (
    field: string,
    value: string,
    type: "string" | "number" | "boolean" | "null"
  ) => void;
}

function ConfigurationField(props: ConfigurationFieldProps) {
  const { name, value, errors } = props;
  const [editing, setEditing] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

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

  const hasError = useMemo(
    () => props.errors !== undefined && props.errors.length > 0,
    [props.errors]
  );

  const isEditVisible = useMemo(() => {
    if (editing) {
      return true;
    } else if (isHovered && !isClickable) {
      return true;
    }
    return false;
  }, [editing, isHovered, isClickable]);

  const editType = useMemo(() => {
    if (valueType === "string") {
      return "string";
    }
    if (valueType === "number") {
      return "number";
    }
    if (valueType === "boolean") {
      return "boolean";
    }
    if (valueType === "undefined") {
      return "null";
    }
    return "string";
  }, [valueType]);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HStack width={"full"} spacing={0} direction={"row"}>
          <BrowserErrorTooltip errors={errors || []}>
            <Text
              textDecoration={hasError ? "underline" : "inherit"}
              textDecorationStyle={"wavy"}
              textDecorationColor={"red.600"}
              color={"#98D7F8"}
            >{`"${name}"`}</Text>
          </BrowserErrorTooltip>
          <Text pr={2}>{": "}</Text>
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
          <HStack pl={2} flex={1}>
            <IconButton
              hidden={!editing && !isHovered}
              onClick={(e) => e.stopPropagation()}
              size={"xs"}
              variant={"ghost"}
              icon={<Icon boxSize={4} as={MdDelete} />}
              aria-label={"Delete"}
            />
            <BrowserFieldEditPopover
              isOpen={editing}
              errors={errors || []}
              onClose={() => setEditing(false)}
              onCancel={() => setEditing(false)}
              onUpdate={props.onUpdate}
              field={name}
              type={editType}
              value={value?.toString() || ""}
            >
              <IconButton
                hidden={!isEditVisible}
                onClick={(e) => {
                  setEditing(!editing);
                  e.stopPropagation();
                }}
                size={"xs"}
                variant={"ghost"}
                icon={<Icon boxSize={4} as={MdEdit} />}
                aria-label={"Edit"}
              />
            </BrowserFieldEditPopover>
          </HStack>
          <HStack align={"center"} justify={"end"}>
            {isClickable && <Icon as={MdArrowRight} fontSize={"xl"} />}
          </HStack>
        </HStack>
      </VStack>
    </>
  );
}
