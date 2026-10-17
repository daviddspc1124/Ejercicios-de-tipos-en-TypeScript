// Ejercicios de tipos

// ---------- 1. Gestor de tareas ----------
type Estado = "pendiente" | "en_progreso" | "finalizada";

type Tarea = {
  id: number;
  descripcion: string;
  completada: boolean;
  estado: Estado;
};

function filtrarTareas(tareas: Tarea[]): Tarea[] {
  return tareas.filter(t => t.estado === "pendiente" || t.estado === "en_progreso");
}

const tareas: Tarea[] = [
  { id: 1, descripcion: "Hacer taller de APIs", completada: false, estado: "en_progreso" },
  { id: 2, descripcion: "Subir proyecto", completada: true, estado: "finalizada" },
  { id: 3, descripcion: "Estudiar para el examen", completada: false, estado: "pendiente" },
];

console.log("Ejercicio 1");
console.log(filtrarTareas(tareas));


// ---------- 2. Agrupación por tipo de transacción ----------
type Transaccion = {
  monto: number;
  tipo: "ingreso" | "egreso";
  categoria: string;
};

function totalPorTipo(transacciones: Transaccion[]) {
  let ingreso = 0;
  let egreso = 0;

  for (const t of transacciones) {
    if (t.tipo === "ingreso") {
      ingreso += t.monto;
    } else {
      egreso += t.monto;
    }
  }

  return { ingreso, egreso };
}

const transacciones: Transaccion[] = [
  { monto: 1000, tipo: "ingreso", categoria: "salario" },
  { monto: 200, tipo: "egreso", categoria: "comida" },
  { monto: 500, tipo: "ingreso", categoria: "extra" },
  { monto: 300, tipo: "egreso", categoria: "transporte" },
];

console.log("Ejercicio 2");
console.log(totalPorTipo(transacciones));


// ---------- 3. Sistema de notificaciones ----------
type Email = {
  tipo: "email";
  correo: string;
  asunto: string;
};

type SMS = {
  tipo: "sms";
  telefono: string;
  mensaje: string;
};

type Push = {
  tipo: "push";
  dispositivo: string;
  titulo: string;
};

type Notificacion = Email | SMS | Push;

function enviarNotificacion(n: Notificacion) {
  if (n.tipo === "email") {
    console.log("Enviando email a " + n.correo + " con asunto: " + n.asunto);
  } else if (n.tipo === "sms") {
    console.log("Enviando SMS al " + n.telefono + ": " + n.mensaje);
  } else {
    console.log("Enviando push a " + n.dispositivo + ": " + n.titulo);
  }
}

console.log("Ejercicio 3");
enviarNotificacion({ tipo: "email", correo: "ana@correo.com", asunto: "Bienvenida" });
enviarNotificacion({ tipo: "sms", telefono: "3001234567", mensaje: "Tu código es 1234" });
enviarNotificacion({ tipo: "push", dispositivo: "abc123", titulo: "Nuevo mensaje" });


// ---------- 4. Validación de formularios ----------
type CampoFormulario = {
  nombre: string;
  tipo: "texto" | "numero" | "email";
  valor: string | number;
};

function camposInvalidos(campos: CampoFormulario[]): string[] {
  const invalidos: string[] = [];

  for (const campo of campos) {
    if (campo.tipo === "texto") {
      if (typeof campo.valor !== "string" || campo.valor.trim() === "") {
        invalidos.push(campo.nombre);
      }
    } else if (campo.tipo === "numero") {
      if (typeof campo.valor !== "number" || isNaN(campo.valor)) {
        invalidos.push(campo.nombre);
      }
    } else if (campo.tipo === "email") {
      if (typeof campo.valor !== "string" || !campo.valor.includes("@") || !campo.valor.includes(".")) {
        invalidos.push(campo.nombre);
      }
    }
  }

  return invalidos;
}

const campos: CampoFormulario[] = [
  { nombre: "nombre", tipo: "texto", valor: "Alison" },
  { nombre: "edad", tipo: "numero", valor: "veinte" },
  { nombre: "correo", tipo: "email", valor: "correo-malo" },
  { nombre: "apellido", tipo: "texto", valor: "" },
];

console.log("Ejercicio 4");
console.log(camposInvalidos(campos));


// ---------- 5. Historial de cambios de usuario ----------
type CambioNombre = { tipo: "nombre"; anterior: string; nuevo: string };
type CambioCorreo = { tipo: "correo"; anterior: string; nuevo: string };
type CambioPassword = { tipo: "password"; fecha: Date };

type Cambio = CambioNombre | CambioCorreo | CambioPassword;

function resumenCambios(cambios: Cambio[]) {
  const resumen = { nombre: 0, correo: 0, password: 0 };

  for (const c of cambios) {
    resumen[c.tipo]++;
  }

  return resumen;
}

const historial: Cambio[] = [
  { tipo: "nombre", anterior: "Ana", nuevo: "Ana María" },
  { tipo: "correo", anterior: "ana@a.com", nuevo: "ana@b.com" },
  { tipo: "password", fecha: new Date() },
  { tipo: "correo", anterior: "ana@b.com", nuevo: "ana@c.com" },
];

console.log("Ejercicio 5");
console.log(resumenCambios(historial));


// ---------- 6. Calificaciones por categoría ----------
type Calificacion = {
  estudianteId: number;
  materia: string;
  categoria: "tareas" | "quices" | "examen";
  nota: number;
};

