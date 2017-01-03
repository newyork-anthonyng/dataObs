/*
* JS MongoDB collection init and methods file
* Observations
*/

Observations = new Mongo.Collection('observations');

Meteor.methods({
  observationInsert: function(observationAttributes) {

    var user = Meteor.user();
    var observation = _.extend(observationAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      lastModified: new Date()
    });

    var obsId = Observations.insert(observation);

    return {
      _id: obsId
    };
  },
  observationModify: function(obsId) {
    var obs = Observations.update({'_id': obsId}, {$set: {'lastModified': new Date()}});
  },
  observationDelete: function(obsId) {
    Observations.remove({
      _id: obsId
    })
    Sequences.remove({
      obsId: obsId
    })
  }
});
