export const getSplitedDataInBlocks = (data: any[], blockSize: number = 100) => {
  const blocks: any[][] = [];
  
  for (let i = 0; i < data.length; i += blockSize) {
    blocks.push(data.slice(i, i + blockSize));
  }
  
  return blocks;
};