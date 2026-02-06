
class CalculateUtility {

  margin(totalRev,cogSold){
    try {
      const gross = totalRev - cogSold;
      if (gross === 0) return 0;
      return ((totalRev - cogSold) / totalRev) * 100;
    } catch (error) {
      console.error(`[CalculateUtility] [margin] - ${error.message}`);
    }
  }

  percentChange(value,changeValue){
    try {
      if (!value) return 0;
      const diff = changeValue - value;
      if (diff === 0) return 0; 
      return ((changeValue - value) / value) * 100;
    } catch (error) {
      console.error(`[ERROR] [Caclulate] [percentChange] - ${error.message}`);
    }
  }

  divide(dividend,divisor){
    try {
      if (divisor === 0 || !divisor || !dividend) throw new Error("Cannot divide by zero or undefined value");
      return dividend / divisor;
    } catch (error) {
      console.error(`[ERROR] [Caclulate] [divide] - ${error.message}`);
    }
  }
}

const Calculate = new CalculateUtility();

export default Calculate;