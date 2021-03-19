// Welcome to the tutorial!
import { createServer, Model } from 'miragejs';

export default function () {
  createServer({
    models: { reminder: Model },
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
