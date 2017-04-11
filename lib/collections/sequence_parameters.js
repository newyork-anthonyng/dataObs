/*
* JS MongoDB collection init and methods file
* SequenceParameters
*/

SequenceParameters = new Mongo.Collection('sequence_parameters');

Meteor.methods({

  removeSeqParameters: function (obj) {
    SequenceParameters.remove({
      'children.envId': obj.envId
    });

    var user = Meteor.user();

    // Insert blank to delete
    var seqParamsId = SequenceParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: {'envId': obj.envId, 'parameterPairs': 0}});

    Meteor.call('environmentModifyParam', obj.envId, function(error, result) {
      return 0;
    });

    return {
       _seqParamsId: seqParamsId
    };
  },

  exportSeqParameters: function(envId) {
    var seqParams = SequenceParameters.findOne({'children.envId': envId}) || null;

    if (seqParams == null) { return {}; }

    return seqParams['children'];

  },

  importSeqParameters: function(obj) {
    var user = Meteor.user();

    SequenceParameters.remove({
      'children.envId': obj.envId
    })

    var seqParamsId = SequenceParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    Meteor.call('environmentModifyParam', obj.envId, function(error, result) {
      return 0;
    });

    return {
       _seqParamsId: seqParamsId
    };

  },

  updateSeqParameters: function(obj) {
    SequenceParameters.remove({
      'children.envId': obj.envId
    })

    var user = Meteor.user();

    var seqParamsId = SequenceParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    Meteor.call('environmentModifyParam', obj.envId, function(error, result) {
      return 0;
    });

    return {
       _seqParamsId: seqParamsId
    };
  }
});
