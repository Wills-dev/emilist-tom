import { expertise } from "@/constants/dummy";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <section className="pt-10 sm:pb-10 pb-6">
      <h5 className="sm:text-xl font-semibold">Product Details</h5>
      <p className="max-sm:text-sm max-w-[676px] w-full sm:pt-5 sm:pb-10 pt-2 pb-6">
        {description && description}
      </p>
      <h5 className="sm:text-xl font-semibold">Specification</h5>
      <ul className="max-w-[360px] max-sm:max-w-[240px] px-3 py-5">
        {expertise.map((expertise, index) => (
          <li key={index} className="w-[85%] max-sm:text-sm list-disc">
            {expertise}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductDescription;
