import * as jscodeshift from "jscodeshift";
import { NodePath } from "recast";

export const update = (path: NodePath) => {
  const Node = path.value;

  Node.openingElement.attributes
    .filter((obj: any) => obj.name.name === "align")
    .forEach((item: any) => {
      item.name.name = "alignContent";
    });
};

export const updateToGenesis = (value: string) => {
  return jscodeshift(value)
    .find(jscodeshift.JSXElement, {
      openingElement: { name: { name: "Flex" } }
    })
    .forEach(update)
    .toSource();
};
