import { useCallback, useMemo, useState } from "react";
import { DEFAULT_CONFIG } from "../constants/uiBuilderConstants";
import { buildCssVariables } from "../utils/exportCss";
import { buildConfigJson } from "../utils/exportJson";

// Single source of truth for the whole builder. Every control just calls
// updateConfig("group.key", value) or updateConfig("key", value) — nothing
// else touches config directly, and the Preview panel renders straight
// from it. No HTML strings anywhere, just data in -> UI out.
const useUIBuilder = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const updateConfig = useCallback((path, value) => {
    setConfig((prev) => {
      if (path.includes(".")) {
        const [group, key] = path.split(".");
        return { ...prev, [group]: { ...prev[group], [key]: value } };
      }
      return { ...prev, [path]: value };
    });
  }, []);

  const resetConfig = useCallback(() => setConfig(DEFAULT_CONFIG), []);

  const cssOutput = useMemo(() => buildCssVariables(config), [config]);
  const jsonOutput = useMemo(() => buildConfigJson(config), [config]);

  return { config, updateConfig, resetConfig, cssOutput, jsonOutput };
};

export default useUIBuilder;