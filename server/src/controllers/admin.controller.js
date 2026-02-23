import prisma from "../config/prisma.js";

// Dashboard metrics for admin home cards
export const getDashboardStats = async (req, res) => {
  try {
    const [totalJobs, totalPosts, totalCompanyContacts, totalCandidateContacts] =
      await Promise.all([
        prisma.job.count(),
        prisma.post.count(),
        prisma.companyContact.count(),
        prisma.candidateContact.count(),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalJobs,
        totalPosts,
        totalCompanyContacts,
        totalCandidateContacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
