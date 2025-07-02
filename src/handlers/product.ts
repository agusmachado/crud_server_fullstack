import { Request, Response } from "express";
import Product from "../models/Product.model";

//Obtener productos
/* export const  getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [ ['price', 'DESC'] ],
    attributes: {exclude: ['createdAt','updatedAt']}
  })
  console.log('Desde getProducts', products)

  res.json({data: products})  
} */
// src/handlers/products.ts
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [['id', 'DESC']],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true, // 👈 importante para que devuelva objetos planos, no instancias Sequelize
  });

  // Convertir price de string a number antes de enviar
  const formattedProducts = products.map(product => ({
    ...product,
    price: parseFloat(product.price),
  }));

  res.json({ data: formattedProducts });
};


export const getProductById = async (req: Request, res: Response) => {
  //console.log('Desde getProductById') 
  // console.log(req.params.id) 
  const { id } = req.params
  const product = await Product.findByPk(id, { raw: true })

  if (!product) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    })
  }

  res.json({
    data: {
      ...product,
      price: parseFloat(product.price), // ✅ transforma a number
    }
  })
}

export const createProduct = async (req: Request, res: Response) => {
  
    const product = await Product.create(req.body);

    res.status(201).json({ data: product });  
};

export const updateProduct = async (req: Request, res: Response) => {  
  
    // Verificamos que el producto exista
    const {id} = req.params
      const product = await Product.findByPk(id)

      if (!product) {
        return res.status(404).json({
          error:'Producto no encontrado'          
        })
      }
      // Si el producto existe y está todo ok. Actualizamos
      //console.log(req.body) // En el Body de Thunder Client o Postman puedo probar de escribir un json con modificaciones
      await product.update(req.body)
      await product.save()

      res.json({data: product})
      // res.json("Desde PUT")  
}

export const updateAvailability = async (req: Request, res: Response) => {  
    // Verificamos que el producto exista
    const {id} = req.params
      const product = await Product.findByPk(id)

      if (!product) {
        return res.status(404).json({
          error:'Producto no encontrado'          
        })
      }
      // Si el producto existe y está todo ok. Actualizamos
      //console.log(req.body) // En el Body de Thunder Client o Postman puedo probar de escribir un json con modificaciones
      product.availability = !product.dataValues.availability
      await product.save()

      console.log(product.dataValues)
      
      console.log('Valor recibido de availability:', !product.dataValues.availability);

      res.json({data: product})  
}


export const deleteProduct = async (req: Request, res: Response) => {  

    // Verificamos que el producto exista
      const {id} = req.params
      const product = await Product.findByPk(id)

      if (!product) {
        return res.status(404).json({
          error:'Producto no encontrado'          
        })
      }

      await product.destroy()
      res.json({data: 'Producto Eliminado'})
}