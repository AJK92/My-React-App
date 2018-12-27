import { GET_GALLERY_LIST } from './../Actions/gallery-actions'
import AppState from './../App-State/AppState'

const initialState: AppState = {
    galleryList: []
}

export default function getGalleryListReducer(state: AppState = initialState, action: any): AppState {
    switch (action.type) {
        case GET_GALLERY_LIST:
            return {
                ...state,
                galleryList: state.galleryList.concat(...action.payload.galleryList),
            }
        default:
            return state
    }
}