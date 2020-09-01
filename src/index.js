import http from 'http';
import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { Sequelize } from 'sequelize';
import sizeOf from 'image-size';
import config from './config';
import PhotoModel from './models/photo.model';

const app = express();

app.server = http.createServer(app);

app.use(cors({}));

const database = new Sequelize(config.database);

// initialize models
const Photo = PhotoModel.init(database);

database.sync().then(() => {
  app.get('/', (req, res) => {
    res.send('Hello W!');
  });

  app.get('/photo', async (req, res) => {
    const photoDbData = await Photo.findAndCountAll();

    const photos = {
      count: photoDbData.count,
    };

    photos.rows = photoDbData.rows.map((photo) => {
      const imgProps = sizeOf(`uploads/${photo.dataValues.filename}`);

      return {
        width: imgProps.width,
        height: imgProps.height,
        dataValues: photo.dataValues,
      };
    });

    res.send({ success: true, photos });
  });

  app.get('/photo/:filename', (req, res) => {
    res.sendFile(join(config.uploadDir, `/${req.params.filename}`));
  });
});

console.log('жиесь');

app.server.listen(process.env.PORT || config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on port ${app.server.address().port}`);
});
