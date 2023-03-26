import { User } from '../interfaces/user.interface';
import { UserStore } from '../models/user';

const userStore = new UserStore();

describe('User Model', () => {
  let user: User;

  beforeAll(async () => {
    // Create a new user to be used in the tests
    const userData = {
        id: 12,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password'
    };
    user = await userStore.createUser(userData);
  });

  afterAll(async () => {
    // Delete the user created in the beforeAll hook
    
    await userStore.deleteUser(user.id);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        id: 3,
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'password'
      };
      const newUser = await userStore.createUser(userData);

      expect(newUser.id).toBeDefined();
      expect(newUser.firstName).toBe(userData.firstName);
      expect(newUser.lastName).toBe(userData.lastName);

      await userStore.deleteUser(newUser.id);
    });
  });

  describe('getUserById', () => {
    it('should return the specified user', async () => {
      const fetchedUser = await userStore.getUserById(user.id);

      expect(fetchedUser).toEqual(user);
    });

    it('should throw an error if the user does not exist', async () => {
      const invalidId = 99999;

      expectAsync(userStore.getUserById(invalidId)).toBeRejectedWithError(
        `Could not find user with id ${invalidId}`
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updatedData = {
        id: 2,
        firstName: 'Johnny',
        lastName: 'Doe',
        password: 'newpassword'
      };
      const updatedUser = await userStore.updateUser(updatedData);

      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.firstName).toBe(updatedData.firstName);
      expect(updatedUser.lastName).toBe(updatedData.lastName);

      // Make sure the password was hashed
      expect(updatedUser.password).not.toBe(updatedData.password);

      // Update the user object for use in subsequent tests
      user = updatedUser;
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const deletedUser = await userStore.deleteUser(user.id);

      expect(deletedUser).toEqual(user);

      // Attempting to fetch the deleted user should throw an error
      expectAsync(userStore.getUserById(user.id)).toBeRejectedWithError(
        `Could not find user with id ${user.id}`
      );
    });

    it('should throw an error if the user does not exist', async () => {
      const invalidId = 99999;

      expectAsync(userStore.deleteUser(invalidId)).toBeRejectedWithError(
        `Could not delete user with id ${invalidId}`
      );
    });
  });
});
