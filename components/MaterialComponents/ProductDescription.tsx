import { Capitalize, numberWithCommas } from "@/helpers";

const ProductDescription = ({ materialInfo }: any) => {
  return (
    <section className="pt-10 sm:pb-10 pb-6">
      <h5 className="sm:text-xl font-semibold">Product Details</h5>
      <p className="max-sm:text-sm max-w-[676px] w-full sm:pt-5 sm:pb-10 pt-2 pb-6">
        {materialInfo?.description && materialInfo?.description}
      </p>
      <h5 className="sm:text-xl font-semibold">Specification</h5>
      <div className="max-w-[360px] max-sm:max-w-[240px] py-5">
        <div className="flex gap-4">
          <h6 className="flex-1 font-medium max-sm:text-sm">Brand:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {materialInfo?.brand && Capitalize(materialInfo?.brand)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-medium max-sm:text-sm">Category:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {materialInfo?.category && Capitalize(materialInfo?.category)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-medium max-sm:text-sm">Sub category:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {materialInfo?.subCategory && Capitalize(materialInfo?.subCategory)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-medium max-sm:text-sm">
            Quantity avaliable:
          </h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {materialInfo?.availableQuantity &&
              numberWithCommas(materialInfo?.availableQuantity)}
          </p>
        </div>
        <div className="flex gap-4">
          <h6 className="flex-1 font-medium max-sm:text-sm">Store name:</h6>
          <p className="flex-1 max-sm:text-sm">
            {" "}
            {materialInfo?.storeName && materialInfo?.storeName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
