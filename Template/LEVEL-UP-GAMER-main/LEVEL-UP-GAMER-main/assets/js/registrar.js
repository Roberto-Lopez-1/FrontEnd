// DECLARACION DE VARIABLES
const regAlert = document.getElementById("regAlert");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const comuna = document.getElementById("comuna");
const form = document.getElementById("formRegistro");

//FUNCIONES
// function soloLetrasEspacios(str) {
//     return /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
// }
// FUNCION FLECHA
const soloLetrasEspacios = (str) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
const isDuocMail = (str) => /^[A-Za-z0-9-_.]+@duoc.cl$/.test(str);
const isEstudianteMail = (str) =>
  /^[A-Za-z0-9-_.]+@estudiantes.duoc.cl$/.test(str);
const validPhone = (str) => str === "" || /^[0-9+()-]{8,15}$/.test(str);
const strongPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

//VALIDACIONES
//VALIDAMOS EL NOMBRE
nombre.addEventListener("input", () => {
  if (soloLetrasEspacios(nombre.value.trim()) && nombre.value.length <= 20) {
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
  } else {
    nombre.classList.add("is-invalid");
    nombre.classList.remove("is-valid");
  }
});

//VALIDAMOS CORREO
correo.addEventListener("input", () => {
  if (
    isDuocMail(correo.value.trim()) ||
    isEstudianteMail(correo.value.trim())
  ) {
    correo.classList.remove("is-invalid");
    correo.classList.add("is-valid");
  } else {
    correo.classList.add("is-invalid");
    correo.classList.remove("is-valid");
  }
});

//VALIDAMOS TELEFONO
telefono.addEventListener("input", () => {
  if (validPhone(telefono.value.trim())) {
    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
  } else {
    telefono.classList.add("is-invalid");
    telefono.classList.remove("is-valid");
  }
});

//VALIDACION DE CONTRASEÑA
password.addEventListener("input", () => {
  if (strongPassword(password.value)) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  } else {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
  }
});
//VALIDACION DE CONTRASEÑA2
password2.addEventListener("input", () => {
  if (password.value == password2.value) {
    password2.classList.remove("is-invalid");
    password2.classList.add("is-valid");
  } else {
    password2.classList.add("is-invalid");
    password2.classList.remove("is-valid");
  }
});

//POBLAR CAMPO SELECT
//creamos diccionario con comunas
const comunas = {
  PA: "Puente Alto",
  LF: "La Florida",
  LP: "La Pintana",
  ST: "Santiago",
};
//creamos funcion para llenar select de comunas
function llenarComunas() {
  for (let codigo in comunas) {
    const opcion = document.createElement("option");
    opcion.value = codigo.valueOf();
    opcion.textContent = comunas[codigo];
    comuna.appendChild(opcion);
  }
}
//llamamos a la funcion
llenarComunas();
//VALIDAMOS EL CAMPO SELECT, esta vez usando toggle
//toggle verifica el valor de verdad de una condicion, si se cumple, añade la clase señalada
//si no la cumple, la elimina.
comuna.addEventListener("change", () => {
  comuna.classList.toggle("is-valid", comuna.value != "");
  comuna.classList.toggle("is-invalid", comuna.value == "");
});

//==========================================================//

//función en el boton SUBMIT
form.addEventListener("submit", (e) => {
  //evitamos que la pagina se recargue
  e.preventDefault();

  //primero validamos que ningun campo posea la clase "invalid"
  //capturamos alguna entidad que posea la clase is-invalid
  const invalid = form.querySelector(".is-invalid");
  if (invalid) {
    //si la clase existe, retorna true
    // añado la clase alert-danger (fondo rojo)
    regAlert.className = "alert alert-danger";
    //añado el texto
    regAlert.textContent = "Revise todos los campos";
    //dejo visible el div eliminando d-none (display none)
    regAlert.classList.remove("d-none");
    //a las 3 segundos, desapareece el mensaje añadiendo la clase d-none
    setTimeout(() => regAlert.classList.add("d-none"), 3000);
    //vuelvo y salgo de la funcion
    return;
  }

  // SI TODO SALE BIEN; MENSAJE DE EXITO
  regAlert.className = "alert alert-success";
  regAlert.textContent = "Cuenta creada con exito";
  regAlert.classList.remove("d-none");
  setTimeout(() => regAlert.classList.add("d-none"), 3000);
});

// actualizar mensaje
