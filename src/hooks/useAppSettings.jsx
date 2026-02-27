import { reportWidgets, widgetComponenets } from "../Components/Widgets/widgets";
import { hashString } from "../Utils/Utils";
import { useAuth } from "./useAuth";



/*
  {
    acf: {
      hash: {
        view: {
          storeReports: {
            widgets: reportWidgets,
            widgetOrder: [],
            alerts: [],
            faqs: []
          }
        }
      }
    }
  }
*/

const VIEW_SETTING_GROUP = "view";

const STORE_REPORTS_VIEW_SETTING = "storeReports";


const appSettings = {
  view: {
      storeReports: {
        widgets: reportWidgets,
        widgetOrder: [],
        alerts: [],
        faqs: []
      }
    }
}

const settingsStore = {
  init(){
    
  },
  hashKey(key){
    return hashString(key,"uvs");
  },
  getValue(group,subgroup,setting,key){
    const settingKey = this.hashKey(key);
    const settings = JSON.parse(localStorage.getItem(settingKey));
    if (settings){
      const settingsGroup = settings[group];
      const settingsSubgoup = settingsGroup[subgroup];
      return settingsSubgoup[setting];
    }
    return appSettings;
  },
  setValue(group,subgroup,setting,key,value){
    const settingKey = this.hashKey(key);
    const settingsGroup = appSettings[group];
    const settingsSubgoup = settingsGroup[subgroup];
    settingsSubgoup[setting] = [...value];
    localStorage.setItem(settingKey,JSON.stringify(appSettings));
  }
}

const initializeAppSettings = (key) => {
  const settingsKey = settingsStore.hashKey(key);
  if (!localStorage.getItem(settingsKey)){
    localStorage.setItem(settingsKey,JSON.stringify(appSettings));
  }
}


const useAppSettings = (settingGroup,settingSubgroup) => {
  const auth = useAuth();
  const authUser = auth.getAuthUser();
  
  initializeAppSettings(authUser.id);

  const getAppSetting = () => {

  }
  const updateAppSetting = () => {

  }


  const getViewSetting = (view,setting="") => {
    const viewSetting = settingsStore.getValue(VIEW_SETTING_GROUP,view,setting,authUser.id);
    if (setting === "widgets"){
      return viewSetting.map(w => ({...w,Component:widgetComponenets[w.name]}));
    }
    return viewSetting;
  }
  const updateViewSetting = (view,setting="",value) => {
    settingsStore.setValue(VIEW_SETTING_GROUP,view,setting,authUser.id,value);
  }


  return {
    getAppSetting,
    updateAppSetting,
    getViewSetting,
    updateViewSetting,
  }
}

export default useAppSettings;