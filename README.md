# Shopping Cart Management API

## Routes
 - [/auth](#/auth)
 - [/user](#User) **Protected**
 - [/product](#Product) **Protected**

## `/auth`

- Route : `/auth/signup`
    - method : POST
    - JSON Body
    ```
    {
       "email":"example@email.com",
       "password":"12345"
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        user: {
            name,
            email,
            hashedpassword,
            updatedOn,
            createdOn
        }
    }
    ```

- Route : `/auth/login`
    - method : POST
    - JSON Body
    ```
    {
       "email":"example@email.com",
       "password":"12345"
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        token: "header.payload.checksum"
    }
    ```

## `/user`

- Route : `/user`
    - method : GET
    - JSON Body
    ```
    {
       
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        user: {
            name,
            email
        }
    }
    ```

- Route : `/user/cart`
    - method : GET
    - JSON Body
    ```
    {
       
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        count: number,
        products: [{
            pid,
            name,
            description,
            price,
        }]
    }
    ```

- Route : `/user/cart/add/{pid}`
    - method : POST
    - JSON Body
    ```
    {
       
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        result: {
            cid,
            uid,
            pid,
        }
    }
    ```

- Route : `/user/cart/delete/{pid}`
    - method : DELETE
    - JSON Body
    ```
    {
       
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        count : number
    }
    ```

- Route : `/user/family`
    - method : GET
    - JSON Body
    ```
    {
       
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        count : number,
        members : [{
            uid,
            email,
            name
        }]
    }
    ```

- Route : `/user/family/add`
    - method : POST
    - JSON Body
    ```
    {
       email:"member@email.com",
       password:"password"
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        relation : {
            rid,
            user_from,
            user_to,
        }
    }
    ```

- Route : `/user/family/delete`
    - method : DELETE
    - JSON Body
    ```
    {
       email:"member@email.com",
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        count: number
    }
    ```

## /product

- Route : `/product/all`
    - method : GET
    - JSON Body
    ```
    {

    }
    ```
    - Response
    ```
    {
        ok: true/false,
        products : [{
            pid,
            name,
            description,
            price
        }]
    }
    ```

- Route : `/product/add`
    - method : POST
    - JSON Body
    ```
    {
       "name":"product name",
       "description":"product description",
       "price":float
    }
    ```
    - Response
    ```
    {
        ok: true/false,
        "product":{
            pid,
            name,
            dexription,
            price,
        }
    }
    ```