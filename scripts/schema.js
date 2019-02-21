// @ts-check

const path = require("path");
const fs = require("fs");
const prettier = require("prettier");
const TJS = require("typescript-json-schema");

/**
 * @param {string} inputFilePath
 * @param {string} outputFilePath
 * @param {string} typeName
 */
const generateSchema = (inputFilePath, outputFilePath, typeName) => {
  const program = TJS.getProgramFromFiles([path.join(process.cwd(), inputFilePath)], {
    target: "es5",
    lib: ["dom", "esnext"]
  });
  const schema = TJS.generateSchema(program, typeName, { ref: false });
  if (schema == null) {
    throw new Error();
  }

  delete schema.$schema;

  const decoratedSchema = `
	/**
	 * This file was automatically generated by typescript-json-schema
	 */
	import { Definition } from "typescript-json-schema";

	export const ${typeName}Schema: Definition = ${JSON.stringify(schema)}
	`;
  const prettieredSchema = prettier.format(decoratedSchema, { parser: "typescript", printWidth: 50 });

  fs.writeFileSync(path.join(process.cwd(), outputFilePath), prettieredSchema);
};

generateSchema("src/shared/api/request/save.ts", "src/server/api/schema/request/save.ts", "SaveParamsMap");
generateSchema("src/shared/api/request/search.ts", "src/server/api/schema/request/search.ts", "SearchParamsMap");
generateSchema("src/shared/api/response/get.ts", "src/server/api/schema/response/get.ts", "EntityStore");
generateSchema("src/shared/api/response/search.ts", "src/server/api/schema/response/search.ts", "SearchResponse");
