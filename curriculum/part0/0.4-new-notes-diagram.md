sequenceDiagram
participant browser
participant server

browser->>server: User completes form, POST to /new_note (content in request body)
activate server

Note left of server: New note is added to database

server->>browser: 302 redirect to /notes
deactivate server
