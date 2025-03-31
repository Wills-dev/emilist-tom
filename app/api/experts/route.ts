import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../axiosInstance/baseUrls";

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const serviceType = searchParams.get("serviceType") || "";
    const limit = searchParams.get("limit") || "5";
    
    let url = `/business/fetch-all-business?page=1&limit=${limit}`;
    
    if (serviceType) {
      url += `&search=${serviceType}`;
    }
    
    const response = await axiosInstance.get(url);
    const { business: experts, totalBusinesses } = response.data?.data || {};
    
    return NextResponse.json({
      experts: experts || [],
      total: totalBusinesses || 0
    });
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json(
      { error: "Error fetching experts" },
      { status: 500 }
    );
  }
}
