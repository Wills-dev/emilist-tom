import Link from "next/link";

type Props = {
  currentLink: number;
};

const subscriptionLinks = [
  {
    id: 2,
    name: "plans",
    link: "/dashboard/subscription/plans",
  },
  {
    id: 1,
    name: "overview",
    link: "/dashboard/subscription/overview",
  },
];

const SubscriptionToggle = ({ currentLink }: Props) => {
  return (
    <div className="w-full">
      {" "}
      <h2 className="text-xl font-bold max-sm:text-lg">Subscriptions</h2>
      <ul className="flex items-center gap-4  mt-[1rem]">
        {subscriptionLinks.map((link) => (
          <Link
            href={link.link}
            key={link?.id}
            className={`${
              currentLink === link.id
                ? "text-primary-green  border-b-primary-green border-b-2"
                : "text-[#737774]"
            } font-semibold capitalize`}
          >
            <li>{link.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionToggle;
