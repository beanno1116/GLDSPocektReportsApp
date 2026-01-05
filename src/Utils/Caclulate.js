
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
    const diff = changeValue - value;
    if (diff === 0) return 0; 
    return ((changeValue - value) / value) * 100;
  }
}

const Calculate = new CalculateUtility();

export default Calculate;