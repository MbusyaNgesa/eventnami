// utils/fetchData.ts
import axios from "axios";

export const fetchGenresAndEvents = async () => {
  try {
    const genreResponse = await axios.get<{
      success: boolean;
      data: { genreName: string }[];
    }>("https://eventnami.onrender.com/api/v1/genre");

    const eventResponse = await axios.get<{
      success: boolean;
      data: {
        _id: string;
        name: string;
        genre: string;
        location: string;
        price: number;
        image: string;
      }[];
    }>("https://eventnami.onrender.com/api/v1/event");

    return {
      genres: genreResponse.data.data || [],
      events: eventResponse.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching genres or events:", error);
    return { genres: [], events: [] };
  }
};
