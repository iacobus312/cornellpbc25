import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON payload, including the prediction field
    const { influencer, prediction, amount, duration, userId} = await request.json();

    // Format the data to include the prediction field
    const dataToWrite = `Influencer: ${influencer}, Prediction: ${prediction}, Amount: ${amount}, Duration: ${duration}, UserId: ${userId}\n`;

    // Define the file path to data.txt in your project's root directory
    const filePath = path.join(process.cwd(), "data.txt");

    // Append the data to the file (creates the file if it doesn't exist)
    fs.appendFileSync(filePath, dataToWrite, "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing to file:", error);
    return NextResponse.json(
      { error: "Failed to write data to file" },
      { status: 500 }
    );
  }
}
