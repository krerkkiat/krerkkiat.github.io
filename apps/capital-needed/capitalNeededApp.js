import Decimal from "decimal.js";

export function capitalNeededApp() {
  return {
    interest: "1000",
    interestRate: "4.0",
    capital: "25,000",

    init() {
      
    },

    onInputsChange() {
      if (this.interest.trim() === "" || this.interestRate.trim() === "") {
        this.capital = "N/A";
        return;
      }
      try {
        let interestDec = new Decimal(this.interest);
        let interestRateDec = new Decimal(this.interestRate);
        let result = interestDec.times(100).dividedBy(interestRateDec).toNumber();
        this.capital = new Intl.NumberFormat("en-US").format(result);
      } catch (error) {
        this.capital = "N/A";
      }
    },

  };
}
