import { Command } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("All contacts:");
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log("Found contact:");
        console.log(contact);
      } else {
        console.log(`Contact with ID ${id} not found.`);
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("Contact added:");
      console.log(newContact);
      break;

    case "remove":
      const removed = await removeContact(id);
      if (removed) {
        console.log(`Contact with ID \x1B[32m${id}\x1B[0m removed.`);
      } else {
        console.log(`Contact with ID \x1B[31m${id}\x1B[0m not found.`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!\x1B[0m");
  }
};

invokeAction(argv);
