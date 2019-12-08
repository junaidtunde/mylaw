import db from '../models';

const talkController = {};

talkController.addTalk = (req, res) => {
  const { title, author, date } = req.body;

  db.Talk.findOne({ title })
    .then(t => {
      if (t !== null) {
        res.status(409).json({ status: false, message: 'Talk already exists' });
      } else {
        const talk = new db.Talk({
          title,
          author,
          date
        });

        db.Talk.create(talk, (err, completed) => {
          if (err) {
            res.status(500).json({ status: false, message: err.message });
          } else
            res.status(200).json({
              status: true,
              message: 'The talk has been successfully added',
              data: completed
            });
        });
      }
    })
    .catch(err => res.status(500).json({ status: false, message: err.message }));
};

talkController.addAttendee = (req, res) => {
  const { attendee_id, talk_id } = req.body;

  db.Attendee.findById(attendee_id)
    .then(attendee => {
      // Check to see if attendee already exists
      if (attendee === null) {
        res.status(404).json({ status: false, message: 'This attendee was not found' });
      } else {
        db.Talk.findById(talk_id)
          .then(talk => {
            if (talk === null) {
              res.status(404).json({ status: false, message: 'This attendee was not found' });
            } else {
              talk.attendees.push(attendee_id);
              attendee.talks.push(talk_id);

              talk.save().then(() => {
                attendee.save().then(() => {
                  res.status(200).json({
                    status: true,
                    message: 'The attendee has been added to the talk',
                    data: attendee
                  });
                });
              });
            }
          })
          .catch(err => res.status(500).json({ status: false, message: err.message }));
      }
    })
    .catch(err => res.status(500).json({ status: false, message: err.message }));
};

talkController.allTalks = (req, res) => {
  db.Talk.find()
    .populate('attendees')
    .then(talks => {
      if (!talks.length) {
        res.status(404).json({
          status: false,
          message: 'No talks have been added yet!',
          data: []
        });
      } else res.status(200).json({ status: true, message: 'All talks', data: talks });
    })
    .catch(err => res.status(500).json({ status: false, message: err.message }));
};

talkController.deleteTalk = (req, res) => {
  const id = req.params.id;
  db.Talk.findByIdAndDelete(id, (err, deleted) => {
    if (err) {
      res.status(500).json({ status: false, message: err.message });
    } else {
      res.status(200).json({
        status: true,
        message: 'Talk has been deleted successfully',
        data: deleted
      });
    }
  });
};

export default talkController;
