// import PDFService from "./PDFService/PDFService.js";

import PDFService from "./PDFService";




function getTextWidth(text, font) {
  try {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  } catch (error) {
   console.error(`[ERROR] [DocumentService] [gettextWidth] - ${error.message}`);
  }
}

const PDF_FONT_STRING = "12pt helvetica";
const ORDER_TOTAL_LABLE_SIZE = 18;
const TABLE_ROW_HEIGHT = 20;




class DocumentService {

  #pdfService;
  
  constructor(pdfService){
    this.#pdfService = pdfService;
  }

  createSalesReport({store,totals,dateRange}){
    try {
      
      const pdfDocument = this.#pdfService.createDocument();
      this.#pdfService.text("Sales Report",{x:15,y:40},{r:0,g:0,b:0},{size:40,style:"bold"});
      this.#pdfService.text(store,{x:25,y:70},{r:0,g:0,b:0},{size:24,style:"bold"});

      this.#pdfService.text("Start Date:",{x:25,y:95},{r:0,g:0,b:0},{size:16,style:"bold"});
      this.#pdfService.text("02/04/2026",{x:110,y:95},{r:0,g:0,b:0},{size:16,style:"bold"});
      
      this.#pdfService.text("End Date:",{x:25,y:120},{r:0,g:0,b:0},{size:16,style:"bold"});
      this.#pdfService.text("02/04/2026",{x:110,y:120},{r:0,g:0,b:0},{size:16,style:"bold"});

      let temp = pdfDocument.output("bloburl","salesReport.pdf");
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "100%";
      iframe.style.bottom = "100%";
      iframe.src = temp; // Your PDF path
      iframe.onload = () => {  
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };
      return iframe;
    } catch (error) {
      console.error(`[ERROR] [DocumentService] [createSalesReport] - ${error.message}`);
    }
  }


}

export default DocumentService;