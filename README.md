A RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing books and borrow records in a library.
Features:
>Book management (CRUD operations)

>Borrow book records

>Book availability status

>Aggregate borrow summaries.

Technologies:

>Node.js

>Express.js

>TypeScript

>MongoDB + Mongoose.
----API Endpoints----

📚 Book Routes

POST /books — Create a new book

GET /books — Get all books (supports filter, sort, limit)

GET /books/:bookId — Get a book by ID

PATCH /books/:bookId — Update a book

DELETE /books/:bookId — Delete a book

📖 Borrow Routes

POST /borrows — Borrow a book

GET /borrows — Get borrow summary

----Usage----

Send requests using Postman or any REST client. Ensure your .env contains a valid MONGO_URI.

Developed by: Afsana Noor Keya
