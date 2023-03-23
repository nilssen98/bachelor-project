import Ajv from "ajv";
import type { ValidationResult } from "./types";

export const ajv = new Ajv({
  allErrors: true,
  strict: true,
  strictSchema: true,
});

export const isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};

export const validate = ({
  schema,
  configuration,
}: {
  schema: string;
  configuration: string;
}): ValidationResult => {
  if (!isValidJson(schema)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Schema is not valid JSON" }],
    };
  }

  if (!isValidJson(configuration)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Configuration is not valid JSON" }],
    };
  }

  const validate = ajv.compile(JSON.parse(schema));
  const isValid = validate(JSON.parse(configuration));

  if (!isValid && validate.errors) {
    return {
      valid: false,
      errors: validate.errors.map((error) => ({
        path: error.instancePath,
        message: error.message || "",
      })),
    };
  }
  return {
    valid: true,
    errors: [],
  };
};
