// Welcome to the tutorial!
import { createServer, Model, hasMany, belongsTo } from 'miragejs';

export default function () {
  createServer({
    models: { reminder: Model, list: Model },

    seeds(server) {
      server.create('reminder', { text: 'Walk the dog' });
      server.create('reminder', { text: 'Take out the trash' });
      server.create('reminder', { text: 'Work out' });

      server.create('list', { name: 'Home' });
      server.create('list', { name: 'Work' });
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

      this.delete('/api/reminders/:id', (schema, request) => {
        let id = request.params.id;

        return schema.reminders.find(id).destroy();
      });

      this.get('/api/lists', (schema, request) => {
        return schema.lists.all();
      });
    },
  });
}
