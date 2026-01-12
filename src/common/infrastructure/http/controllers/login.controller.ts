import { Request, Response } from 'express'

/**
 * Controller responsável APENAS por lidar com HTTP.
 * Não deve conter regra de negócio complexa.
 */
export default function loginController(
  request: Request,
  response: Response,
): Response {
  return response.send('Login Page')
  // const { email, password } = request.body;

  // // Exemplo simples (regra de negócio NÃO deveria ficar aqui)
  // if (!email || !password) {
  //   return response.status(400).json({
  //     message: "Email e senha são obrigatórios",
  //   });
  // }

  // return response.status(200).json({
  //   message: "Login realizado com sucesso",
  // });
}
