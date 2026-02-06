
const defaults = {
  pageSize: 'LETTER',
  pageMargins: 20
}



const PDFCreator = {
  document: undefined,
  createDocument(){
    this.document = {};
    return this;
  },
  addPage({pageSize=defaults.pageSize,pageMargins=defaults.pageMargins}){
    this.document = {...this.document,pageSize,pageMargins};
    return this;
  },
  withHeader({text,margin,fontSize,isBold}){
    const headerObj = {}
    this.document = {...this.document,}
    return this;
  },
  withFooter(){
    return this;
  }

}