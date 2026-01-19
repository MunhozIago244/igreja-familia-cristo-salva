import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(bodyParser.json());

const dataFilePath = (fileName) => path.join(__dirname, '..', 'local-storage', fileName);

const ensureFileExists = async (filePath) => {
  try {
    await fs.access(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, '[]', 'utf8');
    } else {
      throw error;
    }
  }
};

const appendToJsonFile = async (fileName, data) => {
  const filePath = dataFilePath(fileName);
  await ensureFileExists(filePath);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const json = JSON.parse(fileContent);
  json.push(data);
  await fs.writeFile(filePath, JSON.stringify(json, null, 2));
};

// Add a helper function to read JSON files
const readJsonFile = async (fileName) => {
  const filePath = dataFilePath(fileName);
  await ensureFileExists(filePath); // Ensure file exists before reading
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
};

app.post('/api/prayer-request', async (req, res) => {
  try {
    await appendToJsonFile('prayer-requests.json', req.body);
    res.status(200).json({ message: 'Prayer request saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving prayer request.' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    await appendToJsonFile('contact-submissions.json', req.body);
    res.status(200).json({ message: 'Contact submission saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving contact submission.' });
  }
});

app.post('/api/new-person', async (req, res) => {
  try {
    await appendToJsonFile('new-person-submissions.json', req.body);
    res.status(200).json({ message: 'New person submission saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving new person submission.' });
  }
});

app.get('/api/new-person-submissions', async (req, res) => {
  try {
    const submissions = await readJsonFile('new-person-submissions.json');
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving new person submissions.' });
  }
});

app.get('/api/contact-submissions', async (req, res) => {
  try {
    const submissions = await readJsonFile('contact-submissions.json');
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving contact submissions.' });
  }
});


app.get('/api/contact-submissions', async (req, res) => {
  try {
    const submissions = await readJsonFile('contact-submissions.json');
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving contact submissions.' });
  }
});

app.get('/api/live-status.json', async (req, res) => {
  try {
    const liveStatus = await readJsonFile('live-status.json');
    res.status(200).json(liveStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving live status.' });
  }
});

app.get('/api/sermons-list.json', async (req, res) => {
  try {
    const sermonsList = await readJsonFile('sermons-list.json');
    res.status(200).json(sermonsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving sermons list.' });
  }
});

app.get('/api/latest-sermon.json', async (req, res) => {
  try {
    const latestSermon = await readJsonFile('latest-sermon.json');
    res.status(200).json(latestSermon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving latest sermon.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
