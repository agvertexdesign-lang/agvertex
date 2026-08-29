export const WEB3FORMS_ACCESS_KEY = "bd3e547f-f2e6-451c-bef5-bbe6549fa9d7";

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
      to_email: "agvertexdesign@gmail.com",
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
