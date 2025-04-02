import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../axiosInstance/baseUrls";

type Expert = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  services: string[];
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
};

type ExpertsByCategory = {
  [key: string]: Expert[];
};

const mockExperts: ExpertsByCategory = {
  mechanic: [
    {
      _id: "mech001",
      firstName: "James",
      lastName: "Wilson",
      email: "james.wilson@example.com",
      phone: "+1234567890",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Car Repair", "Engine Diagnostics", "Brake Service"],
      rating: 4.8,
      reviews: 24,
      location: "Lagos, Nigeria",
      verified: true
    },
    {
      _id: "mech002",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@example.com",
      phone: "+2345678901",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Auto Maintenance", "Transmission Repair", "Electrical Systems"],
      rating: 4.5,
      reviews: 18,
      location: "Abuja, Nigeria",
      verified: true
    }
  ],
  plumber: [
    {
      _id: "plumb001",
      firstName: "David",
      lastName: "Smith",
      email: "david.smith@example.com",
      phone: "+3456789012",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Pipe Repair", "Drain Cleaning", "Fixture Installation"],
      rating: 4.7,
      reviews: 32,
      location: "Lagos, Nigeria",
      verified: true
    }
  ],
  electrician: [
    {
      _id: "elec001",
      firstName: "Robert",
      lastName: "Brown",
      email: "robert.brown@example.com",
      phone: "+4567890123",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Wiring", "Lighting Installation", "Electrical Repairs"],
      rating: 4.9,
      reviews: 41,
      location: "Port Harcourt, Nigeria",
      verified: true
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const serviceType = searchParams.get("serviceType") || "";
    const limit = parseInt(searchParams.get("limit") || "5");
    const isPreview = process.env.NEXT_PUBLIC_PREVIEW === 'true' || 
                      typeof process !== 'undefined' && 
                      (request.url.includes('devinapps.com') || request.url.includes('netlify.app'));
    
    if (isPreview) {
      console.log("Using mock data for experts API in preview mode");
      
      let experts: Expert[] = [];
      const serviceTypeLower = serviceType.toLowerCase();
      
      if (serviceType && serviceTypeLower in mockExperts) {
        experts = mockExperts[serviceTypeLower];
      } else {
        experts = [
          ...mockExperts.mechanic,
          ...mockExperts.plumber,
          ...mockExperts.electrician
        ];
      }
      
      experts = experts.slice(0, limit);
      
      return NextResponse.json({
        experts,
        total: experts.length
      });
    }
    
    let url = `/business/fetch-all-business?page=1&limit=${limit}`;
    
    if (serviceType) {
      url += `&search=${serviceType}`;
    }
    
    try {
      const response = await axiosInstance.get(url);
      const { business: experts, totalBusinesses } = response.data?.data || {};
      
      return NextResponse.json({
        experts: experts || [],
        total: totalBusinesses || 0
      });
    } catch (apiError) {
      console.error("API error, falling back to mock data:", apiError);
      
      let experts: Expert[] = [];
      const serviceTypeLower = serviceType.toLowerCase();
      
      if (serviceType && serviceTypeLower in mockExperts) {
        experts = mockExperts[serviceTypeLower];
      } else {
        experts = [
          ...mockExperts.mechanic,
          ...mockExperts.plumber,
          ...mockExperts.electrician
        ];
      }
      
      experts = experts.slice(0, limit);
      
      return NextResponse.json({
        experts,
        total: experts.length
      });
    }
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json(
      { error: "Error fetching experts" },
      { status: 500 }
    );
  }
}
