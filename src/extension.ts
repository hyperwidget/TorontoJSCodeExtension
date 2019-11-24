// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { updateToGenesis } from "./process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hitorontojs" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("extension.hellotjs", () => {
    // The code you place here will be executed every time your command is executed

    let disposable = vscode.commands.registerCommand(
      "extension.genesis",
      () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
          let document = editor.document;

          const firstLine = document.lineAt(0);
          const lastLine = document.lineAt(document.lineCount - 1);
          const textRange = new vscode.Range(
            0,
            firstLine.range.start.character,
            document.lineCount - 1,
            lastLine.range.end.character
          );

          var value = document.getText(); // parse JS code into an AST

          editor.edit(editBuilder => {
            editBuilder.replace(textRange, updateToGenesis(value));
          });
        }

        // Display a message box to the user
        vscode.window.showInformationMessage(
          "File update to Genesis syntax 🎉!"
        );
      }
    );
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
