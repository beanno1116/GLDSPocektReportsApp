
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

const views = {
  range: "Range",
  share: "Share",
  export: "Export"
}

const reportToolbarButtons = [
  {
    id: 1,
    name: "",
    icon: <OutlineRefreshIcon size={35} color='snow' />,
    action: "refresh"
  },
  {
    id: 2,
    name: "",
    icon: <OutlineCalendarIcon size={35} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <SendIcon size={35} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <ExportIcon size={35} color='snow' />,
    action: "export"
  },
]

const ReportDisplayView = ({ subViews,report,close }) => {
  const [isToolbarViewShowing,setIsToolbarViewShowing] = useState(false);
  const [selectedView,setSelectedView] = useState("");

  const onToolbarClick = (action) => {
    
    setIsToolbarViewShowing(true);
    setSelectedView(views[action]);
  }

  
  return (
    <div className={`${siteStyles.panel_bg} ${styles.report_display_view}`}>

        <ToolbarViewHandler views={subViews} when={isToolbarViewShowing} close={() => setIsToolbarViewShowing(false)} view={selectedView} />

        <Heading size='md' mode='lite'>{`${report.type} - ${report.group}`}</Heading>

        <Heading size='lg' mode='lite'>{report.report}</Heading>

        <FlexRow p='.5rem 0 1rem 0'>
          <Toolbar buttons={reportToolbarButtons} onClick={onToolbarClick} />
        </FlexRow>


        <FlexColumn flex='1'>          
          <div style={{position:"absolute",display:"flex",flexDirection:"column",gap:"1rem",width:"100%",height:"100%",padding:"1rem",overflowY:"scroll"}}>
            
            {/* Department Totals Card */}
            <Card>
              <Card.Title>Departments Totals</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>
                  <FlexRow p='.25rem .75rem' hAlign='space-between' vAlign='center'>
                    <span style={{flex:"2",fontSize:"1.25rem",fontWeight:"700",textAlign:"left"}}>Description</span>
                    <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"700",textAlign:"right"}}>Debit</span>
                    <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"700",textAlign:"right"}}>Credit</span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between' vAlign='center'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>GROCERY</label>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$42.00</span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>BEER & WINE</label>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>                    
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$25.45</span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>TOBACCO</label>                    
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$73.15</span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>LIQUOR</label>                      
                    <span style={{fontSize:"1.25rem",fontWeight:"700"}}></span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$122.16</span>
                  </FlexRow>

                  {/* <DisplayLabel icon='usDollar' size='sm' value={"$262.76"} borderRadius="0 0 1rem 1rem"/> */}
                  <CardTotalLabel icon='usDollar' borderRadius="0 0 1rem 1rem">
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}></span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}>${Format.stringAsMoney("262.76")}</span>
                  </CardTotalLabel>
                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total Sales Card */}
            <Card>
              <Card.Title>Total Sales</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                 <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("323.23")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Drawer Totals Card */}
            <Card>
              <Card.Title>Drawer Totals</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>
                  <FlexRow p='.25rem .75rem' hAlign='space-between' vAlign='center'>
                    <span style={{flex:"2",fontSize:"1.25rem",fontWeight:"700",textAlign:"left"}}>Description</span>
                    <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"700",textAlign:"right"}}>Debit</span>
                    <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"700",textAlign:"right"}}>Credit</span>
                  </FlexRow>
                  <FlexRow p='0 .75rem' hAlign='space-between'>
                    <label style={{flex:"2",fontSize:"1.1rem",fontWeight:"900",color:"#0316028d"}}>Dwr Cash</label>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}>$87.31</span>
                    <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span>                    
                  </FlexRow>

                  <CardTotalLabel icon='usDollar' borderRadius="0 0 1rem 1rem">
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("87.31")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total S/O Card */}
            <Card>
              <Card.Title>Total S/0</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                 <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("0.00")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total Taxes Card */}
            <Card>
              <Card.Title>Total Taxes</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                  <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("15.93")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total Plus Card */}
            <Card>
              <Card.Title>Total Plus</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                  <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("2.40")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total Loan Card */}
            <Card>
              <Card.Title>Total Loan</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                  <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("0.00")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Pickups Card */}
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


                  <CardTotalLabel icon='usDollar' borderRadius='0 0 1rem 1rem'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("254.25")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total Revenue Card*/}
            <Card>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                  <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("341.56")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}></span>
                  </CardTotalLabel>

                </FlexColumn>
              </Card.Content>
            </Card>

            {/* Total Debit/Credit Card */}
            <Card>
              <Card.Title>Total Debit/Credit</Card.Title>
              <Card.Content>
                <FlexColumn p='.25rem 0' g='.75rem' width='100%'>

                  <CardTotalLabel icon='usDollar'>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",fontSize:"1.5rem"}}>${Format.stringAsMoney("341.56")}</span>
                    <span style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:"1",padding:"0 .5rem",fontSize:"1.5rem"}}>${Format.stringAsMoney("341.56")}</span>
                  </CardTotalLabel>

                </FlexColumn>
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