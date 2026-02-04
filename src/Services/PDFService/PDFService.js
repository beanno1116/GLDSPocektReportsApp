import jsPDF from "jspdf";



const defaultConfig = {
  orentation: "portrait",
  unit: "pt",
  format: "letter"
}


class Shape {
  width;
  height;
  x;
  y;  

  constructor(width=0,height=0,x=0,y=0,color = [0,0,0]){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  setPostion(x,y){
    this.x = x;
    this.y = y;
  }

  setDimensions(width,height){
    this.width = width;
    this.height = height;
  }

  setStrokeColor(r,g,b,a){
    this.color = [r,g,b];
  }

  setFillColor(r,g,b,a){
    this.color = [r,g,b];
  }

  setDrawType(type = "S"){
    this.drawType = type;
  }
}

class Rectangle extends Shape {

  strokeColor;
  fillColor;
  drawType;
  isRounded;
  rx;
  ry;

  constructor({drawType="S",isRounded=false}){
    super(0,0,0,0,[0,0,0]);
    this.drawType = drawType;
    this.isRounded = isRounded;
    this.strokeColor = null;
    this.fillColor = null;
  }
  
  draw(context){    
    try {
      
      if (!context) throw new Error("Cannot draw on null or undefined context");

      const colorConfig = this.configureDrawColors();
      
      if ((this.drawType === "S" || this.drawType === "FD" || this.drawType === "DF") && this.strokeColor){
        context.setDrawColor(colorConfig.stroke.r,colorConfig.stroke.g,colorConfig.stroke.b);
      }

      if ((this.drawType === "F" || this.drawType === "FD" || this.drawType === "DF") && this.fillColor){
        context.setFillColor(colorConfig.fill.r,colorConfig.fill.g,colorConfig.fill.b);
      }

      if (this.isRounded){
        context.roundedRect(this.x,this.y,this.width,this.height,this.rx,this.ry,this.drawType);
        return;
      }

      context.rect(this.x,this.y,this.width,this.height,this.drawType);

    } catch (error) {
     console.error(`[ERROR] [Rectangle] [draw] - ${error.message}`);
    }
  }

  setCornerRadius(rx,ry){
    try {
      this.rx = rx;
      this.ry = ry;
    } catch (error) {
     console.error(`[ERROR] [Rectangle] [setCornerRadius] - ${error.message}`);
    }
  }

  setStrokeColor(r,g,b,a=1){
    try {
      this.strokeColor = [r,g,b,a];
    } catch (error) {
     console.error(`[ERROR] [Rectangle] [setStrokeColor] - ${error.message}`);
    }
  }

  setFillColor(r,g,b,a=1){
    try {
      this.fillColor = [r,g,b,a];
    } catch (error) {
     console.error(`[ERROR] [Rectangle] [setFillColor] - ${error.message}`);
    }
  }

  setCornerRadius(rx,ry){
    try {
      this.rx = rx;
      this.ry = ry;
    } catch (error) {
     console.error(`[ERROR] [Rectangle] [setCornerRadius] - ${error.message}`);
    }
  }

  configureDrawColors(){
    try {
      
      const drawColorConfig = {
        stroke: {},
        fill: {}
      };

      if ((this.drawType === "S" || this.drawType === "FD" || this.drawType === "DF") && this.strokeColor){
        drawColorConfig.stroke = {
          r: this.strokeColor[0],
          g: this.strokeColor[1],
          b: this.strokeColor[2]
        }
      }

      if ((this.drawType === "F" || this.drawType === "FD" || this.drawType === "DF") && this.fillColor){
        drawColorConfig.fill = {
          r: this.fillColor[0],
          g: this.fillColor[1],
          b: this.fillColor[2]
        }
      }

      return drawColorConfig;
    
    } catch (error) {
     console.error(`[ERROR] [Rectangle] [configureDrawColor] - ${error.message}`);
    }
  }

}

class Line{
  fx;
  fy;
  tx;
  ty;
  strokeColor;
  fillColor;
  width;
  drawType;

