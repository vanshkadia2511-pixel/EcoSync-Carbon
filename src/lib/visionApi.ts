export const extractTextFromImage = async (imageFile: File | null): Promise<string> => {
  // In a real V2, this would securely send the image to Google Cloud Vision API
  // or a multimodal LLM. We simulate the network delay and return mock parsed text.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        STORE: FreshFoods Market
        DATE: 2026-06-13
        ----------------
        1x Organic Tomatoes   $3.50
        1x Chicken Breast     $8.00
        1x Tofu               $2.50
        1x Almond Milk        $4.00
        ----------------
        TOTAL: $18.00
      `);
    }, 1500);
  });
};
