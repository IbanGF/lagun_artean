var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    start_date: Date,
    end_date: Date,
    budgets: [{
        budget: Number,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    finalBudget: Number,
    destinations: [{
        destination: String,
        ratings: [{
            rating: Number,
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    }],
    activities: [{
        activity: String,
        ratings: [{
            rating: Number,
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    }],
    costs: [{
        name: String,
        cost: Number,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

var Trip = {

    model: mongoose.model('Trip', tripSchema),

    findAll: function(req, res) {
        Trip.model.find({}, {
            password: 0
        }, function(err, trips) {
            if (err) {
                console.log(err);
            }
            res.json(trips);
        });
    },

    findById: function(req, res) {
        Trip.model.findById(req.params.id, {
            password: 0
        }, function(err, trip) {
            res.json(trip);
        });
    },

    create: function(req, res) {
        Trip.model.create(req.body,
            function(err, trip) {
                if (!err)
                    res.send(err);
                else {
                    res.send(trip);
                }
            });
    },

    update: function(req, res) {
        Trip.model.update({
            _id: req.params.id
        }, req.body, function(err, trip) {
            console.log(trip);
            if (err)
                res.status(500).send(err.message);
            res.json(trip);
        });
    },

    delete: function(req, res) {
        Trip.model.findByIdAndRemove(req.params.id, function(err) {
            if (err)
                res.status(500).send(err.message);
            res.sendStatus(200);
        });
    }


};


module.exports = Trip;