  constructor(type){
    this.fx = 0;
    this.fy = 0;
    this.tx = 100;
    this.ty = 100;
    this.strokeColor = [0,0,0];
    this.fillColor = [0,0,0];
    this.width = 5;
    this.drawType = type ? type : "F"; 
  }

  draw(context){    
    try {
      
      if (!context) throw new Error("Cannot draw on null or undefined context");

      const colorConfig = this.configureDrawColors();
      
      if ((this.drawType === "S" || this.drawType === "FD" || this.drawType === "DF") && this.strokeColor){
        context.setDrawColor(colorConfig.stroke.r,colorConfig.stroke.g,colorConfig.stroke.b);
      }

      if ((this.drawType === "F" || this.drawType === "FD" || this.drawType === "DF") && this.fillColor){
        context.setFillColor(colorConfig.fill.r,colorConfig.fill.g,colorConfig.fill.b);
      }

      context.setLineWidth(this.width);

      context.line(this.fx,this.fy,this.tx,this.ty,this.drawType);

    } catch (error) {
     console.error(`[ERROR] [Line] [draw] - ${error.message}`);
    }
  }

  setFrom(x,y){
    try {
      this.fx = x;
      this.fy = y;
    } catch (error) {
     console.error(`[ERROR] [Line] [setFrom] - ${error.message}`);
    }
  }
  setTo(x,y){
    try {
      this.tx = x;
      this.ty = y;
    } catch (error) {
     console.error(`[ERROR] [Line] [setTo] - ${error.message}`);
    }
  }
  setFillColor(r=0,g=0,b=0){
    try {
      this.fillColor = [r,g,b];    
    } catch (error) {
     console.error(`[ERROR] [Line] [setFillColor] - ${error.message}`);
    }
  }
  setStrokeColor(r=0,g=0,b=0){
    try {
      this.strokeColor = [r,g,b];
    } catch (error) {
     console.error(`[ERROR] [Line] [setStrokeColor] - ${error.message}`);
    }
  }
  setWidth(width){
    try {
      this.width = width;
    } catch (error) {
     console.error(`[ERROR] [Line] [setWidth] - ${error.message}`);
    }
  }
  configureDrawColors(){
    try {
      
      const drawColorConfig = {
        stroke: {},
        fill: {}
      };

      if ((this.drawType === "S" || this.drawType === "FD" || this.drawType === "DF") && this.strokeColor){
        drawColorConfig.stroke = {
          r: this.strokeColor[0],
          g: this.strokeColor[1],
          b: this.strokeColor[2]
        }
      }

      if ((this.drawType === "F" || this.drawType === "FD" || this.drawType === "DF") && this.fillColor){
        drawColorConfig.fill = {
          r: this.fillColor[0],
          g: this.fillColor[1],
          b: this.fillColor[2]
        }
      }

      return drawColorConfig;
    
    } catch (error) {
     console.error(`[ERROR] [Rectangle] [configureDrawColor] - ${error.message}`);
    }
  }
}

const defaultFont = {
  size: 12,
  family: "helvetica",
  style: "normal",
  color: {r:0,g:0,b:0}
}


function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}


class PDFService {

  #document;
  #config;
  #currentContext;
  #finalY;
  #pageCount

  constructor(){
    this.#document = null;
    this.#config = null;
    this.#currentContext = null;
    this.#finalY = 0;
    this.#pageCount = 0;
  }

  finalY(){
    return this.#finalY;
  }

  createDocument(config = defaultConfig){
    try {
      this.#config = {...config,...defaultConfig};
      this.#document = new jsPDF(this.#config);
      const fontList = this.#document.getFontList();
      return this.#document;
    } catch (error) {
      console.error(`[ERROR] [PDFService] [createDocument] - ${error.message}`);
      return this.#document;
    }
  }

