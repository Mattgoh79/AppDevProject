import prisma from "../prisma/db.js";

class ReviewRepository {
  async create(data) {
    return await prisma.review.create({ data });
  }

async findAll(
  filters = {},
  sortBy = "id",
  sortOrder = "asc",
  page = "1",
  pageSize = "10"
) {
  // Ensure page and pageSize are positive integers
  const parsedPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
  const parsedPageSize = parseInt(pageSize, 10) > 0 ? parseInt(pageSize, 10) : 10;

  const totalCount = await prisma.review.count({ where: filters });
  const totalPages = Math.ceil(totalCount / parsedPageSize);

  // Build dynamic WHERE clause from filters
  const where = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      if (typeof value === "string") {
        Object.assign(where, { [key]: { contains: value } });
      } else if (typeof value === "boolean" || typeof value === "number") {
        Object.assign(where, { [key]: { equals: value } });
      }
    }
  }

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (parsedPage - 1) * parsedPageSize,
    take: parsedPageSize,
  });

  return {
    data: reviews,
    pagination: {
      currentPage: parsedPage,
      pageSize: parsedPageSize,
      totalCount,
      totalPages,
      nextPage: parsedPage < totalPages ? parsedPage + 1 : null,
      prevPage: parsedPage > 1 ? parsedPage - 1 : null,
    },
  };
}

  async findById(id) {
    return await prisma.review.findUnique({ where: { id } });
  }

  async update(id, data) {
    return await prisma.review.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.review.delete({ where: { id } });
  }
}

export default new ReviewRepository(); // Singleton instance