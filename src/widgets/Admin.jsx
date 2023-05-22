import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import UsersSettings from "../components/adminCompinents/UsersSettings";
import StrategySettings from "../components/adminCompinents/StrategySettings";
import BriefcaseSettings from "../components/adminCompinents/BriefcaseSettings";

const Admin = () => {
    return (
        <div style={{paddingTop:'100px'}} className='container'>
            <div className='container border border-dark rounded-3' >


                <Tabs>
                    <TabList>
                        <Tab>Торговые стратегии</Tab>
                        <Tab>Портфельные стратегии</Tab>
                        <Tab>Пользователи</Tab>
                    </TabList>

                    <TabPanel>
                        <StrategySettings/>
                    </TabPanel>
                    <TabPanel>
                        <BriefcaseSettings/>
                    </TabPanel>
                    <TabPanel>
                        <UsersSettings/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
