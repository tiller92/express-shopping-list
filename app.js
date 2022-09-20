const express = require('express');
const app = express();
const items = require('./fakeDb')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req, res) {

    return res.send('Home');
});


// GET /items - this should render a list of shopping items.
// Here is what a response looks like:
app.get('/items', function(req, res) {
    return res.send(items);
});

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

// POST /items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:

app.post('/items', function(req, res) {
    console.log(req.body)
    const newItems = req.body
    items.push(newItems)
    return res.send(newItems);
});

// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:

app.get('/items/:name', function(req, res) {
    const searchItem = req.params.name
    const response = {}
    console.log(searchItem, 'search')
    for (let item of items) {
        if (searchItem == item.name) {
            console.log(item, 'filter')
            response.name = item.name
            response.price = item.price
        }
    }
    return res.send(response);
});

// {“name”: “popsicle”, “price”: 1.45}

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:
app.patch('/items/:name', function(req, res) {
    const searchItem = req.params.name
    const data = req.body
    const response = {}
    for (let item of items) {
        console.log(item.name)
        if (searchItem == item.name) {
            console.log(item, 'filter')
            item.name = data.name
            item.price = data.price
            response.name = data.name
            response.oldName = item.name
            response.oldPrice = item.price
            response.price = data.price
        }
    }
    return res.send(response);
});
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

// DELETE /items/:name - this route should allow you to delete a specific item from the array.
app.delete('/items/:name', function(req, res) {
        const searchItem = req.params.name
        for (let item in items) {
            if (searchItem == items[item].name) {
                items.splice(item)
            }
        }
        return res.json({ 'Deleted': searchItem })
    })
    // Here is what a sample response looks like:

// {message: “Deleted”}


app.listen(3000, function() {
    console.log('App on port 3000');
})