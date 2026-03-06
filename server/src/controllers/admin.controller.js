import prisma from "../config/prisma.js";

// Dashboard metrics for admin home cards
export const getDashboardStats = async (req, res) => {
  try {
    const [totalContacts, unreadContacts, activeJobs, publishedPosts] =
      await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({ where: { isRead: false } }),
        prisma.job.count({ where: { isActive: true } }),
        prisma.post.count({ where: { status: "PUBLISHED" } }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        unreadContacts,
        activeJobs,
        publishedPosts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
