import express from 'express';
import controllers from './../controllers';

const routes = express();

routes.get('/', (req, res) => {
  res.json({ status: true });
});

// Attendee Routes
routes.get('/attendee/all', controllers.attendeeController.allAttendees);
routes.post('/attendee/add', controllers.attendeeController.addAttendee);

// Talk Routes
routes.get('/talk/all', controllers.talkController.allTalks);
routes.post('/talk/add', controllers.talkController.addTalk);
routes.post('/talk/attendee', controllers.talkController.addAttendee);

export default routes;
