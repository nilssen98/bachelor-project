import type {Prisma} from "@prisma/client";
import {useContext, useEffect, useState} from "react";
import {BrowserContext} from "../utils/browser-context";

// This function contains the logic for the useBrowserRouter hook
export const _useBrowserRouter = ({
  initialPath,
  content,
}: {
  initialPath?: string[];
  content: Prisma.JsonValue[];
}) => {
  const [path, setPath] = useState<string[]>(initialPath || []);

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
    const currentContent =
      (content[content.length - 2] as Prisma.JsonObject) || undefined;
    if (currentContent && Object.keys(currentContent).includes(slug)) {
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

// This function gets the useBrowserRouter hooks from the context
// This is needed because the hook needs to be called from within a component that is wrapped in the ConfigurationProvider
export const useBrowserRouter = () => {
  const context = useContext(BrowserContext);

  if (context === undefined) {
    throw new Error(
      "useBrowserRouter must be used within a ConfigurationProvider"
    );
  }

  if (!context.useBrowserRouter) {
    throw new Error("useBrowserRouter router is not defined");
  }

  return context.useBrowserRouter;
};
