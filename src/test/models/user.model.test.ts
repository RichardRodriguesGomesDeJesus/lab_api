import { User } from "../../src/models/user.model";

describe("User Model", () => {
  test("should create a User instance", () => {
    const user = new User();
    user.name = "zépimbosca";
    user.email = "test@test.com";

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe("test@test.com");
  });
});