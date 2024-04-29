export interface Plan {
  Name: string;
  minDeposit: string;
  maxDeposit: string;
  Description: string;
  percentageInterest: string;
  days: string;
  minTotalROI: string;
  maxTotalROI: string;
  TotalROIDesc: string;
}

const plans: Record<string, Plan> = {
  Bronze: {
    Name: "Bronze Plan",
    minDeposit: "100",
    maxDeposit: "29,999",
    Description: "2% daily for 12 calendar days",
    percentageInterest: "2",
    days: "12",
    minTotalROI: "124",
    maxTotalROI: "38044",
    TotalROIDesc: "$124 - $38,044",
  },
  Gold: {
    Name: "Gold Plan",
    minDeposit: "30,000",
    maxDeposit: "49,999",
    Description: "3.5% daily for 13 calendar days",
    percentageInterest: "3.5",
    days: "13",
    minTotalROI: "46917",
    maxTotalROI: "78223",
    TotalROIDesc: "$46,917 - $78,223",
  },
  Diamond: {
    Name: "Diamond Plan",
    minDeposit: "50,000",
    maxDeposit: "500,000",
    Description: "5.5% daily for 7 calendar days",
    percentageInterest: "5.5",
    days: "7",
    minTotalROI: "72727",
    maxTotalROI: "727500",
    TotalROIDesc: "$72,727 - $727,283",
  },
};

export default plans;
