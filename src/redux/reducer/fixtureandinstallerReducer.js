

const initialState = {
    InstallerDetailsfordeepdive: {
        installerDetails: [],
        fixtureDatails: []
    },
   

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "INSTALLER_DETAILS":
            return {
                ...state,
                InstallerDetailsfordeepdive: {
                    installerDetails: payload.installerdata,
                    fixtureDatails: payload.fixturedata
                }
            }
            
        case "Installer_fixture_fail":
            return {
                ...state,
                InstallerDetailsfordeepdive: {
                    ...initialState.InstallerDetailsfordeepdive,
                }
            }

        
        default:
            return state;
    }
}