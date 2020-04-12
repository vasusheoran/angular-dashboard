export interface IListing {

    listing: string;
    CompanyName: string;
    Series: string;
    SASSymbol: string;
    YahooSymbol: string;
}

export class Listing implements IListing { 
  
    public listing:string;
    public CompanyName: string;
    public Series:string;
    public SASSymbol:string;
    public YahooSymbol:string;
    constructor(data) { 
      this.listing = data['listing']
      this.CompanyName = data['CompanyName']
      this.Series = data['Series']
      this.SASSymbol = data['SASSymbol']
      this.YahooSymbol = data['YahooSymbol']
  
     }
  }