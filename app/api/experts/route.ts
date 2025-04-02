import { NextRequest, NextResponse } from "next/server";

type Expert = {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  services?: string[];
  rating: number;
  reviews: number;
  location: string;
};

const mockExperts = {
  mechanic: [
    {
      _id: "mech001",
      firstName: "James",
      lastName: "Wilson",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Car Repair", "Engine Diagnostics", "Brake Service"],
      rating: 4.8,
      reviews: 24,
      location: "Lagos, Nigeria"
    },
    {
      _id: "mech002",
      firstName: "Michael",
      lastName: "Johnson",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Auto Maintenance", "Transmission Repair"],
      rating: 4.5,
      reviews: 18,
      location: "Abuja, Nigeria"
    }
  ],
  plumber: [
    {
      _id: "plumb001",
      firstName: "David",
      lastName: "Smith",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Pipe Repair", "Drain Cleaning"],
      rating: 4.7,
      reviews: 32,
      location: "Lagos, Nigeria"
    }
  ],
  electrician: [
    {
      _id: "elec001",
      firstName: "Robert",
      lastName: "Brown",
      profileImage: "/assets/dummyImages/profilePic.png",
      services: ["Wiring", "Lighting Installation"],
      rating: 4.9,
      reviews: 41,
      location: "Port Harcourt, Nigeria"
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const serviceType = searchParams.get("serviceType") || "";
    const limit = parseInt(searchParams.get("limit") || "5");
    
    let experts: Expert[] = [];
    const serviceTypeLower = serviceType.toLowerCase();
    
    if (serviceType && serviceTypeLower in mockExperts) {
      experts = mockExperts[serviceTypeLower as keyof typeof mockExperts];
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
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json(
      { error: "Error fetching experts" },
      { status: 500 }
    );
  }
}
