import { Review } from "../models/review.model";

class ReviewService {
  async createReview(review: any) {
    const newReview = await Review.create(review);
    if (!newReview) {
      throw new Error("Review not created.");
    }
  }

  async getTopReviews() {
    return await Review.find().sort({ rating: -1 }).limit(5);
  }

  async getReviews() {
    return await Review.find().populate("reviewBy", "-password");
  }
}

export default new ReviewService();
