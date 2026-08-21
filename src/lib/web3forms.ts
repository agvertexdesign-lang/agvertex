export const WEB3FORMS_ACCESS_KEY = "6479dd2c-745a-4923-8035-1e8ebe924c37";

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function submitToWeb3Forms(
  fields: Record<string, any>,
  subject: string = "New Inquiry from AG VERTEX Website"
): Promise<Web3FormsResponse> {
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: subject,
      from_name: "AG VERTEX Engineering Website",
      ...fields
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Web3Forms API Response:", data);

    if (!data.success) {
      console.warn("Web3Forms returned unsuccessful response:", data.message);
    }

    return data;
  } catch (error: any) {
    console.error("Web3Forms submission error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit form.",
    };
  }
}
