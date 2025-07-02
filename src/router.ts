import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { validateCreateProduct, validateUpdateProduct } from "./validators/productValidator";
import { handleInputErrors } from "./middleware/handleInputErrors";
import { param } from "express-validator";

const router = Router()

// Routing
router.get('/', getProducts);
router.get('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById);

/* 
    VISUAL RÁPIDO DEL FLUJO

    [REQ] → validateCreateProduct
         ↓
       Si pasa: → handleValidationErrors
                    ↓
                  Si pasa: → createProduct
                               ↓
                             Se guarda el producto
*/
router.post(
  "/",                            // Ruta a la que se hace el POST
  validateCreateProduct,         // 1️⃣ Se aplican las reglas de validación
  handleInputErrors,        // 2️⃣ Se revisa si hubo errores → si todo bien: next()
  createProduct                  // 3️⃣ Si next() fue llamado → se ejecuta este handler
);

// Put reemplaza todo el objeto, no solamente lo que quiero actualizar
router.put('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  validateUpdateProduct,
  handleInputErrors,
  updateProduct  
);

// Patch reemplaza solo lo que estoy enviando para actualizar
router.patch('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  updateAvailability
);

router.delete('/:id', 
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
);

export default router