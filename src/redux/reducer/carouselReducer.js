/* eslint-disable import/no-anonymous-default-export */

const initialState = {
    carouselData: {
        twoDImages: [],
        twoDPdf: [],
        twoDExtensions: [],
        twodLoader: true,
        twodfilesExist: true,

        threeDImages: [],
        threeDPdf: [],
        threeDExtensions: [],
        threedLoader: true,
        threedfilesExist: true,

        FloorImages: [],
        FloorPdf: [],
        FloorExtensions: [],
        floorLoader: true,
        floorfilesExist: true,

        QuadImages: [],
        QuadPdf: [],
        QuadExtensions: [],
        quadLoader: true,
        quadfilesExist: true,
        loadQuadImage: true,
        loadQuadPdf: false,

        InstallImage: [],
        InstallPdf: [],
        InstallExtensions: [],
        installLoader: true,
        insfilesExist: true,

        PicImage: [],
        PicPdf: [],
        PicExtensions: [],
        picLoader: true,
        picfilesExist: true,

        installerDetails: [],
        fixtureDatails: []

    }
}


export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case "TWO_D_FILES":
            return {
                ...state,
                carouselData: {
                    twoDImages: payload.image,
                    twoDPdf: payload.pdf,
                    twoDExtensions: payload.extensions,
                    twodLoader: false,
                    twodfilesExist: payload && payload.hasOwnProperty('filesExist') ? payload.filesExist : true
                }
            }
        case "THREE_D_FILES":
            return {
                ...state,
                carouselData: {
                    ...state.carouselData,
                    threeDImages: payload.image,
                    threeDPdf: payload.pdf,
                    threeDExtensions: payload.extensions,
                    threedLoader: false,
                    threedfilesExist: payload && payload.hasOwnProperty('filesExist') ? payload.filesExist : true
                }
            }
        case "FLOOR_PLAN_FILES":
            return {
                ...state,
                carouselData: {
                    ...state.carouselData,
                    FloorImages: payload.image,
                    FloorPdf: payload.pdf,
                    FloorExtensions: payload.extensions,
                    floorLoader: false,
                    floorfilesExist: payload && payload.hasOwnProperty('filesExist') ? payload.filesExist : true
                }
            }
        case "QUAD_FILES":
            return {
                ...state,
                carouselData: {
                    ...state.carouselData,
                    QuadImages: payload.image,
                    QuadPdf: payload.pdf,
                    QuadExtensions: payload.extensions,
                    quadLoader: false,
                    quadfilesExist: payload && payload.hasOwnProperty('filesExist') ? payload.filesExist : true,
                    loadQuadImage: payload.loadImage,
                    loadQuadPdf: payload.loadPdf
                }
            }
        case "INSTALLATION_FILES":
            return {
                ...state,
                carouselData: {
                    ...state.carouselData,
                    InstallImage: payload.image,
                    InstallPdf: payload.pdf,
                    InstallExtensions: payload.extensions,
                    installLoader: false,
                    insfilesExist: payload && payload.hasOwnProperty('filesExist') ? payload.filesExist : true

                }
            }
        case "PIC_SPACE_FILES":
            return {
                ...state,
                carouselData: {
                    ...state.carouselData,
                    PicImage: payload.image,
                    PicPdf: payload.pdf,
                    PicExtensions: payload.extensions,
                    picLoader: false,
                    picfilesExist: payload && payload.hasOwnProperty('filesExist') ? payload.filesExist : true

                }
            }
        // case "INSTALLER_DETAILS":
        //     return {
        //         ...state,
        //         carouselData: {
        //             installerDetails: payload.installerdata,
        //             fixtureDatails: payload.fixturedata
        //         }
        //     }
        case "CAROUSEL_FAIL":
            return {
                ...state,
                carouselData: {
                    ...initialState.carouselData,
                    // PicImage: [],
                    // PicPdf: [],
                    // PicExtensions: [],
                    twodLoader: false,
                    threedLoader: false,
                    floorLoader: false,
                    quadLoader: false,
                    picLoader: false,
                    installLoader: false,
                    twodfilesExist: false,
                    threedfilesExist: false,
                    floorfilesExist: false,
                    quadfilesExist: false,
                    insfilesExist: false,
                    picfilesExist: false
                    // filesExist: false
                }
            }

        default:
            return state
    }
}