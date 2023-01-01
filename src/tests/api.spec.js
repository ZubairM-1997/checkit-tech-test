const request = require("supertest")
const app = require('../index').app

describe("/getCustomersWhoMadePurchase",  () => {
    test("The response is returned with correct format", async () => {
        const response = await request(app)
        .get("/getCustomersWhoMadePurchase")
        .set("Content-Type", "application/json")

      expect(response.body[0].id).toEqual("c1");
      expect(response.body[0].firstname).toEqual("Isa");
      expect(response.body[0].lastname).toEqual("Smith");

      expect(response.body[1].id).toEqual("c3");
      expect(response.body[1].firstname).toEqual("Carter");
      expect(response.body[1].lastname).toEqual("Cooke");

      expect(response.body[2].id).toEqual("c2");
      expect(response.body[2].firstname).toEqual("Lennon");
      expect(response.body[2].lastname).toEqual("Willis");

    })
})

describe("/getCustomersWhoBoughtMoreThanOne",  () => {
    test("The response is returned with correct format", async () => {
        const response = await request(app)
        .get("/getCustomersWhoBoughtMoreThanOne")
        .set("Content-Type", "application/json")

        expect(response.body[0].id).toEqual("c1");
        expect(response.body[0].firstname).toEqual("Isa");
        expect(response.body[0].lastname).toEqual("Smith");
  
        expect(response.body[1].id).toEqual("c3");
        expect(response.body[1].firstname).toEqual("Carter");
        expect(response.body[1].lastname).toEqual("Cooke");
    })
})

describe("/getCustomerEachProduct",  () => {
    test("The response is returned with correct format", async () => {
        const response = await request(app)
        .get("/getCustomerEachProduct")
        .set("Content-Type", "application/json")

      expect(response.body.length).toEqual(16)
    })
})