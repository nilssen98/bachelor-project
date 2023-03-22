import type { Prisma } from "@prisma/client";
import type { Context, ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const defaultContext: ContextProps = {
  content: [],
  isValidPath: false,
};

interface ContextProps {
  content: Prisma.JsonObject[];
  useConfigRouter?: ReturnType<typeof useConfigRouter>;
  isValidPath: boolean;
}

const ConfigurationContext: Context<ContextProps> =
  createContext(defaultContext);

interface ProviderProps {
  children: ReactNode;
  configuration: Prisma.JsonObject;
  schema?: Prisma.JsonObject;
  onPathChange?: (path: string[]) => void;
  routerPath?: string[];
}

function ConfigurationProvider(props: ProviderProps) {
  const { configuration, schema, children } = props;
  const [content, setContent] = useState<Prisma.JsonObject[]>([configuration]);
  const [isValidPath, setIsValidPath] = useState<boolean>(false);

  const router = useConfigRouter();

  useEffect(() => {
    // Call the onPathChange callback when the path changes
    if (props.onPathChange) {
      props.onPathChange(router.path);
    }

    // Check if the path is valid
    setIsValidPath(
      router.path.every((slug, idx) => {
        return content?.[idx]?.[slug] !== undefined;
      })
    );

    // Update the content when the path changes
    setContent([
      configuration,
      ...router.path.map((_, idx) =>
        getConfigurationFromPath(router.path.slice(0, idx + 1))
      ),
    ]);
  }, [router]);

  // Update the path when the router path changes
  useEffect(() => {
    if (props.routerPath) {
      if (props.routerPath.join("/") !== router.path.join("/")) {
        router.set(props.routerPath);
      }
    }
  }, [props.routerPath]);

  const getConfigurationFromPath = (path: string[]) => {
    return path.reduce((current, slug) => {
      return current?.[slug] as Prisma.JsonObject;
    }, configuration);
  };

  const value = {
    useConfigRouter: router,
    content,
    isValidPath,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
}

const useConfigRouter = (basePath?: string[]) => {
  const { content } = useContext(ConfigurationContext);
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    if (basePath) {
      setPath(basePath);
    }
  }, [basePath]);

  const back = () => {
    const newPath = [...path];
    newPath.pop();
    setPath(newPath);
  };

  const push = (slug: string) => {
    const newPath = [...path];
    const currentContent = content[content.length - 2];
    if (currentContent?.[slug]) {
      newPath.pop();
      newPath.push(slug);
    } else {
      newPath.push(slug);
    }
    setPath(newPath);
  };

  const set = (newPath: string[]) => {
    setPath(newPath);
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

  const { content, isValidPath } = context;

  return { content, isValidPath };
};

const useConfigurationRouter = () => {
  const context = useContext(ConfigurationContext);

  if (context === undefined) {
    throw new Error(
      "useConfigurationRouter must be used within a ConfigurationProvider"
    );
  }

  if (!context.useConfigRouter) {
    throw new Error("configuration router is not defined");
  }

  return context.useConfigRouter;
};

export { ConfigurationProvider, useConfiguration, useConfigurationRouter };
