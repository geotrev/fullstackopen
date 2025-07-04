import mongoose from "mongoose";

const createContact = ({ name, number, model: Model }) => {
  if (!number) {
    console.log("Please provide a number for the contact.");
    mongoose.connection.close();
    return;
  }

  const person = new Model({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const run = () => {
  if (process.argv.length < 3) {
    console.log("password argument is required");
    process.exit(1);
  }

  const password = process.argv[2];

  const url = `mongodb+srv://fullstackopen:${password}@cluster0.vywxuov.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);

  mongoose.connect(url);

  const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", phonebookSchema);

  const name = process.argv[3];
  const number = process.argv[4];

  if (name) {
    return createContact({ name, number, model: Person });
  }

  if (!name && !number) {
    Person.find({}).then((result) => {
      console.log("Phonebook:");
      result.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`);
      });
      mongoose.connection.close();
    });
  }
};

run();
