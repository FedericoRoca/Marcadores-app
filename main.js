const { app, BrowserWindow } = require("electron");

function crearVentenaPrincipal() {
  let ventanaPrincipal = new BrowserWindow({
    width: 800,
    height: 600,
    //para usar require
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  ventanaPrincipal.loadFile("index.html");
}
//cuando este lista la aplicacion se crea la ventana
app.whenReady().then(crearVentenaPrincipal);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    crearVentenaPrincipal();
  }
});
