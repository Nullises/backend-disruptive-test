import app from "./src/app";

import sitemap from "express-sitemap-html";

sitemap.swagger("Disruptive Test - API BACKEND V1", app);

const port = 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
