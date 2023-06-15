import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { advertiserValidationSchema } from 'validationSchema/advertisers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.advertiser
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAdvertiserById();
    case 'PUT':
      return updateAdvertiserById();
    case 'DELETE':
      return deleteAdvertiserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAdvertiserById() {
    const data = await prisma.advertiser.findFirst(convertQueryToPrismaUtil(req.query, 'advertiser'));
    return res.status(200).json(data);
  }

  async function updateAdvertiserById() {
    await advertiserValidationSchema.validate(req.body);
    const data = await prisma.advertiser.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteAdvertiserById() {
    const data = await prisma.advertiser.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
