import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
	sub: string;
}

export function ensureAuth(
	request: Request,
	response: Response,
	next: NextFunction
) {
	//receber o token
	const authToken = request.headers.authorization;

	//validar se o token está preenchido
	//end = default message
	if (!authToken) return response.status(401).end();

	//authToken == "Bearer(space)token"
	const [, token] = authToken.split(' ');
	console.log(token);

	try {
		//validar se o token é válido
		const { sub } = verify(
			token,
			'0fed1939e0f1ca00204e21f1a7479d53'
		) as IPayload;
		request.user_id = sub;
		return next();
	} catch (err) {
		return response.status(401).end;
	}

	//recuperar informações do usuário
}
