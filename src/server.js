// Welcome to the tutorial!
import { createServer, Model } from 'miragejs';

export default function () {
  createServer({
    models: { reminder: Model },

    seeds(server) {
      server.create('reminder', { text: 'Walk the dog' });
      server.create('reminder', { text: 'Take out the trash' });
      server.create('reminder', { text: 'Work out' });
    },

    routes() {
      this.get('/api/reminders', (schema) => {
        return schema.reminders.all();
      });

      this.post('/api/reminders', (schema, request) => {
        // 1. request is JSON contains information about request
        // 2. requestBody is the body of request
        let attrs = JSON.parse(request.requestBody);

        return schema.reminders.create(attrs);
      });
    },
  });
}
