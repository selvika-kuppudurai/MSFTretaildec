/* eslint-disable no-useless-concat */
import axios from "axios"
import { endPoints } from "../../config/Api"
import emailjs from 'emailjs-com';
import moment from "moment";
import { Value } from "devextreme-react/range-selector";

export const checkGlId = (glid) => async dispatch => {
    try {

        if (glid !== "") {

            let url = endPoints.storeInfo.glid + "?GLIDCode=" + `${glid}`
            const res = await axios.get(url)
            
            let url1 = endPoints.userManage.approvals + "?Params=Activity"
            const res1 = await axios.get(url1)
            console.log('vcvc', res1)
            if (res.status === 200) {

                console.log("sadfashdfjahsdjfhasjdfasd", res.data)

                if (res.data.hasOwnProperty("resultquery") && res.data.resultquery.length > 0) {

                    dispatch({ type: "UPDATE_FLOOR_PLAN", payload: res.data.resultquery[0] })
                }

                if (res.data.datacheck.message === "store details Unavailable please add it in Reptool") {

                    dispatch({ type: "GLID_CHECK", payload: { repTool: true, storeError: false } })
                }

                if (res.data.datacheck.message === "Store already Exists") {
                    let arrayforfixturedescription = []
                    let url = endPoints.deepDive.table_Data + "/GetFixtureDescriptionDeatils" + "?GLIDCode=" + `${glid}`
                    const res1 = await axios.get(url)
                    // https://localhost:44364/api/MRRPilot/GetFixtureDescriptionDeatils?GLIDCode=@GLIDCode
                    console.log('response1', res1)
                    // res1.data.map(res => {
                    //     console.log('response1', res)
                    //     // res.map( res2 => {
                    //     //     console.log('response1', res2)
                    //     // })
                    // })

                    Object.keys(res1.data).forEach(key => {
                        let fixturedescription = []
                       console.log('response', res1.data[key])
                       res1.data[key].map(response => {
                             console.log('response', response)
                             fixturedescription.push(response.fixture_Description)

                       })
                       arrayforfixturedescription.push(fixturedescription)
                    });

                    console.log('arrayforfixturedescription', arrayforfixturedescription)

                    let url2 = endPoints.deepDive.table_Data + "/GetFixtureDetails"
                    const responsefixtures = await axios.get(url2)

                    console.log('responsefixtures', responsefixtures)

                    dispatch({ type: "GLID_AVAIL", payload: { repTool: false, storeError: true, result: res.data.resultquery, executionResult: res.data.executionResult, fixedSelection: res.data.fixedSelection, graphicsLanguage: res.data.graphicsLanguage, model: res.data.model, status: res.data.status, fixtures: res.data.fixtures, glidvalues: res.data.glid, fixturedescriptionforexisting: arrayforfixturedescription ? arrayforfixturedescription : [], assetRowId: res.assetRowId, fixturesforexisting: responsefixtures.data ? responsefixtures.data : [] , fixtureDescription: res.data.fixturesDescription ? res.data.fixturesDescription : [], materialInfo: res.data.materialInfo ? res.data.materialInfo : [] } })


                }

                if (res.data.datacheck.message === "Store Available in Reptool") {

                    dispatch({ type: "GLID_DATA_STORE", payload: { repTool: false, storeError: false, result: res.data.result, executionResult: res.data.executionResult, fixedSelection: res.data.fixedSelection, fixturedescriptionforexisting : [] , graphicsLanguage: res.data.graphicsLanguage, model: res.data.model, status: res.data.status, glidvalues: res.data.glid, fixtures: res.data.fixtures, fixtureDescription: res.data.fixturesDescription ? res.data.fixturesDescription : [] } })
                }
            }

            if(res1.status === 200) {
                let test = []
                console.log('test1',res1)
                for(let i=0; i<res1.data.length; i++){
                    console.log('test2')
                    console.log('rr')
                    if(res1.data[i].glid === glid){
                        console.log('test3')
                        test.push(res1.data[i])
                        // dispatch({ type: "activity", payload:  ''})

                    }

                }
                if(test.length > 0){
                    console.log('bcbc')
                    let c = [];
                    let v= [];
                    // for(let j = 0 ; j < test.length; j++){
                    //     if(test[j].approvalDate.split('T')[1].split(':')[1] > test[j+1].approvalDate.split('T')[1].split(':')[1]){
                    //       c.push(test[j].approvalDate.split('T')[1].split(':')[1])
                    //     } else {

                    //     }
                    c = (new Date(Math.max.apply(null, test.map(function(e) {
                        return new Date(e.systemUpdatedDate);
                      }))));
                      v.push(c)
                      console.log('testttt',v)
                      dispatch({ type: "activity", payload:  c})
                    // }
                    
                }

            }
        } else {
            dispatch({ type: "GLID_CHECK", payload: { repTool: false, storeError: false } })
        }

    } catch (err) {
        console.error("errortype", err)
    }
}

