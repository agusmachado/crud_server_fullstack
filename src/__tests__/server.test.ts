/* describe('Nuestro primer test', () => {
    // Puede ser test o it es exáctamente lo mismo
    it('Debe revisar que 1 + 1 sean 2', () => {
        expect(1+1).toBe(2)
    })

    it('Debe revisar que 1 + 1 no sean 3', () => {
        expect(1+1).not.toBe(3)
    })
}) */


import request from "supertest";
import server from "../server";

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')
        console.log(res)
    })
})