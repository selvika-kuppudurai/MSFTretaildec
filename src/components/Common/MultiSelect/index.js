import React from "react";
import "./style.scss"
// import Arrow from "../../../assets/images/icons/down-chevron.png"

class MultiSelect extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            search: null,
            chosenValues: [],
            showDropdown: false
        };
        this.detectOutside = this.detectOutside.bind(this);

        // this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }



    filterValues = (e) => {
        let search = e.target.value;
        this.setState({ search, showDropdown: true });
    };

    storeValues = (data) => {

        const { chosenValues } = this.state
        if (chosenValues.length > 0 && chosenValues.find(d => d.id === data.id)) {
            let removeValue = chosenValues.filter(value => value.id !== data.id)
            this.setState({ chosenValues: removeValue })
        } else {
            chosenValues.push({ id: data.id })
            this.setState({})
        }

    }

    handleClick = () => {
        this.setState({ showDropdown: true })
    }



    detectOutside = (node) => {
        this.detectOutside = node;
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    toggleDropdown = (e) => {

        if (!this.state.showDropdown) {
            document.addEventListener("click", this.handleOutsideClick, false);

        } else {
            document.removeEventListener("click", this.handleOutsideClick, false);

        }

        this.setState({
            showDropdown: !this.state.showDropdown,
        });


        e.stopPropagation();

    };


    handleOutsideClick = (e) => {

        if (this.node != null) {

            if (this.node.contains(e.target)) {
                return;
            }
        }
        this.toggleDropdown(e);


    };

    render() {

        const { options = [], chooseValues, chosenClinics = [], showSearch = false, className = "" } = this.props;




        if (showSearch) {
            var myOptions = options && options.length > 0 && options
                .filter((data) => {
                    if (this.state.search === null) {
                        return data;
                    } else if (
                        data.name.toLowerCase().includes(this.state.search.toLowerCase())
                    ) {
                        return data;
                    }
                })
                .map((data) => {

                    return (
                        this.state.showDropdown && <div className="options-container">
                            <input type="checkbox" className="checkbox-style" onChange={() => chooseValues(data)} checked={data.checked} />

                            <div className="d-flex flex-column">
                                <label
                                    className="cursor-pointer"
                                    style={{ marginLeft: "20px" }}
                                    key={data.id}
                                    value={data.name}
                                >
                                    {data.name}

                                </label>
                                <label
                                    className="cursor-pointer"
                                    style={{ marginLeft: "20px" }}
                                    key={data.id}
                                    value={data.address}
                                >
                                    {data.address}

                                </label>
                            </div>
                        </div>
                    );
                });
        } else {


            var myDrpOptions = options && options.length > 0 && options.map((data) => {

                return (
                    <div className="options-container">
                        <input type="checkbox" className="checkbox-style" onChange={() => chooseValues(data)} checked={data.checked} />

                        <div className="d-flex flex-column">
                            <label
                                className="cursor-pointer"
                                style={{ marginLeft: "20px" }}
                                key={data.id}
                                value={data.name}
                            >
                                {data.name}

                            </label>
                            <label
                                className="cursor-pointer"
                                style={{ marginLeft: "20px" }}
                                key={data.id}
                                value={data.address}
                            >
                                {data.address}

                            </label>
                        </div>
                    </div>
                );
            });
        }

        return (
            <div>
                {showSearch &&
                    <div onClick={(e) => this.toggleDropdown(e)}
                        className="custom-class">
                        <input type="text" innerRef={input => this.inputElement = input} onChange={(e) => this.filterValues(e)} className="drp-input" />
                    </div>}
                {/* 
                <img src={Arrow} alt="arrow" className="drp-arrow" /> */}

                {showSearch && myOptions.length > 0 && this.state.showDropdown && <div className="drpdwn-container" ref={(node) => (this.node = node)}  >
                    {myOptions}
                </div>

                }

                {!showSearch && options && options.length > 0 && <div className={`drpdwn-container ${className}`} ref={(node) => (this.node = node)}  >
                    {myDrpOptions}
                </div>}



                {/* Clinic Details Container */}
                {chosenClinics.length > 0 && showSearch &&
                    <div className="clinic-details" >
                        {chosenClinics.map((clinic) => {
                            return (
                                <div className="clinic-container" >
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h4>{clinic.name}</h4>
                                            <span>{clinic.address}</span>
                                        </div>
                                        <div className="clinic-delete" onClick={() => chooseValues(clinic)}>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                {/* Clinic Details Container */}
            </div>
        );
    }
}

export default MultiSelect;
