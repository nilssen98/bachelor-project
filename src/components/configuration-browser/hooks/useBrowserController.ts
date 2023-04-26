import { useContext, useState } from "react";
import { BrowserContext } from "../utils/browser-context";

export const _useBrowserController = () => {
  const [showTreeView, setShowTreeView] = useState<boolean>(true);
  const [showBrowserView, setShowBrowserView] = useState<boolean>(false);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const toggleTreeView = () => {
    setShowSchema(false);
    setShowBrowserView(false);
    setShowTreeView(true);
  };

  const toggleSchema = () => {
    setShowTreeView(false);
    setShowBrowserView(false);
    setShowSchema(true);
  };

  const toggleBrowserView = () => {
    setShowTreeView(false);
    setShowSchema(false);
    setShowBrowserView(true);
  };

  const toggleErrors = () => setShowErrors(!showErrors);

  return {
    showTreeView,
    toggleTreeView,
    showErrors,
    toggleErrors,
    showSchema,
    toggleSchema,
    showBrowserView,
    toggleBrowserView,
  };
};

export const useBrowserController = () => {
  const context = useContext(BrowserContext);

  if (context === undefined) {
    throw new Error(
      "useBrowserRouter must be used within a ConfigurationProvider"
    );
  }

  if (!context.useBrowserController) {
    throw new Error("useBrowserRouter router is not defined");
  }

  return context.useBrowserController;
};
