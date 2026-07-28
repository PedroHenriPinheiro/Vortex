import { app } from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


console.log("PORT =", process.env.PORT);
console.log("DATABASE_URL =", !!process.env.DATABASE_URL);
console.log("JWT_SECRET =", !!process.env.JWT_SECRET);