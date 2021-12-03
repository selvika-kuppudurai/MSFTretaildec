import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import { MdModeEdit } from 'react-icons/md'
import IconInstallers from '../../assets/images/Icon-Installers.png'
import { connect } from "react-redux";


const InstallerDetails = ({ data, userDetails, openStoreModal }) => {
    const [modalState, setModal] = useState(false)

    console.log("datamy", data)

    const clickEdit = () => {
        openStoreModal(!modalState)
    }
    return (
        <div className='col-lg-3 col-sm-12 paddingnone'>
            <Card className='border-0 carddesignwithheight mt-4'>
                <Card.Body>
                    <div className='col-lg-12 flexdesign paddingnone'>
                        <div className='centeralign'>
                        <img className = "imgwidth" src={IconInstallers} />
                        </div>
                        <div className='col-lg-4 d-lg-flex align-align-items-center no-wrap col-sm-2 pl-0 pr-0 mt-sm-3 mt-lg-4'>
                            <Card.Title>Installer Details</Card.Title>
                        </div>
                        {userDetails && userDetails.role != 'Guest' &&
                            <div className='col-lg-4 mt-lg-4 d-lg-flex align-align-items-center col-sm-1 mt-sm-3 col-sm-1 cursor-pointer fixture__edit'>
                                <MdModeEdit size='20' className='icon__clr__edit__fixture' onClick={clickEdit} />
                            </div>}
                    </div>
                    <Card.Text className='textdesign mt-5'>
                        <div className='row headerdesign'>

                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                {data && <div>
                                    <div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 installerheading mb-3">Installation Agency</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">{data.installerName != null ? data.installerName : 'Not Available'}</div>
                                    </div>
                                    <div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 installerheading mb-3">Installer Contact</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">{data.installerContact != null ? data.installerContact : 'Not Available'}</div>
                                    </div>
                                    <div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 installerheading mb-3">Installer Phone</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">{data.installerPhone != null ? data.installerPhone : 'Not Available'}</div>
                                    </div>
                                    <div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 installerheading mb-3">Graphics Language</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">{data.graphicsLanguage != null ? data.graphicsLanguage : 'Not Available'}</div>
                                    </div >
                                </div>

                                }
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        userDetails: state.user.userDetails
    }
}

export default connect(mapStateToProps)(InstallerDetails);