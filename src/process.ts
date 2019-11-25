import * as jscodeshift from "jscodeshift";

export const update = (path: any) => {
  const Node = path.value;

  Node.openingElement.attributes
    .filter((obj: any) => obj.name.name === "justify")
    .forEach((item: any) => {
      item.name.name = "justifyContent";
    });

  Node.openingElement.attributes
    .filter((obj: any) => obj.name.name === "align")
    .forEach((item: any) => {
      item.name.name = "alignContent";
    });
};

export const updateComponents = (value: string) => {
  return jscodeshift(value)
    .find(jscodeshift.JSXElement, {
      openingElement: { name: { name: "Flex" } }
    })
    .forEach(update)
    .toSource();
};
