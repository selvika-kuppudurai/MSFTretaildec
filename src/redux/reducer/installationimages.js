/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    intallation_images: {
    Heroshot: [],
    a2: [],
    a3: [],
    a4: [],
    a5: [],
    a6: [],
    }
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(payload)

    switch (type) {
        case "installation_image":
            return {
                ...state,
                installation_images: {
                Heroshot: payload.Hero_shot
                }
            }
        
        default:
            return state;
    }
}