
import { useState } from 'react';
import XIcon from '../../../../assets/icons/XIcon';
import Button from '../../../../Components/Buttons/Button';
import IconButton from '../../../../Components/Buttons/IconButton';
import Card from '../../../../Components/Cards/Card';
import FlexColumn from '../../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import Heading from '../../../../Components/Labels/Heading';
import Toolbar from '../../../../Components/Toolbar/Toolbar';
import siteStyles from '../../../../site.module.css';
import styles from './reportDisplayView.module.css';
import CardTotalLabel from '../../../../Components/Labels/CardTotalLabel';
import Format from '../../../../../../../../OrderingPlugin/Scripts/Format';
import ToolbarViewHandler from './Components/ToolbarViewHandler';
import OutlineCalendarIcon from '../../../../assets/icons/OutlineCalendarIcon';
import OutlineRefreshIcon from '../../../../assets/icons/OutlineRefreshIcon';
import SendIcon from '../../../../assets/icons/SendIcon';
import ExportIcon from '../../../../assets/icons/ExportIcon';
import { useFetchReportData } from '../../../../Api/ApiRoutes';
import Mutate from '../../../../Utils/Mutate';
import HeaderLabel from '../../../../Components/Labels/HeaderLabel';
import SettingsIcon from '../../../../assets/icons/SettingsIcon';
import BottomNav from '../../../../Components/BottomNav/BottomNav';
import ChevronIcon from '../../../../assets/icons/ChevronIcon';
import WEAccordion from '../../../../Components/WEAccordion/WEAccordion';

const views = {
  range: "Range",
  share: "Share",
  export: "Export"
}

const reportToolbarButtons = [
  {
    id: 1,
    name: "",
    icon: <OutlineRefreshIcon size={30} color='snow' />,
    action: "refresh"
  },
  {
    id: 2,
    name: "",
    icon: <OutlineCalendarIcon size={30} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <SendIcon size={30} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <ExportIcon size={30} color='snow' />,
    action: "export"
  },
]
const cardToolbarItems = [

  {
    id: 2,
    name: "",
    icon: <OutlineCalendarIcon size={30} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <SendIcon size={30} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <ExportIcon size={30} color='snow' />,
    action: "export"
  },
    {
    id: 1,
    name: "",
    icon: <ChevronIcon size={30} />,
    action: "refresh"
  }
]

