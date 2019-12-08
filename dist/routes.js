'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

routes.get('/', function (req, res) {
  res.json({ status: true });
});

// Attendee Routes
routes.get('/attendee/all', _controllers2.default.attendeeController.allAttendees);
routes.post('/attendee/add', _controllers2.default.attendeeController.addAttendee);

// Talk Routes
routes.get('/talk/all', _controllers2.default.talkController.allTalks);
routes.post('/talk/add', _controllers2.default.talkController.addTalk);
routes.post('/talk/attendee', _controllers2.default.talkController.addAttendee);
routes.delete('/talk/delete/:id', _controllers2.default.talkController.deleteTalk);

exports.default = routes;
//# sourceMappingURL=routes.js.map