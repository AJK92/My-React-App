import * as React from 'react';

export interface GalleryListCellProps {
    imageUrl?: string
    name?: string
}

export class GalleryListCell extends React.Component<GalleryListCellProps, {}> {

    constructor(props: any) {
        super(props)
    }

    render() {
        return <div className="h-auto w-1/3 mb-6 pr-3 flex flex-col">
            <img src={require(`./../../../Assets/${this.props.imageUrl}`)} className="h-auto w-ful" alt="Image"
                onLoad={() => this.setState({ isImageLoaded: true })} />
            <div className="pt-2 text-white">
                <span>{this.props.name}</span>
            </div>
        </div>
    }
}