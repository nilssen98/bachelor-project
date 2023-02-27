import type { Prisma } from "@prisma/client";
import type { Context, ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const defaultContext: ContextProps = {
  path: [],
  navigate: () => void {},
  content: [],
  isValidPath: false,
};

interface ContextProps {
  path: string[];
  navigate: (slug: string | string[] | number) => void;
  content: Prisma.JsonObject[];
  isValidPath: boolean;
}

const ConfigurationContext: Context<ContextProps> =
  createContext(defaultContext);

interface ProviderProps {
  children: ReactNode;
  configuration: Prisma.JsonObject;
  onPathChange?: (path: string[]) => void;
  routerPath?: string[];
}

function ConfigurationProvider(props: ProviderProps) {
  const { configuration, children } = props;
  const [path, setPath] = useState<string[]>([]);
  const [content, setContent] = useState<Prisma.JsonObject[]>([configuration]);
  const [isValidPath, setIsValidPath] = useState<boolean>(false);

  // Check if given path is invalid
  useEffect(() => {
    setIsValidPath(
      path.every((slug, idx) => {
        return content?.[idx]?.[slug] !== undefined;
      })
    );
  }, [path]);

  // Update the left and right content when the path changes
  useEffect(() => {
    setContent([
      configuration,
      ...path.map((_, idx) => getConfigurationFromPath(path.slice(0, idx + 1))),
    ]);
  }, [path]);

  // Update the path when the router path changes
  useEffect(() => {
    if (props.routerPath) {
      if (props.routerPath.join("/") !== path.join("/")) {
        setPath(props.routerPath);
      }
    }
  }, [props.routerPath]);

  // Call the onPathChange callback when the path changes
  useEffect(() => {
    if (props.onPathChange) {
      props.onPathChange(path);
    }
  }, [path]);

  const getConfigurationFromPath = (path: string[]) => {
    return path.reduce((current, slug) => {
      return current?.[slug] as Prisma.JsonObject;
    }, configuration);
  };

  const navigate = (slug: string | string[] | number) => {
    let newPath = [...path];
    if (typeof slug === "number") {
      newPath.splice(slug);
    } else if (typeof slug === "string") {
      const currentContent = content[content.length - 2];
      if (currentContent?.[slug]) {
        newPath.pop();
        newPath.push(slug);
      } else {
        newPath.push(slug);
      }
    } else {
      newPath = slug;
    }
    setPath(newPath);
  };

  const value = {
    path,
    navigate,
    content,
    isValidPath,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
}

const useConfiguration = () => {
  const context = useContext(ConfigurationContext);

  if (context === undefined) {
    throw new Error(
      "useConfiguration must be used within a ConfigurationProvider"
    );
  }

  return context;
};

export { ConfigurationProvider, useConfiguration };
