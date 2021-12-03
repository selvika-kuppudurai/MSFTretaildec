/* eslint-disable eqeqeq */
import axios from "axios"
import { endPoints } from "../../config/Api"
import { detectFiles, SplitFiles } from "../../helpers"


// load carousel data
export const loadCarouselData = (glId) => async dispatch => {

    try {
        const url = endPoints.deepDive.table_Data + "/" + `${glId}`
        const res = await axios.get(url)

        if (res.status === 200) {
            if (res.data.length > 0) {
                // 2D Floor plan
                if (res.data[0].twoDFloorPlan_Details.twoD_plan != 0 && res.data[0].twoDFloorPlan_Details.twoD_plan != null) {

                    let returnData = SplitFiles(res.data[0].twoDFloorPlan_Details.twoD_plan)
                    let TwodImageFiles = returnData.ImageFiles
                    let TwodPdfFiles = returnData.PdfFiles
                    let twodExtensions = returnData.fileExtensions

                    dispatch({ type: "TWO_D_FILES", payload: { image: TwodImageFiles, pdf: TwodPdfFiles, extensions: twodExtensions } })

                } else {

                    dispatch({ type: "TWO_D_FILES", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
                }

                if (res.data[0].threeDFloorPlan_Details.threeD_render != "0" && res.data[0].threeDFloorPlan_Details.threeD_render != null &&  res.data[0].threeDFloorPlan_Details.threeD_render != '') {

                    let returnData = SplitFiles(res.data[0].threeDFloorPlan_Details.threeD_render)


                    let ThreedImageFiles = returnData.ImageFiles
                    let ThreedPdfFiles = returnData.PdfFiles
                    let threedExtensions = returnData.fileExtensions

                    dispatch({ type: "THREE_D_FILES", payload: { image: ThreedImageFiles, pdf: ThreedPdfFiles, extensions: threedExtensions } })

                } else {
                    dispatch({ type: "THREE_D_FILES", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
                }

                if (res.data[0].floorPlan_Details.floorplan != 0 && res.data[0].floorPlan_Details.floorplan != null) {

                    let returnData = SplitFiles(res.data[0].floorPlan_Details.floorplan)

                    dispatch({ type: "FLOOR_PLAN_FILES", payload: { image: returnData.ImageFiles ? returnData.ImageFiles : [], pdf: returnData.PdfFiles ? returnData.PdfFiles : [], extensions: returnData.fileExtensions ? returnData.fileExtensions : [] } })


                } else {
                    dispatch({ type: "FLOOR_PLAN_FILES", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
                }

                // quad
                if (res.data[0].quadreport_Details.quadreport != 0 && res.data[0].quadreport_Details.quadreport != null) {
                    let loadImage = true
                    let loadPdf = false
                    let returnData = SplitFiles(res.data[0].quadreport_Details.quadreport)


                    dispatch({ type: "QUAD_FILES", payload: { image: returnData.ImageFiles ? returnData.ImageFiles : [], pdf: returnData.PdfFiles ? returnData.PdfFiles : [], extensions: returnData.fileExtensions ? returnData.fileExtensions : [], loadPdf, loadImage } })
                } else {
                    dispatch({ type: "QUAD_FILES", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
                }

                // Installation
                if (res.data[0].installationPhotos_Details.installationphotos != 0 && res.data[0].installationPhotos_Details.installationphotos != null) {

                    let returnData = SplitFiles(res.data[0].installationPhotos_Details.installationphotos)

                    dispatch({ type: "INSTALLATION_FILES", payload: { image: returnData.ImageFiles ? returnData.ImageFiles : [], pdf: returnData.PdfFiles ? returnData.PdfFiles : [], extensions: returnData.fileExtensions ? returnData.fileExtensions : [] } })


                } else {
                    dispatch({ type: "INSTALLATION_FILES", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
                }

                // Picture of space
                if (res.data[0].pictureofspace_Details.pictureofspace != 0 && res.data[0].pictureofspace_Details.pictureofspace != null) {

                    let returnData = SplitFiles(res.data[0].pictureofspace_Details.pictureofspace)

                    dispatch({ type: "PIC_SPACE_FILES", payload: { image: returnData.ImageFiles ? returnData.ImageFiles : [], pdf: returnData.PdfFiles ? returnData.PdfFiles : [], extensions: returnData.fileExtensions ? returnData.fileExtensions : [] } })

                } else {
                    dispatch({ type: "PIC_SPACE_FILES", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
                }


                if (Object.keys(res.data[0].installer_Details).length > 0) {
                    let returnData = res.data[0].installer_Details;
                    dispatch({ type: "INSTALLER_DETAILS", payload: { installerdata: returnData, fixturedata: res.data } })

                } else {
                    dispatch({ type: "INSTALLER_DETAILS", payload: { installerdata: [], fixturedata: [] } })
                }
            }
        }


    } catch (err) {
        console.log("error", err)
        dispatch({ type: "CAROUSEL_FAIL", payload: { image: [], pdf: [], extensions: [], filesExist: false } })
    }
}