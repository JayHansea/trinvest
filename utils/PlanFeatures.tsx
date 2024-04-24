interface Plan {
  Name: string;
  Deposit: string;
  Description: string;
  TotalROI: string;
}

const plans: Record<string, Plan> = {
  Bronze: {
    Name: "Bronze Plan",
    Deposit: "$100 – $29999",
    Description: "2% daily for 12 calendar days",
    TotalROI: "124%",
  },
  Gold: {
    Name: "Gold Plan",
    Deposit: "$30000 – $49999",
    Description: "3.5% daily for 13 calendar days",
    TotalROI: "145.5%",
  },
  Diamond: {
    Name: "Diamond Plan",
    Deposit: "$50000 – $50000000",
    Description: "5.5% daily for 7 calendar days",
    TotalROI: "138.5%",
  },
};

export default plans;
