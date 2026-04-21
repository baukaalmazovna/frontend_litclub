import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Heart, Share2, MessageCircle, ThumbsUp } from "lucide-react";
import { useBookStore } from "../store/bookStore";
import type { Book } from "../types/book";
import { api } from "../api/api";

interface Review {
  id: number;
  user_id: number;
  book_id: number;
  rating: number;
  review_text: string | null;
}

export function BookDetails() {
  const { id } = useParams();
  const { fetchBookById } = useBookStore();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, review_text: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchBookById(Number(id))
        .then((data) => setBook(data))
        .finally(() => setIsLoading(false));

      // Загрузить отзывы
      api.get(`/reviews/${id}`)
        .then((res) => setReviews(res.data))
        .catch(() => setReviews([]));
    }
  }, [id]);

  const handleAddReview = async () => {
    try {
      const res = await api.post(`/reviews/${id}`, newReview);
      setReviews([...reviews, res.data]);
      setShowReviewForm(false);
      setNewReview({ rating: 5, review_text: "" });
    } catch (err) {
      alert("Нужно войти в систему чтобы оставить отзыв!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-500">Book not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center gap-4">
          <Link to="/catalog">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Book Details</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Book info card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex gap-6 mb-6">
            <img
              src={book.book_avatar || "https://via.placeholder.com/200x300"}
              alt={book.title}
              className="w-32 h-48 rounded-xl object-cover shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{book.title}</h2>
              <p className="text-lg text-gray-600 mb-3">
                {book.authors?.map((a) => `${a.first_name} ${a.last_name}`).join(", ")}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {book.genres?.map((genre) => (
                  <span key={genre.id} className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">4.5</span>
                <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                  <Heart className="w-4 h-4" /> Save
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4" />
          <h3 className="font-semibold text-gray-900 mb-2">About this book</h3>
          <p className="text-gray-600 leading-relaxed">{book.description}</p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="h-12 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            Add Review
          </button>
          <button className="h-12 rounded-xl text-sm font-medium border border-blue-500 text-blue-500 hover:bg-blue-50">
            Exchange Book
          </button>
        </div>

        {/* Review form */}
        {showReviewForm && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Add Review</h3>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })}>
                  <Star className={`w-6 h-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
            <textarea
              value={newReview.review_text}
              onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
              placeholder="Write your review..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-400 mb-3"
              rows={4}
            />
            <button
              onClick={handleAddReview}
              className="w-full h-10 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Submit
            </button>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">User #{review.user_id}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.review_text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}