const ReportDisplayView = ({ subViews,report,close }) => {
  const {status,data} = useFetchReportData({action:"safe_details",mutate:Mutate.safeDetailsData})
  const [isToolbarViewShowing,setIsToolbarViewShowing] = useState(false);
  const [selectedView,setSelectedView] = useState("");

  const onToolbarClick = (action) => {
    
    setIsToolbarViewShowing(true);
    setSelectedView(views[action]);
  }

  if (!status.isLoading){
    const temp = data;
    console.log("Loaded")
  }

  
  return (
    <div className={`${siteStyles.panel_bg} ${styles.report_display_view}`}>

        <ToolbarViewHandler views={subViews} when={isToolbarViewShowing} close={() => setIsToolbarViewShowing(false)} view={selectedView} />

        <Heading size='md' mode='lite'>{`${report.type} - ${report.group}`}</Heading>

        <Heading size='lg' mode='lite'>{report.report}</Heading>

        <FlexRow p='0 1rem 1rem 1rem'>
          <Toolbar buttons={reportToolbarButtons} onClick={onToolbarClick} />
        </FlexRow>

        <FlexRow p='0 0 1rem 0' hAlign='center'>
          <div style={{fontSize:"1.25rem",fontWeight:"900",color:"snow"}}><span>Dec 10th 2025</span> to <span>Dec 10th 2025</span></div>
        </FlexRow>


        <FlexColumn flex='1'>      
          
          <div style={{position:"absolute",display:"flex",flexDirection:"column",gap:"1rem",width:"100%",height:"100%",padding:"0 1rem 1rem 1rem",overflowY:"scroll"}}>


            <Card>
              <Card.Title>Safe Information</Card.Title>
              <Card.Content>
                {/* <Heading size='sm'>Safe Information</Heading> */}
                {/* <Toolbar buttons={reportToolbarButtons} onClick={onToolbarClick}  borderRadius="1rem 1rem 0 0"  /> */}
                <FlexColumn p='.75rem .75rem' g='.75rem' width='100%'>

                  <div className={styles.display_row}>
                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Cash</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$1,256,4915.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Loan</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Pickup</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                          <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>

                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Check</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$915.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Pickup</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>

                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Debit Card</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$9105.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>

                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$6309.91</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>
                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Visa</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$3625.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>

                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$309.91</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>
                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Discover</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$625.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>

                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$30.91</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                </FlexColumn>



              </Card.Content>
            </Card>

            <Card>
              <Card.Title>Drawer Information</Card.Title>
              <Card.Content>
                {/* <Heading size='sm'>Safe Information</Heading> */}
                {/* <Toolbar buttons={reportToolbarButtons} onClick={onToolbarClick}  borderRadius="1rem 1rem 0 0"  /> */}
                <FlexColumn p='.75rem .75rem' g='.75rem' width='100%'>

                  <div className={styles.display_row}>
                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Cash</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$1,256,4915.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Loan</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Pickup</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                          <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>

                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Check</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$915.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Pickup</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>

                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Debit Card</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$9105.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>

                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$6309.91</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>
                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Visa</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$3625.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>

                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$309.91</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                  <div className={styles.display_row}>
                    <WEAccordion>
                      <WEAccordion.Panel>
                        <WEAccordion.Panel.Header text={<FlexRow width="100%" vAlign='center'>
                          <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d"}}>Discover</label>
                          <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                          <span style={{flex:"1",fontSize:"1.1rem",fontWeight:"700",textAlign:"right",color:"#031602e9"}}>$625.00</span>

                        </FlexRow>}/>
                        <WEAccordion.Panel.Content>

                          <FlexColumn width='100%'>
                          <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                            <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"700",color:"#0316028d"}}>Deposit</label>                  
                            <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$30.91</span>
                          </div>

                        </FlexColumn>
                        <FlexColumn width='100%' p='.5rem'>
                          <Button>View Details</Button>

                        </FlexColumn>
                        </WEAccordion.Panel.Content>
                      </WEAccordion.Panel>
                    </WEAccordion>
                  </div>

                </FlexColumn>



              </Card.Content>
            </Card>
          

            <Card>
              <Card.Title>Pickups</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>
                  <FlexRow p='.25rem .75rem' hAlign='space-between' vAlign='center'>
                    <span style={{flex:"2",fontSize:"1.25rem",fontWeight:"700",textAlign:"left"}}>Description</span>
                    <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"700",textAlign:"right"}}>Debit</span>
                    <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"700",textAlign:"right"}}>Credit</span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>Debuit Card</label>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$27.94</span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span> 
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>Visa</label>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$171.96</span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>Master</label>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$4.35</span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                  </FlexRow>
                </FlexColumn>
                  <CardTotalLabel icon='usDollar' borderRadius='0 0 1rem 1rem'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("254.25")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>
              </Card.Content>
            </Card>
<Card>
              <Card.Title>Total Loan</Card.Title>
              <Card.Content>
                {/* <FlexColumn p='.25rem 0' g='.75rem' width='100%'></FlexColumn> */}
                  <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("0.00")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>
              </Card.Content>
            </Card>
          </div>


        </FlexColumn>

        <FlexRow g='1rem' p='1rem'>
          <Button size='lg'>Done</Button>
          <IconButton size='lg' onClick={close}><XIcon size={24}/></IconButton>
        </FlexRow>
    </div>
  );
}



export default ReportDisplayView;