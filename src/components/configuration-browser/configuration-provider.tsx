import type { Prisma } from "@prisma/client";
import { range } from "lodash-es";
import type { Context, ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import type { ValidationError } from "../../utils/validator/types";

const defaultContext: ContextProps = {
  content: [],
  isValidPath: false,
  errors: [],
};

interface ContextProps {
  content: Prisma.JsonObject[];
  useConfigRouter?: ReturnType<typeof useConfigRouter>;
  isValidPath: boolean;
  errors: ValidationError[];
}

const ConfigurationContext: Context<ContextProps> =
  createContext(defaultContext);

interface ProviderProps {
  children: ReactNode;
  configuration: Prisma.JsonObject;
  errors: ValidationError[];
  schema?: Prisma.JsonObject;
  onPathChange?: (path: string[]) => void;
  path?: string[];
}

function ConfigurationProvider(props: ProviderProps) {
  const { configuration, children } = props;
  const [content, setContent] = useState<Prisma.JsonObject[]>([configuration]);
  const [isValidPath, setIsValidPath] = useState<boolean>(false);

  const router = useConfigRouter({ content, initialPath: props.path });

  useEffect(() => {
    // Check if the path is valid
    setIsValidPath(
      true
      // router.path.every((slug, idx) => {
      //   return content?.[idx]?.[slug] !== undefined;
      // })
    );

    // Update the content when the path changes
    setContent([
      configuration,
      ...router.path.map((_, idx) =>
        getConfigurationFromPath(router.path.slice(0, idx + 1))
      ),
    ]);
  }, [router.path, configuration]);

  useEffect(() => {
    if (props.onPathChange) {
      props.onPathChange(router.path);
    }
  }, [router.path]);

  const getConfigurationFromPath = (path: string[]) => {
    return path.reduce((current, slug) => {
      return current?.[slug] as Prisma.JsonObject;
    }, configuration);
  };

  const value = {
    useConfigRouter: router,
    content,
    isValidPath,
    errors: props.errors,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
}

const useConfigRouter = ({
  initialPath,
  content,
}: {
  initialPath?: string[];
  content: Prisma.JsonValue[];
}) => {
  // const { content } = useContext(ConfigurationContext);
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    if (initialPath) {
      setPath(initialPath);
    }
  }, [initialPath]);

  const back = () => {
    const newPath = [...path];
    newPath.pop();
    setPath(newPath);
  };

  const push = (slug: string) => {
    const newPath = [...path];
    const currentContent = content[content.length - 2] as Prisma.JsonObject;
    if (currentContent?.[slug]) {
      newPath.pop();
      newPath.push(slug);
    } else {
      newPath.push(slug);
    }
    setPath(newPath);
  };

  const set = (newPath: string[]) => {
    const filteredPath: string[] = [];

    let temp = content[0] as Prisma.JsonObject;
    newPath.forEach((slug) => {
      const currentContent = temp?.[slug];
      if (typeof currentContent === "object") {
        filteredPath.push(slug);
        temp = currentContent as Prisma.JsonObject;
      }
    });

    setPath(filteredPath);
  };

  return {
    path,
    back,
    push,
    set,
  };
};

const useConfiguration = () => {
  const context = useContext(ConfigurationContext);

  if (context === undefined) {
    throw new Error(
      "useConfiguration must be used within a ConfigurationProvider"
    );
  }

  const { content, isValidPath, errors } = context;

  return { content, isValidPath, errors };
};

const useConfigurationRouter = () => {
  const context = useContext(ConfigurationContext);

  if (context === undefined) {
    throw new Error(
      "useConfigurationRouter must be used within a ConfigurationProvider"
    );
  }

  if (!context.useConfigRouter) {
    throw new Error("Configuration router is not defined");
  }

  return context.useConfigRouter;
};

export { ConfigurationProvider, useConfiguration, useConfigurationRouter };
