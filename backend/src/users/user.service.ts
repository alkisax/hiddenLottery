import { prisma } from '../prisma/client';

export const createUser = async (email: string, name?: string) => {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};
