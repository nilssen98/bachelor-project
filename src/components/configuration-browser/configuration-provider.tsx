import type { Prisma } from "@prisma/client";
import type { Context, ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const defaultContext: ContextProps = {
  path: [],
  navigate: () => void {},
};

interface ContextProps {
  path: string[];
  navigate: (slug: string | string[] | number) => void;
  leftContent?: Prisma.JsonObject;
  rightContent?: Prisma.JsonObject;
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
  const [leftContent, setLeftContent] = useState<Prisma.JsonObject>();
  const [rightContent, setRightContent] = useState<Prisma.JsonObject>();

  const getConfigurationFromPath = (path: string[]) => {
    return path.reduce((current, slug) => {
      return current[slug] as Prisma.JsonObject;
    }, configuration);
  };

  // Update the left and right content when the path changes
  useEffect(() => {
    setLeftContent(getConfigurationFromPath(path.slice(0, path.length - 1)));
    if (path.length === 0) {
      setRightContent(undefined);
    } else {
      setRightContent(getConfigurationFromPath(path));
    }
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

  const navigate = (slug: string | string[] | number) => {
    let newPath = [...path];
    if (typeof slug === "number") {
      newPath.splice(slug);
    } else if (typeof slug === "string") {
      if (leftContent && Object.keys(leftContent).includes(slug)) {
        newPath.pop();
        newPath.push(slug);
      } else if (rightContent && Object.keys(rightContent).includes(slug)) {
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
    leftContent,
    rightContent,
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
    throw new Error("useCount must be used within a ConfigurationProvider");
  }

  return context;
};

export { ConfigurationProvider, useConfiguration };
