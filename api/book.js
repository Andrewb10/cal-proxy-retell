import axios from "axios";

export default async function handler(req, res) {
  const { start, attendee, bookingFieldsResponses } = req.body;

  if (!start || !attendee?.phoneNumber) {
    return res.status(200).json({ message: "Test OK – No booking made" });
  }

  try {
    const response = await axios.post("https://api.cal.com/v2/bookings", req.body, {
      headers: {
        Authorization: `Bearer ${process.env.CAL_API_KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": "2",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
}
