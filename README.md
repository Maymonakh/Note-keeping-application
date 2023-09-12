Notes-Keeping Application

The Notes-Keeping Application is a simple web-based note-taking application built using Node.js, Express.js, and MongoDB. It allows users to create, retrieve, update, and delete notes, as well as search for notes by title or content. The application also supports pagination for efficiently managing a large number of notes.



Features:

Create new notes with a title and content.

Retrieve a page of notes with pagination support.

Update existing notes with new titles and content.

Delete notes that are no longer needed.

Search for notes by title or content.

MongoDB for data storage.

Express.js for handling HTTP requests.



Usage:

You can interact with the Notes-Keeping Application using API requests. Here are some sample requests:

Create a New Note:

Send a POST request to http://localhost:3000/notes with a JSON body containing the title and content of the note you want to create.

Retrieve a Page of Notes:

Send a GET request to http://localhost:3000/notes with optional query parameters page and perPage to fetch paginated notes.

Delete a Note:

Send a DELETE request to http://localhost:3000/notes/:id to delete a note by its ID.

Update a Note:

Send a PUT request to http://localhost:3000/notes/:id with updated title and content fields to update a note by its ID.

Search for Notes:

Send a GET request to http://localhost:3000/notes/search with a query parameter query to search for notes by title or content.
