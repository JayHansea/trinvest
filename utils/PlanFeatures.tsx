export interface Plan {
  Name: string;
  minDeposit: string;
  maxDeposit: string;
  Description: string;
  TotalROI: string;
}

const plans: Record<string, Plan> = {
  Bronze: {
    Name: "Bronze Plan",
    minDeposit: "$100",
    maxDeposit: "$29999",
    Description: "2% daily for 12 calendar days",
    TotalROI: "$124 - $38,044",
  },
  Gold: {
    Name: "Gold Plan",
    minDeposit: "$30000",
    maxDeposit: "$49999",
    Description: "3.5% daily for 13 calendar days",
    TotalROI: "$46,917 - $78,223",
  },
  Diamond: {
    Name: "Diamond Plan",
    minDeposit: "$50000",
    maxDeposit: "$500000",
    Description: "5.5% daily for 7 calendar days",
    TotalROI: "$72,727 - $727,283",
  },
};

export default plans;
