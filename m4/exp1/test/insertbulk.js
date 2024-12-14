fetch('http://localhost:3000/api/products/bulk', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        products: [
            // Array of product objects
            {
                "name": "MacBook Pro M2",
                "description": "16-inch Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
                "price": 1999.99,
                "category": "electronics",
                "stock": 25,
                "imageUrl": "https://example.com/macbook.jpg"
            },
            {
                "name": "Samsung 4K Smart TV",
                "description": "65-inch 4K Ultra HD Smart LED TV with HDR",
                "price": 899.99,
                "category": "electronics",
                "stock": 15,
                "imageUrl": "https://example.com/samsung-tv.jpg"
            },
            {
                "name": "Sony WH-1000XM4",
                "description": "Wireless Noise-Cancelling Headphones with Bluetooth",
                "price": 349.99,
                "category": "electronics",
                "stock": 50,
                "imageUrl": "https://example.com/sony-headphones.jpg"
            },
            {
                "name": "Classic Denim Jacket",
                "description": "Vintage-style denim jacket with brass buttons",
                "price": 79.99,
                "category": "clothing",
                "stock": 100,
                "imageUrl": "https://example.com/denim-jacket.jpg"
            },
            {
                "name": "Cotton T-Shirt Pack",
                "description": "3-Pack Premium Cotton Crew Neck T-Shirts",
                "price": 29.99,
                "category": "clothing",
                "stock": 200,
                "imageUrl": "https://example.com/tshirt-pack.jpg"
            },
            {
                "name": "The Art of Programming",
                "description": "Comprehensive guide to modern programming practices",
                "price": 49.99,
                "category": "books",
                "stock": 75,
                "imageUrl": "https://example.com/programming-book.jpg"
            },
            {
                "name": "World History Encyclopedia",
                "description": "Complete world history from ancient to modern times",
                "price": 89.99,
                "category": "books",
                "stock": 30,
                "imageUrl": "https://example.com/history-book.jpg"
            },
            {
                "name": "Organic Coffee Beans",
                "description": "1kg Premium Arabica Coffee Beans from Colombia",
                "price": 24.99,
                "category": "food",
                "stock": 150,
                "imageUrl": "https://example.com/coffee-beans.jpg"
            },
            {
                "name": "Dark Chocolate Collection",
                "description": "Assorted dark chocolate bars from Belgium",
                "price": 34.99,
                "category": "food",
                "stock": 80,
                "imageUrl": "https://example.com/chocolate.jpg"
            },
            {
                "name": "Yoga Mat Premium",
                "description": "Non-slip exercise yoga mat with carrying strap",
                "price": 39.99,
                "category": "other",
                "stock": 120,
                "imageUrl": "https://example.com/yoga-mat.jpg"
            },
            {
                "name": "iPad Air",
                "description": "Latest iPad Air with 256GB storage and WiFi",
                "price": 749.99,
                "category": "electronics",
                "stock": 45,
                "imageUrl": "https://example.com/ipad-air.jpg"
            },
            {
                "name": "Winter Wool Coat",
                "description": "Luxury wool blend winter coat with inner lining",
                "price": 199.99,
                "category": "clothing",
                "stock": 60,
                "imageUrl": "https://example.com/wool-coat.jpg"
            }
        ]
    })
});