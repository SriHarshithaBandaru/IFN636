const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);
const { expect } = chai;

describe("Workout API Tests", () => {
  let authToken;
  let workoutId;

  const testUser = {
    name: "Workout Tester",
    email: `workouttest_${Date.now()}@example.com`,
    password: "password123",
  };

  const testWorkout = {
    exerciseName: "Bench Press",
    category: "Strength",
    duration: 45,
    sets: 3,
    reps: 10,
    weight: 60,
    caloriesBurned: 200,
    notes: "Felt strong today",
    date: new Date().toISOString(),
  };

  // Register and login before tests
  before((done) => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send(testUser)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  describe("POST /api/workouts", () => {
    it("should create a new workout", (done) => {
      chai
        .request(app)
        .post("/api/workouts")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testWorkout)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("exerciseName", "Bench Press");
          expect(res.body).to.have.property("category", "Strength");
          expect(res.body).to.have.property("duration", 45);
          expect(res.body).to.have.property("sets", 3);
          expect(res.body).to.have.property("reps", 10);
          workoutId = res.body._id;
          done();
        });
    });

    it("should not create workout without auth", (done) => {
      chai
        .request(app)
        .post("/api/workouts")
        .send(testWorkout)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it("should not create workout without required fields", (done) => {
      chai
        .request(app)
        .post("/api/workouts")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ notes: "incomplete" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("GET /api/workouts", () => {
    it("should get all workouts for the user", (done) => {
      chai
        .request(app)
        .get("/api/workouts")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });

    it("should not get workouts without auth", (done) => {
      chai
        .request(app)
        .get("/api/workouts")
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("GET /api/workouts/:id", () => {
    it("should get a single workout by ID", (done) => {
      chai
        .request(app)
        .get(`/api/workouts/${workoutId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("exerciseName", "Bench Press");
          done();
        });
    });
  });

  describe("PUT /api/workouts/:id", () => {
    it("should update a workout", (done) => {
      chai
        .request(app)
        .put(`/api/workouts/${workoutId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ exerciseName: "Incline Bench Press", weight: 70 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property(
            "exerciseName",
            "Incline Bench Press"
          );
          expect(res.body).to.have.property("weight", 70);
          done();
        });
    });

    it("should not update workout without auth", (done) => {
      chai
        .request(app)
        .put(`/api/workouts/${workoutId}`)
        .send({ exerciseName: "Hacked Workout" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("DELETE /api/workouts/:id", () => {
    it("should delete a workout", (done) => {
      chai
        .request(app)
        .delete(`/api/workouts/${workoutId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message", "Workout removed");
          done();
        });
    });

    it("should return 404 for deleted workout", (done) => {
      chai
        .request(app)
        .get(`/api/workouts/${workoutId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
