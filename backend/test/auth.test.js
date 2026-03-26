const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);
const { expect } = chai;

describe("Auth API Tests", () => {
  const testUser = {
    name: "Test User",
    email: `testuser_${Date.now()}@example.com`,
    password: "password123",
  };

  let authToken;

  describe("POST /api/auth/register", () => {
    it("should register a new user", (done) => {
      chai
        .request(app)
        .post("/api/auth/register")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("token");
          expect(res.body).to.have.property("name", testUser.name);
          expect(res.body).to.have.property("email", testUser.email);
          authToken = res.body.token;
          done();
        });
    });

    it("should not register a user with existing email", (done) => {
      chai
        .request(app)
        .post("/api/auth/register")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", (done) => {
      chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          authToken = res.body.token;
          done();
        });
    });

    it("should not login with invalid credentials", (done) => {
      chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "wrongpassword" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("GET /api/auth/profile", () => {
    it("should get user profile with valid token", (done) => {
      chai
        .request(app)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("name", testUser.name);
          expect(res.body).to.have.property("email", testUser.email);
          done();
        });
    });

    it("should not get profile without token", (done) => {
      chai
        .request(app)
        .get("/api/auth/profile")
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
