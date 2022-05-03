import express from "express";

import request from "supertest";

import chai, { expect } from "chai";
import chaiThings from "chai-things";
import chaiJsonSchema from "chai-json-schema";
chai.use(chaiThings);
chai.use(chaiJsonSchema);

import { getAllTasksController } from '../src/controllers/tasksControllers.mjs';

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

  it('', function() {
    request(app)
      .get('/')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.body)
          .to.be.an("array")
          .that.contains.something.that.to.be.jsonSchema(fruitSchema)
      });
  });

});