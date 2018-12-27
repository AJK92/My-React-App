export const GET_GALLERY_LIST = 'Get Gallery List'

export function getGalleryList(value: string) {
    const jsonData = require(`./../SampleJson/CONTENTLISTINGPAGE-PAGE${value}.json`)
    return {
        type: GET_GALLERY_LIST,
        payload: {
            galleryList: ((jsonData.page['content-items'].content) || []).map((dataItem: any) => {
                return {
                    imageUrl: dataItem['poster-image'],
                    name: dataItem.name
                }
            })
        }
    }

}