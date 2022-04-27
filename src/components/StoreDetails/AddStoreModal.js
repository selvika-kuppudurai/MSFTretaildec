import React, { useEffect, useState } from "react";
import { Modal } from "antd"
import { Tabs } from 'antd';
import { IoStorefrontOutline } from "react-icons/io5"
import FloorPlan from "./FloorPlan";
import FixtureInstaller from "./FixtureInstaller";
import { connect } from "react-redux";

const { TabPane } = Tabs;


const AddStoreModal = ({ visible, cancel, title, detailsModal, storeData, updatedFloorPlan }) => {

    const [activeTab, setTab] = useState("2")
    const [tabDisabled, setDisabled] = useState(true)

    const tabChange = (data) => {
        setTab(data)
    }

    const changeDisable = (data) => {

        setDisabled(data)
    }


    useEffect(() => {
        if (detailsModal) {
            setTab("3")
        }
        console.log("asdfagsfkhgasdfh", updatedFloorPlan)
    }, [])


    return (
        <>
            <Modal visible={visible} title={title} centered={true} onCancel={cancel} footer={null} width={"97%"} className="store-modal">

                <Tabs className="mb-0" type="card" onChange={(d) => tabChange(d)} activeKey={activeTab} 	>


                    <TabPane tab={"Floor Plan"} key={"2"}>
                        <FloorPlan tabChange={tabChange} cancelModal={cancel} changeDisable={changeDisable} />
                    </TabPane>
                    <TabPane tab={"Fixtures and Installer"} disabled={tabDisabled} key={"3"}  >
                        <FixtureInstaller tabChange={tabChange} cancelModal={cancel} updatedFloorPlan={updatedFloorPlan} detailsModal={detailsModal} />
                    </TabPane>
                </Tabs>

            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        storeData: state.storeInfo.storeData,
        updatedFloorPlan: state.storeInfo.updatedStoreDetails
    }
}


export default connect(mapStateToProps)(AddStoreModal);