  rectangle({drawType = "S",isRounded = false}){
    try {

      this.#currentContext = new Rectangle({drawType,isRounded});
      return this;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [drawRectangle] - ${error.message}`);
    }
  }
  line(){
    try {
      this.#currentContext = new Line();
      return this;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [line] - ${error.message}`);
    }
  }
  withStart(x,y){
    try {
      if (!this.#currentContext) throw new Error("Cannot set position on a null or undefined context");
      this.#currentContext.setFrom(x,y);
      return this;
    } catch (error) {
      console.error(`[ERROR] [PDFService] [withStart] - ${error.message}`);
    }
  }
  withEnd(x,y){
    try {
      if (!this.#currentContext) throw new Error("Cannot set position on a null or undefined context");
      this.#currentContext.setTo(x,y);
      return this;
    } catch (error) {
      console.error(`[ERROR] [PDFService] [withEnd] - ${error.message}`);
    }
  }
  withWidth(width){
    try {
      if (!this.#currentContext) throw new Error("Cannot set position on a null or undefined context");
      this.#currentContext.setWidth(width);
      return this;
    } catch (error) {
      console.error(`[ERROR] [PDFService] [withWidth] - ${error.message}`);
    }
  }
  table(tableData,config){

    const willDrawPageHook = (hookData) => {
      const {pageNumber,table,settings,doc,cursor} = hookData;
      this.#pageCount = this.#pageCount + 1;
      if (pageNumber > 1){
        settings.margin = {top:40,right:10,bottom:10,left:10}
      }
      this.text(`Page ${pageNumber} of ${this.#pageCount}`,{x:10,y:20},{r:0,g:0,b:0},{size:12,family:"helvetica"});
    }


    autoTable(this.#document, {
      styles: { fontSize: 14 },
      startY: config.position.y,
      tableWidth: "auto",
      margin: {top:40,right:10,bottom:10,left:10},      
      headStyles: {fillColor:[0,0,0]},
      willDrawPage: config?.willDrawPageHook ? config.willDrawPageHook : willDrawPageHook,
      didParseCell: config?.didParseCell ? config.didParseCell : () => {},
      didDrawCell: config?.didDrawCell ? config.didDrawCell : () => {},
      head: [tableData.headers],
      body: [...tableData.rows],
    })

    this.#finalY = this.#document.lastAutoTable.finalY;    
    return this;
  }
  text(text,position,color,font={size:12}){
    const fontOptions = {...defaultFont,...font};
    this.#document.setFontSize(fontOptions.size);
    this.#document.setFont(fontOptions.family);
    // this.#document.setFontStyle(fontOptions.style);
    this.#document.setTextColor(color.r,color.b,color.g);
    this.#document.text(text, position.x, position.y);    
  }

  withPosition(x=0,y=0){
    try {
      if (!this.#currentContext) throw new Error("Cannot set position on a null or undefined context")
      this.#currentContext.setPostion(x,y);
      return this;
    } catch (error) {
      console.error(`[ERROR] [PDFService] [withPosition] - ${error.message}`);
    }
  }

  withSize(width=0,height=0){
    try {
      if (!this.#currentContext) throw new Error("Cannot set dimensions on a null or undefined context")
      this.#currentContext.setDimensions(width,height);      
      return this;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [withDimension] - ${error.message}`);
    }
  }

  withFillColor(r,g,b,a){
    try {
      if (!this.#currentContext) throw new Error("Cannot set fill color on a null or undefined context");
      this.#currentContext.setFillColor(r,g,b,a);
      return this;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [withColor] - ${error.message}`);
    }
  }

  withStrokeColor(r,g,b,a){
    try {
      if (!this.#currentContext) throw new Error("Cannot set stroke color on a null or undefined context");
      this.#currentContext.setStrokeColor(r,g,b,a);
      return this;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [withColor] - ${error.message}`);
    }
  }
  withCornerRadius(rx,ry){
    try {
      if (!this.#currentContext) throw new Error("Cannot set corner radius on a null or undefined context");
      this.#currentContext.setCornerRadius(rx,ry);
      return this;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [withCornerRadius] - ${error.message}`);
    }
  }

  draw(){
    try {
      if (!this.#currentContext) throw new Error("Cannot set dimensions on a null or undefined context");
      this.#currentContext.draw(this.#document);
      this.#currentContext = null;
    } catch (error) {
     console.error(`[ERROR] [PDFService] [draw] - ${error.message}`);
    }
  }
}

export default PDFService;