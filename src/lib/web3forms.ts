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
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", subject);
    formData.append("from_name", "AG VERTEX Engineering Website");

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value));
      }
    });

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Web3Forms submission error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit form.",
    };
  }
}
