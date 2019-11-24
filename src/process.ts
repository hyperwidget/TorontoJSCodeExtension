import * as jscodeshift from "jscodeshift";

export const update = (path: any) => {
  const Node = path.value;

  Node.openingElement.attributes
    .filter((obj: any) => obj.name.name === "align")
    .forEach((item: any) => {
      item.name.name = "alignContent";
    });
};

export const updateToGenesis = (value: string) => {
  console.log(value);
  return jscodeshift(value)
    .find(jscodeshift.JSXElement, {
      openingElement: { name: { name: "Flex" } }
    })
    .forEach(update)
    .toSource();
};
