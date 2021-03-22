// Welcome to the tutorial!
import {
  createServer,
  Model,
  hasMany,
  belongsTo,
  RestSerializer,
  Factory,
} from 'miragejs';

export default function () {
  createServer({
    serializers: {
      reminder: RestSerializer.extend({
        include: ['list'],
        embed: true,
      }),
    },

    models: {
      list: Model.extend({
        reminders: hasMany(),
      }),

      reminder: Model.extend({
        list: belongsTo(),
      }),
    },

    factories: {
      list: Factory.extend({
        name(i) {
          return `List ${i}`;
        },
        afterCreate(list, server) {
          server.createList('reminder', 5, { list });
        },
      }),
      reminder: Factory.extend({
        text(i) {
          return `Reminder ${i}`;
        },
      }),
    },

    seeds(server) {
      server.create('list', {
        name: 'Home',
        reminders: [server.create('reminder', { text: 'Do taxes' })],
      });

      server.create('list');
    },

    routes() {
      this.get('/api/reminders', (schema) => {
        return schema.reminders.all();
      });

      this.post('/api/reminders', (schema, request) => {
        // 1. request is JSON contains information about request
        // 2. requestBody is the body of request
        let attrs = JSON.parse(request.requestBody);

        // Mirage 會自動建立 foreign key
        return schema.reminders.create(attrs);
      });

      this.delete('/api/reminders/:id', (schema, request) => {
        let id = request.params.id;

        return schema.reminders.find(id).destroy();
      });

      // 取得 sidebar 清單
      this.get('/api/lists', (schema, request) => {
        return schema.lists.all();
      });

      // 取得根據 sidebar 的關聯提醒事項
      this.get('/api/lists/:id/reminders', (schema, request) => {
        let listId = request.params.id;
        let list = schema.lists.find(listId);

        return list.reminders;
      });
    },
  });
}
