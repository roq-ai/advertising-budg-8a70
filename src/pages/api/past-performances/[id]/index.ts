import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pastPerformanceValidationSchema } from 'validationSchema/past-performances';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.past_performance
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPastPerformanceById();
    case 'PUT':
      return updatePastPerformanceById();
    case 'DELETE':
      return deletePastPerformanceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPastPerformanceById() {
    const data = await prisma.past_performance.findFirst(convertQueryToPrismaUtil(req.query, 'past_performance'));
    return res.status(200).json(data);
  }

  async function updatePastPerformanceById() {
    await pastPerformanceValidationSchema.validate(req.body);
    const data = await prisma.past_performance.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePastPerformanceById() {
    const data = await prisma.past_performance.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
