const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  const repo = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repo);
  return res.json(repo);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoExist = repositories.findIndex((repo) => repo.id === id);
  if (repoExist < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }
  likes = repositories[repoExist].likes;
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repoExist] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repoExist = repositories.findIndex((repo) => repo.id === id);
  if (repoExist < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repoExist, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const repoExist = repositories.findIndex((repo) => repo.id === id);
  if (repoExist < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }
  const repo = repositories[repoExist];

  const { techs, url, title, likes } = repo;

  repositories[repoExist] = { id, url, title, techs, likes: likes + 1 };

  return res.json(repositories[repoExist]);
});

module.exports = app;
