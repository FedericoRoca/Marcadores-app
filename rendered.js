class Marcadores {
  constructor() {
    this.mensajeError = document.querySelector(".mensaje-error");
    this.formularioCreacionMarcadores = document.querySelector(
      ".creacion-marcador-formulario"
    );
    this.marcadorUrl = document.querySelector(".creacion-marcador-url");
    this.marcadorBoton = document.querySelector(".creacion-marcador-boton");
    this.marcadores = document.querySelector(".marcadores");
    this.eliminarMarcadores = document.querySelector(".remover-marcadores");
    this.parser = new DOMParser();
    this.agregarEventListeners();
  }
  agregarEventListeners() {
    this.marcadorUrl.addEventListener("keyup", () => {
      //si hay una URL valida se habilita el marcador
      this.marcadorBoton.disabled = !this.marcadorUrl.validity.valid;
    });
    this.formularioCreacionMarcadores.addEventListener(
      "submit",
      this.crearMarcador.bind(this)
    );
  }
  //Function.prototype.bind() es un método del objeto Function creado para manipular el valor contextual de this. Cuando se ejecuta sobre una función dada, creamos una nueva función que nos permite manipular tanto su valor this como los parámetros que espera.
  crearMarcador(evento) {
    evento.preventDefault();
    const url = this.marcadorUrl.value;
    fetch(url)
      .then((respuesta) => respuesta.text())
      .then(this.extraerContenido.bind(this))
      .then(this.encontrarTituloPagina)
      .then(this.almacenarMarcador)
      .then(this.limpiarFormulario.bind(this))
      .then(this.visualizarMarcadores.bind(this))
      .catch((error) => this.reportarError(error, url));
  }
  extraerContenido(contenido) {
    return this.parser.parseFromString(contenido, "text/html");
  }
  encontrarTituloPagina(html) {
    return html.querySelector("title").innerText;
  }
  almacenarMarcador(url, titulo) {
    localStorage.setItem(url, JSON.stringify({ titulo: titulo, url: url }));
  }
  limpiarFormulario() {
    this.marcadorUrl.value = null;
  }
  obtenerMarcadores() {
    return Object.keys(localStorage).map((k) => JSON.parse(localStorage.getItem(k)));
  }
  generarHtmlMarcador(marcador) {
    return `<div class='enlace'><h3>${"Titulo"}</h3>
    <p><a href='${marcador.url}'>${marcador.url}</a></p></div>`;
  }
  visualizarMarcadores() {
    let marcadores = this.obtenerMarcadores();
    let html = marcadores.map(this.generarHtmlMarcador()).join("");
    this.mensajeError.innerHTML = html;
  }
  reportarError(error, url) {
    this.mensajeError.innerHTML = `Ocurrio un error al intentar acceder a ${url}: ${error}`;
    setTimeout(() => {
      this.mensajeError.innerText = null;
    }, 5000);
  }
}

new Marcadores();
