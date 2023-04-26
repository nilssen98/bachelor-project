import { useContext, useState } from "react";
import { BrowserContext } from "../utils/browser-context";

export const _useBrowserController = () => {
  const [showTreeView, setShowTreeView] = useState<boolean>(false);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const toggleTreeView = () => {
    setShowSchema(false);
    setShowTreeView(true);
  };

  const toggleSchema = () => {
    setShowTreeView(false);
    setShowSchema(true);
  };

  const toggleErrors = () => setShowErrors(!showErrors);

  return {
    showTreeView,
    toggleTreeView,
    showErrors,
    toggleErrors,
    showSchema,
    toggleSchema,
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
