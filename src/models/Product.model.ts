// Importamos herramientas de sequelize-typescript:
// - Table, Column: son decoradores (ahora te explico qué son).
// - Model: es la clase base que representa una tabla.
// - DataType: nos permite definir el tipo de cada dato (texto, número, etc.)
import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

/*
  📌 ¿Qué es un decorador?

  Es una forma de agregarle "metadatos" o instrucciones extra a una clase o propiedad,
  usando un símbolo @ justo antes.

  Ejemplo simple (fuera del código):
  @Decorar algo → le estoy diciendo "esto va a tener una función especial".

  En este caso, usamos decoradores para indicarle a Sequelize:
  - qué clase representa una tabla,
  - qué propiedad representa una columna,
  - y qué tipo de dato tiene esa columna.
*/

// Este decorador indica que esta clase representa una tabla en la base de datos.
// "products" será el nombre real de esa tabla en PostgreSQL.
@Table({
  tableName: "products",
  timestamps: true // ⬅️ Esto habilita createdAt y updatedAt
})
class Product extends Model {
  /*
    Cada propiedad de esta clase será una columna de la tabla "products".
    Usamos el decorador @Column para indicarlo, y definimos el tipo de dato con DataType.
  */

  // name: será una columna de tipo texto (hasta 100 caracteres).
  @Column({ type: DataType.STRING(100) })
  declare name: string;

  // price: será una columna de tipo número decimal, con hasta 6 dígitos en total y 2 decimales.
  // Ejemplo: 199.99
 // @Column({ type: DataType.FLOAT(6, 2) })
  //@Column({ type: DataType.FLOAT })
 // declare price: number;
  // Product.ts (modelo)
@Column({ type: DataType.DECIMAL(10, 2) })
declare price: string;



  @Default(true)// Acá generamos un valor por default, en caso de que no necesitemos pasar si está disponible/ availability
  // availability: será una columna de tipo booleano (solo true o false).
  // Sirve para saber si el producto está disponible o no.
  @Column({ type: DataType.BOOLEAN })
  declare availability: boolean;
}

// Exportamos la clase Product para poder usarla en otras partes del programa.
// Esto nos permite consultar, insertar o actualizar productos en la base de datos desde el código.
export default Product;

