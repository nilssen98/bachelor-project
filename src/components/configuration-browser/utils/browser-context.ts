import type { Context } from "react";
import { createContext } from "react";
import type { _useBrowserContent } from "../hooks/useBrowserContent";
import type { _useBrowserController } from "../hooks/useBrowserController";
import type { _useBrowserRouter } from "../hooks/useBrowserRouter";

export interface ContextProps {
  useBrowserRouter?: ReturnType<typeof _useBrowserRouter>;
  useBrowserContent?: ReturnType<typeof _useBrowserContent>;
  useBrowserController?: ReturnType<typeof _useBrowserController>;
}

export const BrowserContext: Context<ContextProps> = createContext({});
