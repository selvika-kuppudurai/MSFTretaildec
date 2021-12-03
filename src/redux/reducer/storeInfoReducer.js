/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    repToolError: false,
    storeError: false,
    Glid: null,
    storeData: {
        result: "",
        executionResult: "",
        fixedSelection: "",
        graphicsLanguage: "",
        model: "",
        fixtures: "",
        status: "",
        materialInfo: []
    },
    storeInfoDetails: {
        floorPlan: "",
    },
    storeFixtureDetails: {
        fixtureInstaller: ""
    },
    updatedStoreDetails: {
        floorPlan: {
            executionResult: "",
            subpm: "",
            fixedSelection: "",
            BackwallCustomSpecifications: "",
            SpecialRequests: "",
            GraphicsLanguage: "",
            PicturesofSpace: [],
            PicturesofSpaceFiles: [],
            _2dPlanFiles: [],
            _3dPlanFiles: [],
            QuadPlanFiles: [],
            FloorPlanFiles: [],
            _2dlink: [],
            _3dRlink: [],
            Quadlink: [],
            Floorplanlink: [],
            Picofspacelink: [],
            FloorPlan: [],
            _2dPlan: [],
            _3dRender: [],
            Quad: [],
        }
    },
    glidLoading: true
}


export default function (state = initialState, action) {
    const { type, payload } = action

    console.log("777", payload)

    switch (type) {
        case "GLID_CHECK":

            return {
                ...state,
                repToolError: payload.repTool,
                storeError: payload.storeError,
                storeData: { result: [] }
            }
        case "GLID_AVAIL":

            return {
                ...state,
                repToolError: payload.repTool,
                storeError: payload.storeError,
                storeData: { result: payload.result ? payload.result[0] : [], materialInfo: payload.materialInfo, executionResult: payload.executionResult.map(d => d.executionTier1), fixedSelection: payload.fixedSelection && payload.fixedSelection.map(d => d.fixedSelection1), graphicsLanguage: payload.graphicsLanguage && payload.graphicsLanguage.map(d => d.language), model: payload.model && payload.model.map(d => d.model), fixtures: payload.fixtures && payload.fixtures.map(d => d.fixture), status: payload.status && payload.status.map(d => d.status), fixtureDescription: payload.fixtureDescription.map(d => d.fixtureDescription) }
            }
        case "GLID_DATA_STORE":
            return {
                ...state,
                repToolError: payload.repTool,
                storeError: payload.storeError,
                storeData: { result: payload.result, executionResult: payload.executionResult.map(d => d.executionTier1), fixedSelection: payload.fixedSelection.map(d => d.fixedSelection1), graphicsLanguage: payload.graphicsLanguage.map(d => d.language), model: payload.model.map(d => d.model), fixtures: payload.fixtures.map(d => d.fixture), status: payload.status.map(d => d.status), fixtureDescription: payload.fixtureDescription.map(d => d.fixtureDescription) }
            }
        case "STORE_INFO_DETAILS":

            return {
                ...state,

                storeInfoDetails: {
                    floorPlan: payload
                }
            }
        case "STORE_FIXTURE_DETAILS":
            return {
                ...state,
                storeFixtureDetails: {
                    fixtureInstaller: payload
                }
            }
        case "UPDATE_FLOOR_PLAN":
            return {
                ...state,
                updatedStoreDetails: {
                    floorPlan: {
                        executionResult: payload.executionTier === null ? "" : payload.executionTier,
                        subpm: payload.subPmname === null ? "" : payload.subPmname,
                        fixedSelection: payload.fixedSelection ? "" : payload.fixedSelection,
                        BackwallCustomSpecifications: payload.backwallCustomSpecifications === null ? "" : payload.backwallCustomSpecifications,
                        SpecialRequests: payload.specialRequests === null ? "" : payload.specialRequests,
                        GraphicsLanguage: payload.graphicsLanguage === null ? "" : payload.graphicsLanguage,
                        PicturesofSpace: (payload.picturesofSpace === "" || payload.picturesofSpace === null) ? [] : payload.picturesofSpace.split(","),
                        PicturesofSpaceFiles: (payload.picturesofSpace === "" || payload.picturesofSpace === null) ? [] : payload.picturesofSpace.split(","),
                        _2dPlanFiles: (payload._2dPlan === "" || payload._2dPlan === null) ? [] : payload._2dPlan.split(","),
                        _3dPlanFiles: (payload._3dRender === "" || payload._3dRender === null) ? [] : payload._3dRender.split(","),
                        QuadPlanFiles: (payload.quad === "" || payload.quad === null) ? [] : payload.quad.split(","),
                        FloorPlanFiles: (payload.floorplan === "" || payload.floorplan === null) ? [] : payload.floorplan.split(","),
                        _2dlink: (payload._2dPlan === "" || payload._2dPlan === null) ? [] : payload._2dPlan.split(","),
                        _3dRlink: (payload._3dRender === "" || payload._3dRender === null) ? [] : payload._3dRender.split(","),
                        Quadlink: (payload.quad === "" || payload.quad === null) ? [] : payload.quad.split(","),
                        Floorplanlink: (payload.floorplan === "" || payload.floorplan === null) ? [] : payload.floorplan.split(","),
                        Picofspacelink: (payload.picturesofSpace === "" || payload.picturesofSpace === null) ? [] : payload.picturesofSpace.split(","),
                        FloorPlan: (payload.floorplan === "" || payload.floorplan === null) ? [] : payload.floorplan.split(","),
                        _2dPlan: (payload._2dPlan === "" || payload._2dPlan === null) ? [] : payload._2dPlan.split(","),
                        _3dRender: (payload._3dRender === "" || payload._3dRender === null) ? [] : payload._3dRender.split(","),
                        Quad: (payload.quad === "" || payload.quad === null) ? [] :
                            payload.quad.split(","),
                    }
                }
            }
        case "GLID_CLEAR":
            return {
                ...state,
                ...initialState
            }
        case "GLID_INPUT":
            return {
                ...state,
                Glid: payload
            }
        default:
            return state;
    }
}