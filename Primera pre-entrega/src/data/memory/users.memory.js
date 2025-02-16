import { faker } from "@faker-js/faker";

class UsersManager {
  #all = [];
  // metodo para crear un usuario nuevo
  create = () => {
    try {
      const fullName = faker.person.fullName().toLocaleLowerCase().split(" ");
      const email = faker.internet.email();
      const address = faker.location.streetAddress();
      const user = {
        _id: faker.database.mongodbObjectId(),
        name: fullName[0],
        lastName: fullName[1],
        email: email,
        address: address,
        password: "hola1234",
        avatar: faker.image.avatar(),
        role: faker.helpers.arrayElement(["user", "admin", "premiun"]),
      };
      this.#all.push(user);
      console.log("Nuevo usuario creado:", user);
      return user;
    } catch (error) {
      throw new Error("Error al crear usuario");
    }
  };
  readAll = () => {
    try {
      return this.#all;
    } catch (error) {
      throw error;
    }
  };
}

const usersManager = new UsersManager();

export default UsersManager;
