// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: number;
    email: string;
  };
}

type Handler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void;

export function withAuth(handler: Handler) {
  return async function (req: AuthenticatedRequest, res: NextApiResponse) {
    try {
      // Get the token from the cookies
      const token = getCookie('token', { req, res }) as string;

      // If no token is found, return 401
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      // Verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      ) as {
        userId: number;
        email: string;
      };

      // Attach the user info to the request
      req.user = decoded;

      // Call the original handler
      return await handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  };
}