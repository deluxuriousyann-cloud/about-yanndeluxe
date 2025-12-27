import express from "express";
import bcrypt from "bcrypt";
import db from "./data";

const app = express();
app.use(express.json());

db.run();

app.post("/signUp", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing data" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) {
        return res.status(400).json({ error: "Username already exists" });
      }

      res.json({ success: true });
    }
  );
});

db.all("SELECT username FROM users", [], (err, rows) => {
  console.log(rows);
});

app.listen(3000, () => {
    console.log('Server running on https://localhost:30000');
});
