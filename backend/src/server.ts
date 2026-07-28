import { prisma } from "./config/Prisma.js";
import { app } from "./app.js";

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await prisma.$connect();

        console.log("Prisma conectado com sucesso!");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar com o Prisma:");
        console.error(error);
    }
};

startServer();