export const fetchLocationDetails = async (address: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const { address_components } = data.results[0];
      const country = address_components.find((component: any) =>
        component.types.includes("country")
      )?.long_name;
      const state = address_components.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name;
      const city = address_components.find((component: any) =>
        component.types.includes("locality")
      )?.long_name;

      return `${city || ""}, ${state || ""}, ${country || ""}`;
    } else {
      // Return the actual address if not verified
      return address;
    }
  } catch (error) {
    // Return the actual address in case of an error
    console.error("Error fetching location details:", error);
    return address;
  }
};
