const { app, BrowserWindow } = require("electron");

function crearVentenaPrincipal() {
  let ventanaPrincipal = new BrowserWindow({ width: 800, height: 600 });
  ventanaPrincipal.loadFile("index.html");
}
//cuando este lista la aplicacion se crea la ventana
app.whenReady().then(crearVentenaPrincipal);
