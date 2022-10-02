> A simple inventory management system

> ## Installation
>
> 1. Clone the [repository](https://github.com/0nahid/inventory-management)
> 2. Install the dependencies
> 3. Run the server
> 4. Open the browser and go to `localhost:3000`

> ## Dependencies
>
> - `inventory-management` requires `node` and `yarn` to be installed on your system.

> ## Usage
>
> - Run `yarn` to install the dependencies.
> - Run `yarn dev` to start the server.
> - Open the browser and go to `localhost:3000`

> ## Available Routes
>
> Brand Route

- `GET /api/brand` - Get all brands
- `GET /api/brand/:id` - Get a single brand
- `POST /api/brand` - Create a brand
- `Patch /api/brand/:id` - Update a brand

> ### Example

> Create a brand

```
"name": "",
"description": "",
"email": "",
"website": "",
```

> Create a product

```
{
  "name": "",
  "description": "",
  "unit": "",
  "imageUrls": ["","","",""],
  "category": "",
  "brand": {
    "name": "brand_name",
    "id": "brand_id"
  }
}
```
