import {
  deleteEvent,
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
} from '../controllers/events.controller';

module.exports = (router) => {
  router.route('/api/secure/events').get(getEvents);
  router.route('/api/secure/events/:id').get(getEvent);
  router.route('/api/secure/events').post(createEvent);
  router.route('/api/secure/events/:id').patch(updateEvent);
  router.route('/api/secure/events/:id').delete(deleteEvent);
};
