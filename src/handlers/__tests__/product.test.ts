import request from 'supertest'
import server from '../../server'


describe('POST /api/products', () => {

    it('should display validation errors', async () => {
       const response = await request(server).post('/api/products').send({ }) 

       // Lo que se espera
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        // Lo que no se espera
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })


    // Testeamos que el precio se mayor a > 0

    it('should validate that the price is greater than 0', async () => {
       const response = await request(server).post('/api/products').send({
            name: 'Monitor Curvo',
            price: 0
        }) 

       // Lo que se espera
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        // Lo que no se espera
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })


    // Testeamos que el precio es un número y es mayor a > 0

    it('should validate that the price is a number and greater than 0', async () => {
       const response = await request(server).post('/api/products').send({
            name: 'Monitor Curvo',
            price: "Hola"
        }) 

       // Lo que se espera
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        // Lo que no se espera
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })


    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
        name: "Monitor Nuevo - Testing",
        price: 400
        })

        // Lo que se espera
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')


        // Lo que no se debe esperar
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => { 
    it('should check if api/products url exists', async () => {
         const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        // Lo que esperamos
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        // Lo que no esperamos        
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => { 
    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    }) 

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await request(server)
                                        .put('/api/products/not-valid-url')
                                        .send({                                            
                                            name: "Monitor curvo",
                                            availability: true,
                                            price: 300                                         
                                        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })


    it('should display validation error messages when updating a product', async() => {
        const response = await request(server).put('/api/products/1').send({})

        // Lo que esperamos
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        // Lo que no deberíamos esperar
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should validate that the price is greater than 0', async() => {
        const response = await request(server)
                                        .put('/api/products/1')
                                        .send({                                            
                                            name: "Monitor curvo",
                                            availability: true,
                                            price: 0                                         
                                        })

        // Lo que esperamos
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Debe ser mayor que cero')

        // Lo que no deberíamos esperar
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should return a 404 response for a non-existent product', async() => {
        const productId = 2000
        const response = await request(server)
                                        .put(`/api/products/${productId}`)
                                        .send({                                            
                                            name: "Monitor curvo",
                                            availability: true,
                                            price: 300                                         
                                        })

        // Lo que esperamos
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        // Lo que no deberíamos esperar
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update an existing product with valid data', async() => {
        const response = await request(server)
                                        .put(`/api/products/1`)
                                        .send({                                            
                                            name: "Monitor curvo",
                                            availability: true,
                                            price: 300                                         
                                        })

        // Lo que esperamos
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        // Lo que no deberíamos esperar
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)  

        // Lo que esperamos
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        // Lo que no esperamos
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update the products availability', async () => {
        const response = await request(server).patch(`/api/products/1`)  

        // Lo que esperamos
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')        
        expect(response.body.data.availability).toBe(false)

        // Lo que no esperamos
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')         
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid')

        // Lo que espero
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should return a 404 response for a non-existent product', async () => { 
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)

        // Lo que esperamos
        expect(response.status).toBe(404)  
        expect(response.body.error).toBe('Producto no encontrado')

        // Lo que no esperamos
        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => { 
        const response = await request(server).delete(`/api/products/1`)

        // Lo que esperamos
        expect(response.status).toBe(200)  
        expect(response.body.data).toBe('Producto Eliminado')

        // Lo que no esperamos
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})


