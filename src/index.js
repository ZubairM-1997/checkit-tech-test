const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const compression = require('compression');
const swaggerDocument = YAML.load('./swagger.yaml')
const data = require('../data.json')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(compression());
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


const port = process.env.PORT || 8000;


app.get('/getCustomersWhoMadePurchase', (req, res) => {
    const customersMadePurchase = data.purchases
    const customers = data.customers

    const customerPurchaseIds = customersMadePurchase.map((customer) => customer.customerId)

    const result = []
    customerPurchaseIds.forEach((id) => {
        const found = customers.find((customer) => customer.id === id)
        if(found) {
            result.push(found)
        }
    })

    res.send(result)
})

app.get('/getCustomerEachProduct' , (req, res) => {

    const customerNames = new Map();
    for (const customer of data.customers) {
        customerNames.set(customer.id, `${customer.firstname} ${customer.lastname}`);
    }

    const productNames = new Map();
    for (const product of data.products) {
        productNames.set(product.id, product.name);
    }

    const result = [];


    for (const customer of data.customers) {
        const customerName = customerNames.get(customer.id);
    
        const purchases = new Map();
        for (const product of data.products) {
          purchases.set(product.id, 0);
        }
    
        for (const purchase of data.purchases) {
          if (purchase.customerId === customer.id) {
            for (const product of purchase.purchases) {
              purchases.set(product.productId, purchases.get(product.productId) + 1);
            }
          }
        }
    
        for (const product of data.products) {
          result.push({
            customerName: customerName,
            productName: productNames.get(product.id),
            numberOfPurchases: purchases.get(product.id)
          });
        }
      }

      res.send(result)
})

app.get('/getCustomersWhoBoughtMoreThanOne', (req, res) => {
    const { customers, purchases } = data

    const moreThanOnePurchase = purchases.map((purchase) => {
        if (purchase.purchases.length > 1){
            return purchase
        }
    }) 

    const result = [];

     for (let i = 0; i < moreThanOnePurchase.length; i++){
        if (moreThanOnePurchase[i] !== undefined){
            const found =  customers.find((customer) => customer.id === moreThanOnePurchase[i].customerId)
            result.push(found)
        }
    }
    
    res.send(result)
})


app.listen(port, () => {
    console.log(`Listening to requests on localhost on port ${port}`)
})

module.exports = {
    app
}