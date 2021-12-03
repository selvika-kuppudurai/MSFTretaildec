// export const BASE_URL = "https://localhost:5001/api";

export const BASE_URL = "https://uiwireframe20210817124650.azurewebsites.net/api"

// https://uiwireframe20210817124650.azurewebsites.net/api
// https://uiwireframe20210817124650.azurewebsites.net/

// api endpoints
export const endPoints = {
    user: {
        role: `${BASE_URL}/MRRPilot/RoleAction`,
        admins: `${BASE_URL}/MRRPilot/GetAdminEmail`
    },
    summary: {
        table_Data_summary: `${BASE_URL}/MRRPilot/GetSummary`
    },
    deepDive: {
        table_Data: `${BASE_URL}/MRRPilot`,
    },
    dropdowndata: {
        dropdownlistapi: `${BASE_URL}/MRRPilot/GetDropDownList`
    },
    // dropdowndata: {
    //     dropdownlistapi: `${BASE_URL}/MRRPilot/GetDropdownFilters`
    // },
    storeInfo: {
        glid: `${BASE_URL}/MRRPilot/CheckReptoolGLID`,
        addStore: `${BASE_URL}/MRRPilot/AddStore`,
        loadOptions: `${BASE_URL}/MRRPilot/GetMaterialInfoDropdown`,
        checkAssetId: `${BASE_URL}/MRRPilot/CheckAssetTagid`,
    },
    tabs:
    {
        fixtures: `${BASE_URL}/MRRPilot/GetAllTabDetails`
    },
    userManage: {
        approvals: `${BASE_URL}/MRRPilot/GetApprovalDetails`,
        approvalsAction: `${BASE_URL}/MRRPilot/Approvals Action`,
        approvalDetails: `${BASE_URL}/MRRPilot/GetTxnApprovalGLID`,
        activityTrack: `${BASE_URL}/MRRPilot/GetUpdatedByDetails`,
    }
}

// Bing map api key
export const MAP_API_KEY = "AqRB_kd_i08O58xxHc8yGYwegchRJzjRxdC8K0H_29l_fVUntBJzjhyiYZ-OueaR"

// Alc1cUMWxbh-RaSOJKaeV15A_dNN4k06JAI_5wgJIcotFUO0Phbq2qMptsqo478g