// Add store 
export const addStore = (Glid, data1, data2, storeData, listofAdmins) => async dispatch => {




    console.log("sdfasdfjashdfkjsdf", data2)
    
    


    let keyName = ""

    let filteredMaterialValues = Object.fromEntries(Object.entries(data2.materialInfoList[data2.materialInfoList.length - 1]).filter(([_, v]) => v != null && v !== ""));

    if (Object.keys(filteredMaterialValues).length > 0) {
        console.log("keyname---", Object.keys(filteredMaterialValues)[0])
        keyName = Object.keys(filteredMaterialValues)[0]
    }



    //    Material Info details start
    let ModelValue = data2.materialInfoList.map(d => d.model !== "" ? d.model : "null")

    let SkuValue = data2.materialInfoList.map(d => d.sku !== "" ? d.sku : "null")

    let FixtureDescValue = data2.materialInfoList.map(d => d.fixtureDescription !== "" ? d.fixtureDescription : "null")

    // let FixtureDescValue = "Endcap + Inline"
// let stringforinclude = ["Not Available 99","Not Available 98","Not Available 97","Not Available 96","Not Available 95","Not Available 94","Not Available 93","Not Available 92","CAPEX", "OPEX", "Not available 900", "MRR", "Pending", "Pilot", "TBC", "Duplicate","Not Available 91","Not Available 90","Not Available 9","Not Available 89","Not Available 88","Not Available 87","Not Available 86","Not Available 85","Not Available 84",
// "Not Available 83","Not Available 82","Not Available 81","Not Available 80","Not Available 8",
// "Not Available 79","Not Available 78","Not Available 78","Not Available 77","Not Available 76","Not Available 75","Not Available 74","Not Available 73","Not Available 72","Not Available 71","Not Available 70","Not Available 7","Not Available 69","Not Available 68","Not Available 67","Not Available 669","Not Available 668","Not Available 667","Not Available 666","Not Available 665","Not Available 664","Not Available 663","Not Available 662","Not Available 661","Not Available 660",
// "Not Available 66","Not Available 659","Not Available 658","Not Available 657","Not Available 656","Not Available 655","Not Available 654","Not Available 653","Not Available 652","Not Available 651","Not Available 650","Not Available 65","Not Available 649","Not Available 648","Not Available 647","Not Available 646","Not Available 645","Not Available 644","Not Available 643","Not Available 642","Not Available 641","Not Available 640","Not Available 64","Not Available 639","Not Available 638","Not Available 637","Not Available 636","Not Available 635","Not Available 634","Not Available 633","Not Available 632","Not Available 631",
// "Not Available 630","Not Available 63","Not Available 629","Not Available 628","Not Available 627","Not Available 626","Not Available 625","Not Available 624","Not Available 623","Not Available 622","Not Available 621","Not Available 620","Not Available 62","Not Available 619","Not Available 618","Not Available 617","Not Available 616","Not Available 615","Not Available 614","Not Available 613","Not Available 612","Not Available 611","Not Available 610","Not Available 61","Not Available 609","Not Available 608","Not Available 607","Not Available 606","Not Available 605","Not Available 604","Not Available 603","Not Available 602","Not Available 601","Not Available 600","Not Available 60","Not Available 6","Not Available 599","Not Available 598","Not Available 597","Not Available 596","Not Available 595","Not Available 594","Not Available 593","Not Available 592","Not Available 591","Not Available 590","Not Available 59","Not Available 589","Not Available 588","Not Available 587","Not Available 586","Not Available 585","Not Available 584","Not Available 583","Not Available 582","Not Available 581","Not Available 580","Not Available 58","Not Available 579","Not Available 578","Not Available 577","Not Available 576","Not Available 575","Not Available 574","Not Available 573","Not Available 572","Not Available 571","Not Available 570","Not Available 57","Not Available 569","Not Available 568","Not Available 567","Not Available 566","Not Available 565","Not Available 564","Not Available 563","Not Available 562","Not Available 561","Not Available 560","Not Available 56","Not Available 559","Not Available 558","Not Available 557","Not Available 556","Not Available 555","Not Available 554","Not Available 553","Not Available 552","Not Available 551","Not Available 550","Not Available 55","Not Available 549","Not Available 548","Not Available 547","Not Available 546","Not Available 545","Not Available 544","Not Available 543","Not Available 542","Not Available 541","Not Available 540","Not Available 54","Not Available 539","Not Available 538","Not Available 537","Not Available 536","Not Available 535","Not Available 534","Not Available 533",
// "Not Available 532","Not Available 531","Not Available 530","Not Available 53","Not Available 529","Not Available 528","Not Available 527","Not Available 526","Not Available 525","Not Available 524","Not Available 523","Not Available 522","Not Available 521","Not Available 520","Not Available 52","Not Available 519","Not Available 518","Not Available 517","Not Available 516","Not Available 515","Not Available 514","Not Available 513","Not Available 512","Not Available 511","Not Available 510","Not Available 51","Not Available 509","Not Available 508","Not Available 507","Not Available 506","Not Available 505","Not Available 504","Not Available 503","Not Available 502","Not Available 501","Not Available 500","Not Available 50","Not Available 5","Not Available 499","Not Available 498","Not Available 497","Not Available 496","Not Available 495","Not Available 494","Not Available 493","Not Available 492","Not Available 491","Not Available 490","Not Available 49","Not Available 489","Not Available 488","Not Available 487","Not Available 486","Not Available 485","Not Available 484","Not Available 483","Not Available 482","Not Available 481","Not Available 480","Not Available 48","Not Available 479","Not Available 478","Not Available 477","Not Available 476","Not Available 475","Not Available 474","Not Available 473","Not Available 472","Not Available 471","Not Available 470","Not Available 47","Not Available 469","Not Available 468","Not Available 467","Not Available 466","Not Available 465","Not Available 464","Not Available 463","Not Available 462","Not Available 461","Not Available 460","Not Available 46","Not Available 459","Not Available 458","Not Available 457","Not Available 456","Not Available 455","Not Available 454","Not Available 453","Not Available 452","Not Available 451","Not Available 450","Not Available 45","Not Available 449","Not Available 448","Not Available 447","Not Available 446","Not Available 445","Not Available 444","Not Available 443","Not Available 442","Not Available 441","Not Available 440","Not Available 44","Not Available 439","Not Available 438","Not Available 437","Not Available 436","Not Available 435","Not Available 434","Not Available 433","Not Available 432","Not Available 431",
// "Not Available 430","Not Available 43","Not Available 429","Not Available 428","Not Available 427","Not Available 426","Not Available 425","Not Available 424","Not Available 423","Not Available 422","Not Available 421","Not Available 420","Not Available 42","Not Available 419","Not Available 418","Not Available 417","Not Available 416",
// "Not Available 415","Not Available 414","Not avai","Not Available 413","Not Available 412","Not Available 411","Not Available 410","Not Available 41","Not Available 409","Not Available 408","Not Available 407","Not Available 406","Not Available 405","Not Available 404","Not Available 403","Not Available 402","Not Available 401","Not Available 400","Not Available 40","Not Available 4","Not Available 399","Not Available 398","Not Available 397","Not Available 396","Not Available 395","Not Available 394","Not Available 393","Not Available 392","Not Available 391","Not Available 390","Not Available 39","Not Available 389","Not Available 388","Not Available 387","Not Available 386","Not Available 385","Not Available 384","Not Available 383","Not Available 382","Not Available 381","Not Available 380","Not Available 38","Not Available 379","Not Available 378","Not Available 377","Not Available 376","Not Available 375","Not Available 374","Not Available 373","Not Available 372","Not Available 371","Not Available 370","Not Available 37","Not Available 369","Not Available 368","Not Available 367","Not Available 366","Not Available 365","Not Available 364","Not Available 363","Not Available 362","Not Available 361","Not Available 360","Not Available 36","Not Available 359","Not Available 358","Not Available 357","Not Available 356","Not Available 355","Not Available 354","Not Available 353","Not Available 352","Not Available 351","Not Available 350","Not Available 35","Not Available 349","Not Available 348","Not Available 347","Not Available 346","Not Available 345","Not Available 344","Not Available 343","Not Available 342","Not Available 341","Not Available 340","Not Available 34","Not Available 339","Not Available 338","Not Available 337","Not Available 336","Not Available 335","Not Available 334","Not Available 333","Not Available 332","Not Available 331","Not Available 330","Not Available 33","Not Available 329","Not Available 328","Not Available 327","Not Available 326","Not Available 325","Not Available 324","Not Available 323","Not Available 322","Not Available 321","Not Available 320","Not Available 32","Not Available 319","Not Available 318","Not Available 317","Not Available 316","Not Available 315","Not Available 314",
// "Not Available 313","Not Available 312","Not Available 311","Not Available 310","Not Available 31","Not Available 309","Not Available 308","Not Available 307","Not Available 306","Not Available 305","Not Available 304","Not Available 303","Not Available 302","Not Available 301","Not Available 300","Not Available 30","Not Available 3","Not Available 299","Not Available 298","Not Available 297","Not Available 296","Not Available 295","Not Available 294","Not Available 293","Not Available 292","Not Available 291","Not Available 290","Not Available 29","Not Available 289","Not Available 288","Not Available 287","Not Available 286","Not Available 285","Not Available 284","Not Available 283","Not Available 282","Not Available 281","Not Available 280","Not Available 28","Not Available 279","Not Available 278","Not Available 277","Not Available 276","Not Available 275","Not Available 274","Not Available 273","Not Available 272","Not Available 271","Not Available 270","Not Available 27","Not Available 269","Not Available 268","Not Available 267","Not Available 266","Not Available 265","Not Available 264","Not Available 263","Not Available 262","Not Available 261","Not Available 260","Not Available 26","Not Available 259","Not Available 258","Not Available 257","Not Available 256","Not Available 255","Not Available 254","Not Available 253","Not Available 252","Not Available 251","Not Available 250","Not Available 25","Not Available 249","Not Available 248","Not Available 247","Not Available 246","Not Available 245","Not Available 244","Not Available 243","Not Available 242","Not Available 241","Not Available 240","Not Available 24","Not Available 239","Not Available 238","Not Available 237","Not Available 236","Not Available 235","Not Available 234","Not Available 233","Not Available 232","Not Available 231","Not Available 230","Not Available 23","Not Available 229","Not Available 228","Not Available 227","Not Available 226","Not Available 225","Not Available 224","Not Available 223","Not Available 222","Not Available 221","Not Available 220","Not Available 22","Not Available 219","Not Available 218","Not Available 217","Not Available 216","Not Available 215","Not Available 214","Not Available 213","Not Available 212",
// "Not Available 211","Not Available 210","Not Available 21","Not Available 209","Not Available 208","Not Available 207","Not Available 206","Not Available 205","Not Available 204","Not Available 203","Not Available 202","Not Available 201","Not Available 200","Not Available 20","Not Available 2","Not Available 199","Not Available 198","Not Available 197","Not Available 196","Not Available 195","Not Available 194","Not Available 193","Not Available 192","Not Available 191","Not Available 190","Not Available 19","Not Available 189","Not Available 188","Not Available 187","Not Available 186","Not Available 185","Not Available 184","Not Available 183","Not Available 182","Not Available 181","Not Available 180","Not Available 18","Not Available 179","Not Available 178","Not Available 177","Not Available 176","Not Available 175","Not Available 174","Not Available 173","Not Available 172","Not Available 171","Not Available 170","Not Available 17","Not Available 169","Not Available 168","Not Available 167","Not Available 166","Not Available 165","Not Available 164","Not Available 163","Not Available 162","Not Available 161","Not Available 160","Not Available 16","Not Available 159","Not Available 158","Not Available 157","Not Available 156","Not Available 155","Not Available 154","Not Available 153","Not Available 152","Not Available 151","Not Available 150","Not Available 15","Not Available 149","Not Available 148","Not Available 147","Not Available 146","Not Available 145","Not Available 144","Not Available 143","Not Available 142","Not Available 141","Not Available 140","Not Available 14","Not Available 139","Not Available 138","Not Available 137","Not Available 136","Not Available 135","Not Available 134","Not Available 133","Not Available 132","Not Available 131","Not Available 130","Not Available 13","Not Available 129","Not Available 128","Not Available 127","Not Available 126","Not Available 125","Not Available 124","Not Available 123","Not Available 122","Not Available 121","Not Available 120","Not Available 12","Not Available 119","Not Available 118","Not Available 117","Not Available 116","Not Available 115","Not Available 114","Not Available 113","Not Available 112","Not Available 111","Not Available 110",
// "Not Available 11","Not Available 109","Not Available 108","Not Available 107","Not Available 106","Not Available 105","Not Available 104","Not Available 103","Not Available 102","Not Available 101","Not Available 100","Not Available 10","Not Available 1","9906960_2(Duplicate)","9906960_1(Duplicate)","9906631_2(Duplicate)","9906631_1(Duplicate)","9906614_2(Duplicate)","9906614_1(Duplicate)","9906565_2(Duplicate)","9906565_1(Duplicate)","9906553_2(Duplicate)","9906553_1(Duplicate)","9906551_3(Duplicate)","9906551_2(Duplicate)","9906551_1(Duplicate)","9906538_2(Duplicate)","9906538_1(Duplicate)","9906536_2(Duplicate)","9906536_1(Duplicate)",
// "9854945_2(Duplicate)","9854945_1(Duplicate)","9854900_2(Duplicate)","9854900_1(Duplicate)","9854879_2(Duplicate)","9854879_1(Duplicate)","9854852_2(Duplicate)","9854852_1(Duplicate)","9854775_2(Duplicate)","9854775_1(Duplicate)","","9854732_2(Duplicate)","9854732_1(Duplicate)","9854716_2(Duplicate)","9854716_1(Duplicate)","9854666_2(Duplicate)","9854666_1(Duplicate)","9854582_2(Duplicate)","9854582_1(Duplicate)","9854488_3(Duplicate)","9854488_2(Duplicate)","9854488_1(Duplicate)","9854406_2(Duplicate)","9854406_1(Duplicate)","9854348_2(Duplicate)","9854348_1(Duplicate)","9854244_2(Duplicate)","9854244_1(Duplicate)","9854243_2(Duplicate)","9854243_1(Duplicate)","","9854195_2(Duplicate)","9854195_1(Duplicate)","9854147_2(Duplicate)","9854147_1(Duplicate)","9854116_2(Duplicate)","9854116_1(Duplicate)","","9854078_2(Duplicate)","9854078_1(Duplicate)","9854073_2(Duplicate)","9854073_1(Duplicate)","","9854024_2(Duplicate)","9854024_1(Duplicate)","9841066_2(Duplicate)","9841066_1(Duplicate)","7628999_2(Duplicate)","7628999_1(Duplicate)","","7628611_2(Duplicate)","7628611_1(Duplicate)","7628608_2(Duplicate)","7628608_1(Duplicate)","7628602_2(Duplicate)","7628602_1(Duplicate)","7628575_2(Duplicate)","7628575_1(Duplicate)","7628507_2(Duplicate)","7628507_1(Duplicate)","7628490_2(Duplicate)","7628490_1(Duplicate)","7628422_2(Duplicate)","7628422_1(Duplicate)","7628402_2(Duplicate)","7628402_1(Duplicate)","7628387_2(Duplicate)","7628387_1(Duplicate)","7628379_2(Duplicate)","7628379_1(Duplicate)","7628363_2(Duplicate)","7628363_1(Duplicate)","7628344_2(Duplicate)","7628344_1(Duplicate)","7628333_2(Duplicate)","7628333_1(Duplicate)","7628331_2(Duplicate)","7628331_1(Duplicate)","7628313_2(Duplicate)","7628313_1(Duplicate)","7628299_2(Duplicate)","7628299_1(Duplicate)","7628292_2(Duplicate)","7628292_1(Duplicate)","7628244_2(Duplicate)","7628244_1(Duplicate)","7628161_2(Duplicate)","7628161_1(Duplicate)","7628128_2(Duplicate)","7628128_1(Duplicate)","7565749_2(Duplicate)","7565749_1(Duplicate)","7565717_2(Duplicate)","7565717_1(Duplicate)","7565707_2(Duplicate)","7565707_1(Duplicate)","7565706_2(Duplicate)","7565706_1(Duplicate)","5252725_2(Duplicate)","5252725_1(Duplicate)","5252724_2(Duplicate)","5252724_1(Duplicate)",
// "5252717_2(Duplicate)","5252717_1(Duplicate)","5252605_2(Duplicate)","5252605_1(Duplicate)","5252604_2(Duplicate)","5252604_1(Duplicate)","5073636_3(Duplicate)","5073636_2(Duplicate)","5073636_1(Duplicate)","5073635_3(Duplicate)","5073635_2(Duplicate)","5073635_1(Duplicate)","5073634_3(Duplicate)","5073634_2(Duplicate)","5073634_1(Duplicate)","5073514_2(Duplicate)","5073514_1(Duplicate)","40580620_2(Duplicate)","40580620_1(Duplicate)","1327440_3(Duplicate)","1327440_2(Duplicate)","1327440_1(Duplicate)","1327140_2(Duplicate)","1327140_1(Duplicate)","1327111_3(Duplicate)","1327111_2(Duplicate)","1327111_1(Duplicate)","1317269_3(Duplicate)","1317269_2(Duplicate)","1317269_1(Duplicate)","1315165_3(Duplicate)","1315165_2(Duplicate)","1315165_1(Duplicate)","1280229_2(Duplicate)","1280229_1(Duplicate)","1267254_3(Duplicate)","1267254_2(Duplicate)","1267254_1(Duplicate)","11175425_2(Duplicate)","11175425_1(Duplicate)","11175325_2(Duplicate)","11175325_1(Duplicate)","11175274_2(Duplicate)","11175274_1(Duplicate)","11175258_2(Duplicate)","11175258_1(Duplicate)","11175170_2(Duplicate)","11175170_1(Duplicate)","11175146_2(Duplicate)","11175146_1(Duplicate)","11175107_2(Duplicate)","11175107_1(Duplicate)","11174937_2(Duplicate)","11174937_1(Duplicate)","11174933_2(Duplicate)","11174933_1(Duplicate)","11174924_2(Duplicate)","11174924_1(Duplicate)","11166754_2(Duplicate)","11166754_1(Duplicate)","11166521_2(Duplicate)","11166521_1(Duplicate)","11166177_2(Duplicate)","11166177_1(Duplicate)","11166166_2(Duplicate)","11166166_1(Duplicate)","11144549_2(Duplicate)","11144549_1(Duplicate)","11144420_2(Duplicate)","11144420_1(Duplicate)","11144416_2(Duplicate)","11144416_1(Duplicate)","11144413_2(Duplicate)","11144413_1(Duplicate)","11144214_2(Duplicate)","11144214_1(Duplicate)","11144159_2(Duplicate)","11144159_1(Duplicate)","11144157_2(Duplicate)","11144157_1(Duplicate)","11144147_2(Duplicate)","11144147_1(Duplicate)","11144142_2(Duplicate)","11144142_1(Duplicate)","11144114_2(Duplicate)","11144114_1(Duplicate)","11144028_2(Duplicate)","11144028_1(Duplicate)","","11120739_2(Duplicate)","11120739_1(Duplicate)","11056597_2(Duplicate)","11056597_1(Duplicate)","11056592_2(Duplicate)","11056592_1(Duplicate)","11056562_2(Duplicate)",
// "11056562_1(Duplicate)","11056557_2(Duplicate)","11056557_1(Duplicate)","11056446_2(Duplicate)","11056446_1(Duplicate)","11056177_2(Duplicate)","11056177_1(Duplicate)","10291998_4(Duplicate)","10291998_3(Duplicate)","10291998_2(Duplicate)","10291998_1(Duplicate)","CAPEX", "OPEX", "Not available", "MRR", "Pending", "Pilot", "TBC", "Duplicate"
// ]
// console.log(stringforinclude.includes( data2.materialInfoList[1].assetTagId ))
    let AssetTagValues = data2.materialInfoList.map(d => d.assetTagId !== "" ? d.assetTagId : "null")

    let PrevAssetValues = data2.materialInfoList.map(d => (d.previousAssetTag !== "" && d.previousAssetTag !== undefined) ? d.previousAssetTag : "null")

    console.log("prevset", PrevAssetValues)
    let assetRowId = data2.materialInfoList.map(d => d.assetRowId !== "" ? d.assetRowId : "null")

    let FixtureValues = data2.materialInfoList.map(d => d.fixtureCost !== "" ? d.fixtureCost : "null")

    let StatusValues = data2.materialInfoList.map(d => d.status !== "" ? d.status : "null")

    let InstallerValues = data2.materialInfoList.map(d => d.installerName !== "" ? d.installerName : "null")
    let AssetRowid = data2.materialInfoList.map(d => d.count !== "" ? d.count : 'null')

    let InstallerContactValues = data2.materialInfoList.map(d => d.installerContact !== "" ? d.installerContact : "null")
    let InstallerPhoneValues = data2.materialInfoList.map(d => d.installerPhone !== "" ? d.installerPhone : "null")

    let ActualDateValues = data2.materialInfoList.map(d => d.actualInstallationDate ? moment(d.actualInstallationDate).format("YYYY-MM-DD") : "1900-01-01")

    let ProposedDateValues = data2.materialInfoList.map(d => d.proposedInstallationDate ? moment(d.proposedInstallationDate).format("YYYY-MM-DD") : "1900-01-01")

    //    Material Info details End


    let Picofspacelink = data1.floorPlan.Picofspacelink.length > 0 ? data1.floorPlan.Picofspacelink.map(d => d) : ""

    let Floorplanlink = data1.floorPlan.Floorplanlink.length > 0 ? data1.floorPlan.Floorplanlink.map(d => d) : ""

    let _2dlink = data1.floorPlan._2dlink.length > 0 ? data1.floorPlan._2dlink.map(d => d) : ""

    let _3dRlink = data1.floorPlan._3dRlink.length > 0 ? data1.floorPlan._3dRlink.map(d => d) : ""

    let Quadlink = data1.floorPlan.Quadlink.length > 0 ? data1.floorPlan.Quadlink.map(d => d) : ""

    console.log(data1.floorPlan.Quadlink.map(d => d))

    let Installationlink = data2.Installationimagelink.length > 0 ? data2.Installationimagelink.map(d => d) : ""

    let SignatureLink = data2.siganturelink.length > 0 ? data2.siganturelink.map(d => d) : ""
    let heroshotLink = data2.Hero_shotLink.length > 0 ? data2.Hero_shotLink.map(d => d) : ""
    let MainfrontLink = data2.Main_frontLink.length > 0 ? data2.Main_frontLink.map(d => d) : ""
    let LeftfrontLink = data2.Left_frontLink.length > 0 ? data2.Left_frontLink.map(d => d) : ""
    let RightfrontLink = data2.Right_frontLink.length > 0 ? data2.Right_frontLink.map(d => d) : ""
    let MainrearLink = data2.Main_rearLink.length > 0 ? data2.Main_rearLink.map(d => d) : ""
    let BestsideLink = data2.Best_sideLink.length > 0 ? data2.Best_sideLink.map(d => d) : ""


    console.log("modelvalues", data2)
    let utctimeformat = new Date().toISOString()
    console.log('utctimeformat', utctimeformat)


    let role = sessionStorage.getItem("userRoleDetail")
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails"))

    let lasteditasset = []
    console.log('lasteditasset2',data2.materialInfoList.length)
    data2.materialInfoList.map((d, index) => {
        console.log('lasteditasset2', index)
     if(data2.materialInfoList.length - 1 === index){
        lasteditasset.push(1)
} else {
    lasteditasset.push(0)
}
 })

 let lasteditasset2 = lasteditasset.length > 0 ? lasteditasset.map(d => d) : ""

 console.log('lasteditasset2', lasteditasset2)

    

    // emailjs.send('service_oz3rurt', 'template_un4jnox', templateParams, 'user_bNTtSlTQS5MCCm62EgOYV')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });


    // FixtureDescription

    try {
        let url = endPoints.storeInfo.addStore + "?ExecutionTier=" + `${data1.floorPlan.executionResult}` + "&SubPmname=" + `${data1.floorPlan.subpm}` + "&FixedSelection=" + `${data1.floorPlan.fixedSelection}` + "&BackwallCustomSpecifications=" + `${data1.floorPlan.BackwallCustomSpecifications}` + "&SpecialRequests=" + `${data1.floorPlan.SpecialRequests}` + "&GraphicsLanguage=" + `${data1.floorPlan.GraphicsLanguage}` + "&DeliveryAddress=" + `${data2.deliveryAddress}` + "&DeliveryCity=" + `${data2.deliveryCity}` + "&Comments=" + `${data2.Comments}` + "&DeliveryState=" + `${data2.deliveryState}` + "&DeliveryZip=" + `${data2.deliveryZip}` + "&glid=" + `${Glid}` + "&Glid=" +
            `${Glid}` + "&Updatedby=" + `${userDetails.email}` + "&UpdatedbyUser=" + `${userDetails.name}` + "&Role=" + `${role}` + "&Model=" + `${ModelValue}` + "&Sku=" + `${encodeURIComponent(SkuValue)}` + "&AssetTagId=" + `${AssetTagValues}` + "&PreviousAssetTag=" +
            `${PrevAssetValues}` + "&FixtureCost=" + `${FixtureValues}` + "&Status=" + `${StatusValues}` + "&FixtureDescription=" + `${encodeURIComponent(FixtureDescValue)}` + "&assetRowId=" + `${assetRowId}` + "&LastAssetFlag=" + `${lasteditasset2}` +
            "&InstallerName=" + `${InstallerValues}` + "&InstallerContact=" + `${InstallerContactValues}` + "&Phoneno=" + `${InstallerPhoneValues}` +"&Systemupdateddate="+ `${utctimeformat}` + "&Picofspacelink=" + `${Picofspacelink}` + "&_2dlink=" + `${_2dlink}` + "&_3dRlink=" + `${_3dRlink}` + "&Quadlink=" + `${Quadlink}` + "&Floorplanlink=" + `${Floorplanlink}` + "&Installationimagelink=" + `${Installationlink}` + "&siganturelink=" + `${SignatureLink}` + "&HeroShotimagelink=" +`${heroshotLink}` + "&MainFrontimagelink=" + `${MainfrontLink}` + "&LeftFrontimagelink=" + `${LeftfrontLink}` + "&RightFrontimagelink=" + `${RightfrontLink}`  + "&BestSideimagelink=" + `${BestsideLink}` + "&MainRearimagelink=" + `${MainrearLink}`
            + "&ActualInstallationDate=" + `${ActualDateValues}` + "&ProposedInstallationDate=" + `${ProposedDateValues}` + "&ResetFlag=" + `${keyName}` 

            // + "&MainFrontimagelink=" +`${SignatureLink}` + "&LeftFrontimagelink=" +`${SignatureLink}` + "&RightFrontimagelink=" +`${SignatureLink}`+ "&BestSideimagelink=" +`${SignatureLink}` + "&MainRearimagelink=" +`${SignatureLink}`




        const formData = new FormData();



        if (data1.floorPlan.PicturesofSpaceFiles.length > 0) {
            for (let i = 0; i < data1.floorPlan.PicturesofSpaceFiles.length; i++) {
                formData.append('PicturesofSpace', data1.floorPlan.PicturesofSpaceFiles[i])
                console.log("formdafdsfsdf", data1.floorPlan.PicturesofSpaceFiles[i])
            }
        } else {
            formData.append('PicturesofSpace', [])
        }

        if (data1.floorPlan.FloorPlanFiles.length > 0) {
            for (let i = 0; i < data1.floorPlan.FloorPlanFiles.length; i++) {
                formData.append('FloorPlan', data1.floorPlan.FloorPlanFiles[i])

            }
        } else {
            formData.append('FloorPlan', [])
        }


        if (data1.floorPlan._2dPlanFiles.length > 0) {
            for (let i = 0; i < data1.floorPlan._2dPlanFiles.length; i++) {
                formData.append('_2dPlan', data1.floorPlan._2dPlanFiles[i])

            }
        } else {
            formData.append('_2dPlan', [])
        }



        if (data1.floorPlan._3dPlanFiles.length > 0) {
            for (let i = 0; i < data1.floorPlan._3dPlanFiles.length; i++) {
                formData.append('_3dRender', data1.floorPlan._3dPlanFiles[i])

            }
        } else {
            formData.append('_3dRender', [])
        }

        if (data1.floorPlan.QuadPlanFiles.length > 0) {
            for (let i = 0; i < data1.floorPlan.QuadPlanFiles.length; i++) {
                formData.append('Quad', data1.floorPlan.QuadPlanFiles[i])
            }
        } else {
            formData.append('Quad', [])
        }

        if (data2.InstallationFiles && data2.InstallationFiles.length > 0) {
            for (let i = 0; i < data2.InstallationFiles.length; i++) {
                formData.append('InstallationImage', data2.InstallationFiles[i])

            }
        } else {
            formData.append('InstallationImage', [])
        }


        if (data2.SignatureFiles && data2.SignatureFiles.length > 0) {
            for (let i = 0; i < data2.SignatureFiles.length; i++) {
                formData.append('Signature', data2.SignatureFiles[i])
                console.log(data2.SignatureFiles[i])

            }
        } else {
            formData.append('Signature', [])
        }

        if (data2.Hero_shot && data2.Hero_shot.length > 0) {
            for (let i = 0; i < data2.Hero_shot.length; i++) {
                formData.append('HeroShot', data2.Hero_shot[i])

            }
        } else {
            formData.append('HeroShot', [])
        }

        if (data2.Main_front && data2.Main_front.length > 0) {
            for (let i = 0; i < data2.Main_front.length; i++) {
                formData.append('MainFront', data2.Main_front[i])

            }
        } else {
            formData.append('MainFront', [])
        }

        if (data2.Left_front && data2.Left_front.length > 0) {
            for (let i = 0; i < data2.Left_front.length; i++) {
                formData.append('LeftFront', data2.Left_front[i])

            }
        } else {
            formData.append('LeftFront', [])
        }

        if (data2.Right_front && data2.Right_front.length > 0) {
            for (let i = 0; i < data2.Right_front.length; i++) {
                formData.append('RightFront', data2.Right_front[i])

            }
        } else {
            formData.append('RightFront', [])
        }

        if (data2.Main_rear && data2.Best_side.length > 0) {
            for (let i = 0; i < data2.Best_side.length; i++) {
                formData.append('BestSide', data2.Best_side[i])

            }
        } else {
            formData.append('BestSide', [])
        }

        if (data2.Best_side && data2.Main_rear.length > 0) {
            for (let i = 0; i < data2.Main_rear.length; i++) {
                formData.append('MainRear', data2.Main_rear[i])

            }
        } else {
            formData.append('MainRear', [])
        }

        // if (data2.SignatureFiles && data2.SignatureFiles.length > 0) {
        //     for (let i = 0; i < data2.SignatureFiles.length; i++) {
        //         formData.append('MainFrontimagelink', data2.SignatureFiles[i])

        //     }
        // } else {
        //     formData.append('MainFrontimagelink', [])
        // }

        // if (data2.SignatureFiles && data2.SignatureFiles.length > 0) {
        //     for (let i = 0; i < data2.SignatureFiles.length; i++) {
        //         formData.append('LeftFrontimagelink', data2.SignatureFiles[i])

        //     }
        // } else {
        //     formData.append('LeftFrontimagelink', [])
        // }

        // if (data2.SignatureFiles && data2.SignatureFiles.length > 0) {
        //     for (let i = 0; i < data2.SignatureFiles.length; i++) {
        //         formData.append('RightFrontimagelink', data2.SignatureFiles[i])

        //     }
        // } else {
        //     formData.append('RightFrontimagelink', [])
        // }

        // if (data2.SignatureFiles && data2.SignatureFiles.length > 0) {
        //     for (let i = 0; i < data2.SignatureFiles.length; i++) {
        //         formData.append('BestSideimagelink', data2.SignatureFiles[i])

        //     }
        // } else {
        //     formData.append('BestSideimagelink', [])
        // }

        // if (data2.SignatureFiles && data2.SignatureFiles.length > 0) {
        //     for (let i = 0; i < data2.SignatureFiles.length; i++) {
        //         formData.append('MainRearimagelink', data2.SignatureFiles[i])

        //     }
        // } else {
        //     formData.append('MainRearimagelink', [])
        // }


        // formData.set("MaterialInfo", JSON.stringify(data2.materialInfoList))





      console.log('formdata',formData)

        const headers = {
            'Accept': 'application/json'
        }

        const res = await axios.post(url, formData, { headers: headers })
        console.log(res)

        if (res.status === 200) {
            console.log('enter')
            alert("Record added successfully")
        }

        if (res.status === 500) {
            alert("Internal server error")
        }

        let emailurl = "https://prod-16.westus2.logic.azure.com:443/workflows/a5b0bc47ee07429da36b57564d8c5fc2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=c8ok7_2zFKCfkmFnZyJvH1Eft4ETgNH3NEiPqgVi4bE"

        let body = {
            "admin": listofAdmins,
            "glid": Glid,
            "reasonforchange": data2.Comments === "" ? "Not available" : data2.Comments,
            "role": role,
            "storename": storeData.storeName,
            "updatedby": userDetails.email,
            "Updateddate": moment().format("YYYY-MM-DD HH:mm:ss"),
        }

        await axios.post(emailurl, body)



        
    } catch (err) {
        console.error("imgerr", err)
    }
}


// 
export const loadMaterialOptions = (flag, params, modell) => (dispatch) => {
    console.log(params)
    params = encodeURIComponent(params)
    console.log(params)
    return new Promise((resolve, reject) => {
        let url
       if(flag === 'Fixture') {
         url = endPoints.storeInfo.loadOptions + "?Flag=" + `${flag}` + "&Params=" + `${params}` + "&Modelparam=" + `${modell}`
       } else {
         url = endPoints.storeInfo.loadOptions + "?Flag=" + `${flag}` + "&Params=" + `${params}`  
       }
        axios.get(url).then((res) => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(true)
            }
        })
    })

}