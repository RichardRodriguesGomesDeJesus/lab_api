import User from "../../models/user.model.ts";

describe("User Model", () => {
  it("Create new user", () => {
    const username = "nome1";
    const password = "hashcode1";
    const userType = 1;
    const registerDate = "XX/XX/XXXX";
    const active = 0;


    const u = new User(username, password, userType, registerDate, active);
    expect(u.username).toBe("nome1");
    expect(u.password).toBe("hashcode1");
    expect(u.userType).toBe(1);
    expect(u.registerDate).toBe("XX/XX/XXXX");
    expect(u.active).toBe(0);
  });
  it("Update result", () => {
    const username = "nome1";
    const password = "hashcode1";
    const userType = 1;
    const registerDate = "XX/XX/XXXX";
    const active = 0;


    const u = new User(username, password, userType, registerDate, active);
    expect(u.username).toBe("nome1");
    expect(u.password).toBe("hashcode1");
    expect(u.userType).toBe(1);
    expect(u.registerDate).toBe("XX/XX/XXXX");
    expect(u.active).toBe(0);
  });
});
