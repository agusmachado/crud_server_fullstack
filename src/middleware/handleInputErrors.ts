/*
  ✅ Este archivo contiene el middleware encargado de **evaluar los resultados**
  de las reglas de validación previamente definidas.

  📌 ¿Qué hace exactamente?
  - Usa `validationResult(req)` para revisar si alguna validación falló.
  - Si hay errores, responde con status 400 y los errores detallados.
  - Si NO hay errores, llama a `next()` para pasar al siguiente middleware o handler.

  🎯 ¿Por qué separar este middleware?
  - Porque así evitamos repetir `validationResult(...)` en cada handler.
  - Porque nos da la posibilidad de personalizar el formato de errores una sola vez.
  - Porque se puede reutilizar para múltiples validadores (productos, usuarios, etc.)

  🚀 Resultado:
  Usamos este middleware justo después del validador y antes del handler.
  Ejemplo en router:
    router.post("/", validateCreateProduct, handleValidationErrors, createProduct);
*/

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
 
  console.log('Desde Middleware')
   
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, devolvemos un 400 con la lista de errores
    return res.status(400).json({ errors: errors.array() });
  } 

  // Si no hay errores, continuamos con la ejecución normal
  next(); // pasa al handler real
};
