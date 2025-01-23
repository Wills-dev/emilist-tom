import StarRating from "../StarRating/StarRating";

const ExpertReviewContent = () => {
  return (
    <div className="padding-x py-10">
      <div className="flex-c gap-2">
        <h6 className="sm:text-3xl text-xl font-bold">51 Reviews</h6>
        <div className="flex-c gap-1">
          <StarRating rating={4} />
          <p className="sm:text-sm text-xs text-gray-300">(51)</p>
        </div>
      </div>
    </div>
  );
};

export default ExpertReviewContent;
