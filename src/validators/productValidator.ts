/*
  ✅ Este archivo define las **reglas de validación** para crear un producto.

  📌 ¿Por qué separar esto?
  Porque queremos que la lógica de validación esté organizada, 
  sea fácil de leer, mantener y reutilizar en otras rutas si fuera necesario.

  ⚠️ Estas reglas NO evalúan si los datos son válidos.
  Solo indican "qué condiciones debe cumplir cada campo".
  La evaluación real se hace más adelante con validationResult(req).

  Cada regla se define usando `check("campo")`, que revisa ese campo en el req.body.
*/

import { body } from "express-validator";

export const validateCreateProduct = [
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacío"),

  body("price")
    .notEmpty().withMessage("El precio no puede ir vacío")
    .isNumeric().withMessage("Debe ser un número")
    .custom(value => value > 0).withMessage("Debe ser mayor que cero"),
];

export const validateUpdateProduct = [
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacío"),

  body("price")
    .notEmpty().withMessage("El precio no puede ir vacío")
    .isNumeric().withMessage("Debe ser un número")
    .custom(value => value > 0).withMessage("Debe ser mayor que cero"),

  body("availability")
    .isBoolean().withMessage("Valor para disponibilidad no válido"),
];
