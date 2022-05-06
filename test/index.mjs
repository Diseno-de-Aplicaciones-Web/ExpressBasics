import express from "express";

import request from "supertest";

import chai, { expect } from "chai";
import chaiThings from "chai-things";
import chaiJsonSchemaAjv from "chai-json-schema-ajv"
chai.use(chaiThings);
chai.use(chaiJsonSchemaAjv);

import { getAllTasksController } from '../src/controllers/tasksControllers.mjs';
import { taskSchema, newTaskSchema } from "../src/schemas/tasksSchemas.mjs";

describe('tasksControllers testing', function() {

  var app;

  beforeEach (function(done) {
    app = express();
    app.get('/', getAllTasksController)
    app.listen(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('has Content-Type application/json', function() {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
  });

  it('has response status code 200', function() {
    request(app)
      .get('/')
      .expect(200)
  });

  it('body is a JSON array', function() {
    request(app)
      .get('/')
      .end(function(err, res) {
        expect(res.body).to.be.an("array")
      });
  });

  it('body array elements fits task JSON schema', function() {
    request(app)
      .get('/')
      .end(function(err, res) {
        expect(res.body).contains.something.that.to.be.jsonSchema(taskSchema)
      });
  });

});