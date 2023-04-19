import { useContext, useEffect, useState } from "react";
import { BrowserContext } from "../utils/browser-context";
import type {
  Configuration,
  ConfigurationError,
  Prisma,
  Template,
} from "@prisma/client";

export const _useBrowserContent = ({
  configuration,
  configurations,
  template,
  errors,
  path,
}: {
  configuration: Configuration;
  configurations: Configuration[];
  template: Template;
  errors: ConfigurationError[];
  path: string[];
}) => {
  // This state contains the currently displayed configuration content
  const [content, setContent] = useState<Prisma.JsonValue[]>([]);
  const [isValidPath, setIsValidPath] = useState<boolean>(false);

  const getConfigurationFromPath = (path: string[]) => {
    return path.reduce((current, slug) => {
      return (current as Prisma.JsonObject)?.[slug] as Prisma.JsonValue;
    }, configuration.content);
  };

  useEffect(() => {
    const newContent: Prisma.JsonValue[] = [
      configuration.content,
      ...path.map((_, idx) => getConfigurationFromPath(path.slice(0, idx + 1))),
    ];

    // Check if the path is valid
    const isValid = path.every((slug, idx) => {
      return Object.keys(newContent[idx] || {}).includes(slug);
    });

    setIsValidPath(isValid);

    // Update the content when the path changes
    setContent(newContent);
  }, [path]);

  const updateConfigurationContent = (
    path: string[],
    updatedContent: Prisma.JsonValue
  ) => {
    return;
  };

  return {
    errors,
    content,
    isValidPath,
    configuration,
    configurations,
    getConfigurationFromPath,
    updateConfigurationContent,
    template,
  };
};

export const useBrowserContent = () => {
  const context = useContext(BrowserContext);

  if (context === undefined) {
    throw new Error(
      "useBrowserContent must be used within a ConfigurationProvider"
    );
  }

  if (!context.useBrowserContent) {
    throw new Error("useBrowserContent is not defined");
  }

  return context.useBrowserContent;
};
