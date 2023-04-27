import type {
  Configuration,
  ConfigurationError,
  Template,
} from "@prisma/client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { ContextProps } from "./browser-context";
import { BrowserContext } from "./browser-context";
import { _useBrowserRouter } from "../hooks/useBrowserRouter";
import { _useBrowserContent } from "../hooks/useBrowserContent";
import { _useBrowserController } from "../hooks/useBrowserController";

interface ProviderProps {
  children: ReactNode;
  configuration: Configuration;
  configurations: Configuration[];
  errors: ConfigurationError[];
  template: Template;
  onPathChange?: (path: string[]) => void;
  onUpdateConfiguration: (newContent: object) => void;
  isUpdating?: boolean;
  path?: string[];
}

type SharedState = Pick<ReturnType<typeof _useBrowserContent>, "content"> &
  Pick<ReturnType<typeof _useBrowserRouter>, "path">;

function ConfigurationProvider(props: ProviderProps) {
  // Shared state between the hooks of the provider
  const [sharedState, setSharedState] = useState<SharedState>({
    content: [],
    path: [],
  });

  const browserRouter = _useBrowserRouter({
    initialPath: props.path,
    content: sharedState.content,
  });

  const browserContent = _useBrowserContent({
    errors: props.errors,
    configuration: props.configuration,
    configurations: props.configurations,
    onUpdateConfiguration: props.onUpdateConfiguration,
    isUpdating: props.isUpdating,
    template: props.template,
    path: sharedState.path,
  });

  const browserController = _useBrowserController();

  useEffect(() => {
    setSharedState({
      ...sharedState,
      path: browserRouter.path,
      content: browserContent.content,
    });
  }, [browserRouter.path, browserContent.content]);

  useEffect(() => {
    if (props.path) {
      browserRouter.set(props.path);
    }
  }, [props.path]);

  useEffect(() => {
    if (props.onPathChange) {
      props.onPathChange(browserRouter.path);
    }
  }, [browserRouter.path]);

  const value: ContextProps = {
    useBrowserRouter: browserRouter,
    useBrowserContent: browserContent,
    useBrowserController: browserController,
  };

  return (
    <BrowserContext.Provider value={value}>
      {props.children}
    </BrowserContext.Provider>
  );
}

export { ConfigurationProvider };
