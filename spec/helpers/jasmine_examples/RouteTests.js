const axios = require('axios')

describe("route", function() {
    it('should load items from', async function() {
        const res = await axios.get('http://localhost:3000/items')
        expect(await res).toBeDefined()
    })

    it('should load a spec itemific', async function() {
        const res = await axios.get('http://localhost:3000/items/cheerios')
        expect(await res).toBeDefined()
    })


    it('should update', async function() {
        const res = await axios.patch('http://localhost:3000/items/cheerios', { 'name': 'cheerios', 'price': 10 })
        expect(await res.data).toBeDefined()
    })

    it('should add a new item', async function() {
        const res = await axios.post('http://localhost:3000/items', { 'name': 'milk', 'price': 10 })
        expect(await res.data).toEqual({
            "name": "milk",
            "price": 10
        })
    })


    it('should delete', async function() {
        const res = await axios.delete('http://localhost:3000/items/cheerios')
        expect(await res.data).toEqual({
            "Deleted": "cheerios"
        })
    })
});