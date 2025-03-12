import { useEffect } from "react";

import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useUnsaveMaterial } from "@/hooks/useUnsaveMaterial";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";
import { useGetSimilarMaterials } from "@/hooks/useGetSimilarMaterials";

import ProductCard from "./ProductCard";
import SimilarMaterialSkeleton from "../Skeleton/SimilarMaterialSkeleton";

const SimillarProducts = ({ materialId }: { materialId: string }) => {
  const { handleSaveMaterial, rerender } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();
  const { handleUnsaveMaterial, unsaveRerenderr } = useUnsaveMaterial();
  const {
    loading,
    data,
    getAllSimilarMaterials,
    handleHorizontalScroll,
    containerRef,
    hasMore,
  } = useGetSimilarMaterials();

  useEffect(() => {
    getAllSimilarMaterials(materialId);
  }, [materialId, rerender, unsaveRerenderr]);

  return (
    <section className="w-full py-8">
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}
      <h5 className="sm:text-3xl text-lg font-bold py-6">Similar products</h5>
      <div
        ref={containerRef}
        onScroll={handleHorizontalScroll}
        className="flex sm:gap-4 gap-2 overflow-x-auto py-4 hide-scrollbar"
      >
        {data.length > 0 ? (
          <>
            {data?.map((material, i) => (
              <ProductCard
                key={i}
                material={material}
                addMaterialToCart={addMaterialToCart}
                handleSaveMaterial={handleSaveMaterial}
                handleUnsaveMaterial={handleUnsaveMaterial}
              />
            ))}
            {loading && <SimilarMaterialSkeleton />}
            {!hasMore && data?.length > 10 && (
              <div className=" flex items-center justify-center pr-5">
                <p className="text-gray-500 text-center whitespace-nowrap">
                  {" "}
                  No more materials
                </p>
              </div>
            )}
          </>
        ) : (
          <p>No similar material </p>
        )}
      </div>
    </section>
  );
};

export default SimillarProducts;
