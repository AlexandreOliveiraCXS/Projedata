import "dotenv/config";

import app from "./app";
import sequelize from "./config/database";

const port = Number(process.env.PORT) || 3001;

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Backend rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o backend:", error);
    process.exit(1);
  }
}

startServer();
