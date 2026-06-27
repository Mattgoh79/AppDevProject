import prisma from "../prisma/db.js";

class ArtistRepository {
  async create(data) {
    return await prisma.artist.create({ data });
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

  const totalCount = await prisma.artist.count({ where: filters });
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

  const artists = await prisma.artist.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (parsedPage - 1) * parsedPageSize,
    take: parsedPageSize,
  });

  return {
    data: artists,
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
    return await prisma.artist.findUnique({ where: { id }, include: {albums: {include: {songs: true, reviews: true}}} });
  }

  async update(id, data) {
    return await prisma.artist.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.$transaction(async (prismaTx) => {
      // Find all of tje albums 
      const albums = await prismaTx.album.findMany({ where: { artistId: id }, select: { id: true } });
      const albumIds = albums.map(a => a.id);

      // Delete reviews of the albums
      if (albumIds.length > 0) {
        await prismaTx.review.deleteMany({ where: { albumId: { in: albumIds } } });
      }

      // Delete songs 
      await prismaTx.song.deleteMany({ where: { artistId: id } });

      // Delete albums 
      await prismaTx.album.deleteMany({ where: { artistId: id } });

      // delete artist
      return await prismaTx.artist.delete({ where: { id } });
    });
  }
}

export default new ArtistRepository(); //Singleton instance