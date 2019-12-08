import db from '../models';

const attendeeController = {};

attendeeController.addAttendee = (req, res) => {
  const { firstname, lastname, email, phonenumber } = req.body;

  db.Attendee.findOne({ $or: [{ phone: phonenumber }, { email: email }] })
    .then(a => {
      if (a !== null) {
        // The attendee already exists
        res.status(409).json({ status: false, message: 'Attendee already exists' });
      } else {
        const attendee = new db.Attendee({
          firstname,
          lastname,
          email,
          phonenumber
        });

        db.Attendee.create(attendee, (err, response) => {
          if (err) {
            res.status(500).json({ status: false, message: err.message });
          } else {
            res.status(200).json({
              status: true,
              message: 'The attendee has been successfully added',
              data: response
            });
          }
        });
      }
    })
    .catch(err => res.status(500).json({ status: false, message: err.message }));
};

attendeeController.allAttendees = (req, res) => {
  db.Attendee.find()
    .then(attendees => {
      if (!attendees.length) {
        res.status(404).json({
          status: false,
          message: 'No attendees have been added yet!',
          data: []
        });
      } else res.status(200).json({ status: true, message: 'All attendees', data: attendees });
    })
    .catch(err => res.status(500).json({ status: false, message: err.message }));
};

export default attendeeController;
