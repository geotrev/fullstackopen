import express from "express";
import morgan from "morgan";

const app = express();
app.use(express.static("dist"));

const PORT = process.env.PORT || 3001;

morgan.token("person", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status :response-time ms :person"));
app.use(express.json());

const people = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_, res) => {
  res.json(people);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = people.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

app.get("/info", (_, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`
  );
});

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).send({ error: "Name and number are required" });
  }

  const existingPerson = people.find((p) => p.name === person.name);
  if (existingPerson) {
    return res.status(400).send({ error: "Name must be unique" });
  }

  const newPerson = {
    id: (Math.random() * 1000000).toFixed(0), // Simple ID generation
    ...person,
  };
  people.push(newPerson);

  res.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const index = people.findIndex((p) => p.id === id);
  if (index !== -1) {
    people.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
