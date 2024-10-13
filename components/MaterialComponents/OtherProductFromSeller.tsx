import ProductCard from "./ProductCard";

import { useSaveMaterials } from "@/hooks/useSaveMaterials";
import { useAddMaterialToCart } from "@/hooks/useAddMaterialToCart";

const OtherProductFromSeller = () => {
  const { handleSaveMaterial, rerender } = useSaveMaterials();
  const { addMaterialToCart, cartLoading } = useAddMaterialToCart();

  const material = {
    _id: "2",
    Id: "2",
    ProductName: "Dangote",
    productName: "Dangote",
    description:
      "   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, velit eligendi laboriosam fugit, consequatur id eum architecto suscipit obcaecati aspernatur nostrum rem deserunt nemo minima deleniti enim ipsam quod quasi ad veniam praesentium voluptates itaque. Quidem aperiam qui provident minima illo! Iusto ex tenetur vero autem dicta explicabo fugit porro.",
    price: 30000,
  };

  return (
    <section className="w-full py-8">
      {cartLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      )}
      <h5 className="sm:text-3xl text-lg font-bold py-6">
        Other proddutcs from Victor Falade
      </h5>
      <div className="flex sm:gap-4 gap-2 overflow-x-auto py-4">
        <ProductCard
          material={material}
          addMaterialToCart={addMaterialToCart}
          handleSaveMaterial={handleSaveMaterial}
        />
        <ProductCard
          material={material}
          addMaterialToCart={addMaterialToCart}
          handleSaveMaterial={handleSaveMaterial}
        />
      </div>
    </section>
  );
};

export default OtherProductFromSeller;
