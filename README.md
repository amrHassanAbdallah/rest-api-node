# Rest API Server

## Architecture
Local server
- Node.js

## Getting Started

### Development local API Server
_Location of server = /server_
Server depends on [node.js LTS Version: v6.11.2 ](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm),mongo  
Please make sure you have it installed before proceeding forward.

Great, you are ready to proceed forward; awesome!

Let's start with running commands in your terminal, known as command line interface (CLI)

###### Install project dependancies
```Install project dependancies
# npm i
```
###### Start the server
```npm start
# node server
```

## Endpoints

### GET Endpoints

#### Get all products
```
http://localhost:3000/products/
```

#### Get favorite restaurants
```
http://localhost:3000/orders/
```

#### Get a product by id
```
http://localhost:3000/products/<product_id>
```


### POST Endpoints

#### Create a new user 
```
http://localhost:3000/users/signup/
```

###### Parameters
```
{
    "email": <email>,
    "password": <pass>,
}
```

#### login a  user 
```
http://localhost:3000/users/login/
```

###### Parameters
```
{
    "email": <email>,
    "password": <pass>,
}
```

#### Create a new product 
```
http://localhost:3000/products/
```

###### Parameters
```
{
    "name": <product_name>,
    "price": <price>,
}
```

#### Create a new order 
```
http://localhost:3000/orders/
```

###### Parameters
```
{
    "productId": <product_id>,
    "quantity": <quantity>,

}
```


### PUT Endpoints


#### Update a product 
```
http://localhost:3000/products/<product_id>
```

###### Parameters
```
{
    "propName": <propName>,
    "value": <value>
}
```

#### Update a order 
```
http://localhost:3000/orders/<order_id>
```

###### Parameters
```
{
    "propName": <propName>,
    "value": <value>
}
```


### DELETE Endpoints

#### Delete a product 
```
http://localhost:3000/products/<product_id>
```


#### Delete a order 
```
http://localhost:3000/orders/<order_id>
```

#### Delete a user 
```
http://localhost:3000/users/<user_id>
```

## Middleware
### Authiontication using  jwt over orders  .

