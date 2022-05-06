
const { exec } = require('child_process');
const { toEditorSettings } = require('typescript');
const vscode = require('vscode');
const childproc = require('child_process').execFile;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	//var compilerPath = vscode.workspace.getConfiguration('compilegml').get('compilerpath', __dirname.toString() + "\\ExternalCompiler.exe");
	//console.log(compilerPath);
	console.log('Congratulations, your extension "gmcompile" is now active!');
	let disposable = vscode.commands.registerCommand('gmcompile.compileGML', function () {

		// Get the compilerpath
		var compilerPath = vscode.workspace.getConfiguration('compilegml').get('compilerpath');
		if(compilerPath == null)
		{
			compilerPath =  __dirname.toString() + "\\ExternalCompiler.exe";
		}
		console.log(compilerPath);

		if(compilerPath == null)
		{
			vscode.window.showErrorMessage("Compiler path NOT SET! Go to settings and set the path!")
		}

		vscode.window.showInformationMessage("Set compiler path: "+compilerPath+"\nCan be changed in settings.");
		//"E:\\Modding\\ExternalCompiler.exe"
		try {
			exec(compilerPath, function(err,data){
				console.log(err);
				console.log(data.toString());
			});
		} catch (error) {
			vscode.window.showInformationMessage("Could not find the ExternalCompiler.exe.\nMake sure to set the path in settings.")
		}
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
