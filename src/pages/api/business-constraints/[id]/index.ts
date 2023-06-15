import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { businessConstraintValidationSchema } from 'validationSchema/business-constraints';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.business_constraint
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBusinessConstraintById();
    case 'PUT':
      return updateBusinessConstraintById();
    case 'DELETE':
      return deleteBusinessConstraintById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBusinessConstraintById() {
    const data = await prisma.business_constraint.findFirst(convertQueryToPrismaUtil(req.query, 'business_constraint'));
    return res.status(200).json(data);
  }

  async function updateBusinessConstraintById() {
    await businessConstraintValidationSchema.validate(req.body);
    const data = await prisma.business_constraint.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBusinessConstraintById() {
    const data = await prisma.business_constraint.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
