export const updatedMonthChartData = (chartData: any[], months: number) => {
    const chartDataCopy = [...chartData]
    
     if (months < 12) {
       const restant = chartDataCopy.length - months
       
       return chartDataCopy.slice(0, chartDataCopy.length - restant);
     }
   
     return chartDataCopy;
   };
   