# API Requirements

## API Endpoints
#### Products
- INDEX: 'products' [GET]
- SHOW: 'products/:id' [GET]
- CREATE: 'products' [POST] - with token in the request header

#### Users
- INDEX: 'users' [GET] - with token in the request header
- SHOW: 'users/:id' [GET] - with token in the request header
- CREATE: 'users' [POST] - with token in the request header

#### Orders
- ORDER: 'orders/user/:user_id' [GET] - with token in the request header

Note: The endpoints for the optional features ("Top 5 most popular products", "Products by category" and "Completed Orders by user") are not included in this list, as they were marked as optional and not required.



## Data Shapes
#### Product
-  id: serial
- name: varchar
- price: decimal

#### User
- id: serial
- first_name: varchar
- last_name: varchar
- password: varchar

#### Orders
- id: serial
- user_id: integer[foreign key to Users table]
- status: varchar

#### Order_Items
- id: serial
- order_id: integer[foreign key to Orders table]
- product_id: integer[foreign key to Products table]
- quantity: integer

Note: The category is not included in this Product Data Shape, as it is marked as optional and not required.


## Database Design
#### Table: products
- id: SERIAL (primary key)
- name: VARCHAR(255)
- price: DECIMAL(10,2)

#### Table: users
- id: SERIAL (primary key)
- first_name: VARCHAR(255)
- last_name: VARCHAR(255)
- password: VARCHAR(255)

#### Table: orders
- id: SERIAL (primary key)
- user_id: INTEGER (foreign key to users table)
- status: VARCHAR(20)

#### Table: order_items
- id: SERIAL (primary key)
- order_id: INTEGER (foreign key to orders table)
- product_id: INTEGER (foreign key to products table)
- quantity: INTEGER