function promedioPorCategoria(calificaciones: Calificacion[], estudianteId: number) {
  const suma = { tareas: 0, quices: 0, examen: 0 };
  const cantidad = { tareas: 0, quices: 0, examen: 0 };

  for (const c of calificaciones) {
    if (c.estudianteId === estudianteId) {
      suma[c.categoria] += c.nota;
      cantidad[c.categoria]++;
    }
  }

  return {
    tareas: cantidad.tareas > 0 ? suma.tareas / cantidad.tareas : 0,
    quices: cantidad.quices > 0 ? suma.quices / cantidad.quices : 0,
    examen: cantidad.examen > 0 ? suma.examen / cantidad.examen : 0,
  };
}

const calificaciones: Calificacion[] = [
  { estudianteId: 1, materia: "Programación", categoria: "tareas", nota: 4.0 },
  { estudianteId: 1, materia: "Programación", categoria: "tareas", nota: 5.0 },
  { estudianteId: 1, materia: "Programación", categoria: "quices", nota: 3.5 },
  { estudianteId: 1, materia: "Programación", categoria: "examen", nota: 4.5 },
  { estudianteId: 2, materia: "Programación", categoria: "tareas", nota: 2.0 },
];

console.log("Ejercicio 6");
console.log(promedioPorCategoria(calificaciones, 1));


// ---------- 7. Control de stock ----------
type Producto = {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: "alimentos" | "tecnologia" | "papeleria";
};

function bajoStock(producto: Producto): boolean {
  if (producto.categoria === "alimentos") {
    return producto.cantidad < 20;
  } else if (producto.categoria === "tecnologia") {
    return producto.cantidad < 5;
  } else {
    return producto.cantidad < 50;
  }
}

const productos: Producto[] = [
  { id: 1, nombre: "Arroz", cantidad: 15, categoria: "alimentos" },
  { id: 2, nombre: "Mouse", cantidad: 10, categoria: "tecnologia" },
  { id: 3, nombre: "Cuadernos", cantidad: 30, categoria: "papeleria" },
];

console.log("Ejercicio 7");
for (const p of productos) {
  console.log(p.nombre + " -> bajo stock: " + bajoStock(p));
}


// ---------- 8. Filtro de usuarios ----------
type Usuario = {
  nombre: string;
  edad: number;
  activo: boolean;
  rol: "admin" | "editor" | "visitante";
};

function filtrarUsuarios(usuarios: Usuario[]): Usuario[] {
  return usuarios.filter(u => u.edad >= 18 && u.activo && u.rol !== "visitante");
}

const usuarios: Usuario[] = [
  { nombre: "Laura", edad: 25, activo: true, rol: "admin" },
  { nombre: "Carlos", edad: 17, activo: true, rol: "editor" },
  { nombre: "Marta", edad: 30, activo: false, rol: "editor" },
  { nombre: "Pedro", edad: 40, activo: true, rol: "visitante" },
  { nombre: "Sofía", edad: 22, activo: true, rol: "editor" },
];

console.log("Ejercicio 8");
console.log(filtrarUsuarios(usuarios));


// ---------- 9. Conversor de unidades ----------
type Unidad = "cm" | "m" | "km";

function convertir(valor: number, desde: Unidad, hacia: Unidad): number {
  if (isNaN(valor)) {
    throw new Error("El valor no es un número");
  }

  if (!["cm", "m", "km"].includes(desde) || !["cm", "m", "km"].includes(hacia)) {
    throw new Error("Unidad no válida");
  }

  // primero paso todo a cm
  let enCm = valor;
  if (desde === "m") {
    enCm = valor * 100;
  } else if (desde === "km") {
    enCm = valor * 100000;
  }

  // y luego a la unidad que piden
  if (hacia === "m") {
    return enCm / 100;
  } else if (hacia === "km") {
    return enCm / 100000;
  }
  return enCm;
}

console.log("Ejercicio 9");
console.log(convertir(150, "cm", "m"));
console.log(convertir(2, "km", "m"));
console.log(convertir(500, "m", "km"));


// ---------- 10. Sistema de pagos ----------
type PagoTarjeta = { metodo: "tarjeta"; numeroTarjeta: string; cvv: string };
type PagoTransferencia = { metodo: "transferencia"; banco: string; numeroCuenta: string };
type PagoEfectivo = { metodo: "efectivo" };

type Pago = PagoTarjeta | PagoTransferencia | PagoEfectivo;

function validarPago(pago: Pago): string {
  if (pago.metodo === "tarjeta") {
    if (pago.numeroTarjeta === "" || pago.cvv === "") {
      return "Faltan datos de la tarjeta";
    }
  } else if (pago.metodo === "transferencia") {
    if (pago.banco === "" || pago.numeroCuenta === "") {
      return "Faltan datos de la transferencia";
    }
  }
  return "Pago válido";
}

console.log("Ejercicio 10");
console.log(validarPago({ metodo: "tarjeta", numeroTarjeta: "4111111111111111", cvv: "123" }));
console.log(validarPago({ metodo: "tarjeta", numeroTarjeta: "", cvv: "" }));
console.log(validarPago({ metodo: "transferencia", banco: "Bancolombia", numeroCuenta: "" }));
console.log(validarPago({ metodo: "efectivo" }));
