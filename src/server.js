// Welcome to the tutorial!
import { createServer } from 'miragejs';

export default function () {
  createServer({
    routes() {
      this.get('/api/reminders', () => ({
        reminders: [
          { id: 1, text: 'Walk the dog' },
          { id: 2, text: 'Take out the trash' },
          { id: 3, text: 'Work out' },
        ],
      }));

      let newId = 4;
      this.post('/api/reminders', (schema, request) => {
        // 1. request is JSON contains information about request
        // 2. requestBody is the body of request
        let attrs = JSON.parse(request.requestBody);

        attrs.id = newId++;

        return { reminder: attrs };
      });
    },
  });
}
