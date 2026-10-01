import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Token não informado.",
    });
  }

  const [tipo, token] = authHeader.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      mensagem: "Token inválido.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = payload.sub;

    next();
  } catch {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado.",
    });
  }
}
