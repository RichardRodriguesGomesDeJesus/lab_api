import { localization } from "../../utils/types.ts";
import Organization from "../../models/organization.model.ts";

describe("Organization Model", () => {
  it("Create new organization", () => {
    const name = "Org123";
    const localization: localization = {
      latitude: 0,
      longitude: 0,
    };
    const cnpj = "12345678901234";

    const org = new Organization(name, localization, 0, 0, cnpj);
    expect(org.name).toBe("Org123");
    expect(org.localization).toBe(localization);
    expect(org.cnpj).toBe(cnpj);
  });
  it("Update organization", () => {
    const name = "Org1234";
    const localization: localization = {
      latitude: 1,
      longitude: 2,
    };
    const cnpj = "12345678901234";

    const org = new Organization(name, localization, 0, 0, cnpj);

    org.name = "Org123";

    expect(org.name).toBe("Org123");
    expect(org.localization).toBe(localization);
    expect(org.cnpj).toBe(cnpj);
  });
});
