export interface RegisterType {
  email: string;
  password: string;
  userName: string;
}

export interface AboutBusinessProps {
  ownerName?: string;
  businessName?: string;
  yearFounded?: string;
  employees?: string;
  businessAddress?: string;
  statee?: string;
  startPrice?: string;
  noticePeriod?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  contactPersonEmail?: string;
}

export interface InsuranceFormProps {
  insuringOrganization: string;
  typeOfCover: string;
  description: string;
}

export interface HiringDetails {
  fullName: string;
  jobType: string;
  jobDetails: string;
  location: string;
}

export interface MilestonePer {
  id: string;
  duration: string;
  durationType: string;
  details: string;
  amount: any;
  milestoneStatus: string;
  percentage: any;
}

export interface PostJobType {
  category: string;
  service: string;
  projectTitle: string;
  description: string;
  projectDuration: number | string;
  projectDurationType: string;
  maximumPrice: any;
  bidRange: number | string;
  location: string;
  expertLevel: string;
  milestonesNumber: number;
  budget: any;
}

export interface MaterialDetailType {
  product_name: string;
  brand: string;
  description: string;
  quantity_available: string | number;
  price: string | number;
  supplier: string;
  location: string;
}

export interface EditMaterialInfoType {
  productName: string;
  brand: string;
  description: string;
  quantityAvailable: string | number;
  price: string | number;
  supplier: string;
  location: string;
}

export interface ToggleLinkType {
  id: number;
  name: string;
  link: string;
}

export type CartItemType = {
  materialId: string;
  materialName: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type QuoteModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  jobInfo: any;
  getJobInfo: any;
};

export interface PaymentDetails {
  amountpaid: number | string;
  paymentmethod: string;
  date: string;
}

export interface ContractType {
  recommendVendor: "Yes" | "No" | "Maybe";
  review: string;
}

export interface Job {
  jobTitle: string;
  category: string;
  service: string;
  location: string;
  description: string;
  maxPrice: number;
  bidRange: number;
  expertLevel: string;
  projectDuration: string;
  milestoneNumber: number;
  milestoneDetails: any[];
}

export interface JobRegular {
  jobTitle: string;
  Category: string;
  service: string;
  Location: string;
  Description: string;
  expertLevel: string;
  projectDuration: string;
  milestoneNumber: number;
  milestoneDetails: any[];
  Amount: number;
}

export interface MembershipProps {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
}
